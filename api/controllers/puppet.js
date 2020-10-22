/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// eslint-disable-next-line max-classes-per-file
const puppet = require('puppeteer');
const { isWebUri } = require('valid-url');

const conversion = link => {
  let sz = link.length;
  if (link.indexOf('#') !== -1) {
    sz = link.indexOf('#');
    // eslint-disable-next-line no-param-reassign
    link = link.slice(0, sz);
  }
  if (link[sz - 1] === '/') {
    // eslint-disable-next-line no-plusplus
    sz--;
    // eslint-disable-next-line no-param-reassign
    link = link.slice(0, sz);
  }
  return link;
};

class TrieNode {
  constructor() {
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
    for (let i = 0; i < word.length; i++) {
      if (!node.ch[word[i]]) {
        const temp = new TrieNode();
        node.ch[word[i]] = temp;
      }
      node = node.ch[word[i]];
    }
    node.end = true;
    node.value = value;
  }

  printStrings(node, prefix) {
    if (node.end) console.log(prefix, node.value);
    for (const key in node.ch) {
      this.printStrings(node.ch[key], prefix + key);
    }
  }

  getHeirarchy(node, prefix, title, parent, ancestor, mapping, pages) {
    if (node.end) {
      pages.push({ url: prefix, title: node.value, parent });
      if (parent.length) {
        if (!mapping[parent]) mapping[parent] = { children: [], title, parent: ancestor };
        mapping[parent].children.push({ url: prefix, title: node.value });
      }
      ancestor = parent;
      parent = prefix;
      title = node.value;
    }
    for (const key in node.ch) {
      this.getHeirarchy(node.ch[key], prefix + key, title, parent, ancestor, mapping, pages);
    }
  }
}

// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
module.exports = async (url, npages, socket) => {
  try {
    const results = [];
    let front = 0;
    console.log(url);
    results.push(url);
    const linkToTitle = {};
    const root = new TrieTree();
    let distinctPage = 0;
    // root.insert("ab", '1');
    // root.insert("abce", '2');
    // root.insert("abdf", '3');
    const browser = await puppet.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    while (front !== results.length) {
      const link = conversion(results[front]);
      front++;
      socket.emit('update', results.length - front);
      if (distinctPage === +npages) break;
      // eslint-disable-next-line no-continue
      if (!isWebUri(link) || link in linkToTitle) continue;
      // eslint-disable-next-line no-await-in-loop
      await page
        .goto(link, {
          waitUntil: 'networkidle2',
        })
        // eslint-disable-next-line no-void
        .catch(() => void 0);
      linkToTitle[link] = await page.title();
      distinctPage++;
      console.log(link, distinctPage);
      const res = await page.$$eval('a', as => as.map(a => a.href));
      const data = res.filter(links => links.indexOf(url) !== -1);
      data.forEach(d => {
        if (!linkToTitle[d]) results.push(d);
      });
      // data.forEach(d => {
      //     results.push(d);
      // })
      // allLinks.push(sitemapBuilder(results));
    }
    page.close();
    browser.close();
    for (const key in linkToTitle) {
      root.insert(key, linkToTitle[key]);
    }
    // root.printStrings(root.getRoot(), "");
    const mapping = {};
    const pages = [];
    root.getHeirarchy(root.getRoot(), '', '', '', '', mapping, pages);
    // return mapping;
    if (pages.length === 1)
      mapping[conversion(url)] = { children: [], title: linkToTitle[conversion(url)], parent: '' };
    return { url: conversion(url), mapping, pages };
  } catch (err) {
    console.log(err);
    socket.emit('update', -777);
  }
};

// eslint-disable-next-line no-unused-vars
