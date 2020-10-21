const puppet = require('puppeteer');
const fs = require('fs');
const {isWebUri} = require('valid-url');
const { time } = require('console');
const { link } = require('fs');
const { throws } = require('assert');


const conversion = link =>{
    let sz = link.length;
    // if(link.indexOf('#') !== -1){
    //     sz=link.indexOf('#');
    //     link = link.slice(0, sz);
    // }
    if(link[sz-1]=='/'){
        sz--;
        link = link.slice(0, sz);
    }
    return link;
}

class TrieNode{
    constructor(){
        this.value = undefined;
        this.ch = {};
        this.end = false;
    }
}

class TrieTree {
    constructor() {
        this.root = new TrieNode();
    }
    getRoot() {
        return this.root;
    }
    insert(word, value) {
        let node = this.root;
        for(let i = 0; i < word.length; i++){
            if(!node.ch[word[i]]){
                const temp = new TrieNode();
                node.ch[word[i]] = temp;
            }
            node = node.ch[word[i]];
        } 
        node.end = true;
        node.value = value;
    }
    printStrings(node, prefix){
        if(node.end) console.log(prefix, node.value);
        for(const key in  node.ch){
            this.printStrings(node.ch[key], prefix + key);
        }
    }
    getHeirarchy(node, prefix, title, parent, ancestor,  mapping, pages) {

       
        if(node.end){
            pages.push({url: prefix, title: node.value, parent});
            if(parent.length) {

            if(!mapping[parent])
                mapping[parent]={children:[], title, parent: ancestor}; 
              mapping[parent].children.push({url: prefix, title : node.value});
            }
            ancestor = parent;
            parent = prefix;
            title = node.value;
        }
        for(const key in node.ch) {
            this.getHeirarchy(node.ch[key], prefix+ key, title, parent, ancestor, mapping, pages);
        }
    }
}


module.exports = async (url, socket) => {
    try{
    let results = [];
    let front = 0;
    const allLinks=[];
    console.log(url);
    results.push(url);
    const linkToTitle = {};
    const root = new TrieTree();
    // root.insert("ab", '1');
    // root.insert("abce", '2');
    // root.insert("abdf", '3');
    const browser = await puppet.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    while(front!=results.length){
        const link = conversion(results[front]);
        front++;
        // socket.emit('update', results.length - front);
        if(!isWebUri(link) || link in linkToTitle) continue;
        await page.goto(link, {
            waitUntil: 'networkidle2'
        }).catch(e => void 0);
        console.log(link);
        linkToTitle[link] = await page.title();
        const res = await page.$$eval('a', as => as.map(a => a.href));
        const data = res.filter(link => link.indexOf(url) !== -1);
        data.forEach(d => {
            if(!linkToTitle[d])
                results.push(d);
        });
        // data.forEach(d => {
        //     results.push(d);
        // })
        // allLinks.push(sitemapBuilder(results));
    }
    page.close();
    browser.close();
    for(const key in linkToTitle) {
        root.insert(key, linkToTitle[key]);
    }
    // root.printStrings(root.getRoot(), "");
    const mapping = {};
    const pages = [];
    root.getHeirarchy(root.getRoot(), "", "", "", "", mapping, pages);
    console.log(mapping);
    // return mapping;
    return {url: conversion(url), mapping, pages};
    } catch {
        socket.emit('update', -777);
    }
}

let sitemapBuilder = (links) => {
    var map = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    links.forEach(link => {
        map += '<url><loc>' + link +'</loc><priority>0.5</priority></url>\n';
    });

    map += '</urlset>';

    return map;
}