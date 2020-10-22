const puppet = require('puppeteer');
const {isWebUri} = require('valid-url');

module.exports= async(url)=>{
    console.log(url,console.log(isWebUri('a')),  'a');
    url='a';
    if(isWebUri(url))
        return ;
    console.log(url, 'b');
    
    const browser = await puppet.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    page.goto(url);
    await page.goto(link, {
        waitUntil: 'networkidle2'
    }).catch(e => void 0);
   const ss= await page.screenshot({quality: 50, fullPage:true});
   console.log(ss);
   return ss;
}