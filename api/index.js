const express = require('express');

const router = express.Router();
const sitemap = require('./controllers/puppet');
const ss = require('./controllers/ss');
const xmlgenerator = require('./controllers/xmlgenerator');

router.get('/', (req, res) => {
  res.send('API server Working fine!');
});

router.post('/scrap', async (req, res) => {
  const data = await sitemap(req.body.url);
  // eslint-disable-next-line no-unused-vars
  const res1 = {
    url: 'https://mika.house',
    mapping: {
      'https://mika.house': {
        children: [
          {
            url: 'https://mika.house/blog',
            title: 'Blog - Mika House Web Development',
          },
          {
            url: 'https://mika.house/contact',
            title: 'Contact - Mika House Web Development',
          },
          {
            url: 'https://mika.house/about',
            title: 'About - Mika House Web Development',
          },
          {
            url: 'https://mika.house/assets/resume',
            title: 'Drew Mika Resume',
          },
          {
            url: 'https://mika.house/post/loading-scripts-per-component-in-angular',
            title: 'Loading scripts per component in Angular - Mika House Web Development',
          },
          {
            url: 'https://mika.house/post/an-unconventional-way-to-make-a-static-site',
            title: 'An unconventional way to make a static site - Mika House Web Development',
          },
          {
            url: 'https://mika.house/post/mozilla-observatory',
            title: 'Mozilla Observatory - Mika House Web Development',
          },
          {
            url: 'https://mika.house/post/generating-sitemaps-with-puppeteer-in-nodejs',
            title: 'Generating sitemaps with Puppeteer in Node.js - Mika House Web Development',
          },
          {
            url: 'https://mika.house/post/uploading-images-to-expressjs-with-angular-and-quilljs',
            title:
              'Uploading images to Express.js with Angular and Quill.js - Mika House Web Development',
          },
          {
            url: 'https://mika.house/post/passing-tags-as-an-array-in-angular-and-mongoose',
            title: 'Passing tags as an array in Angular and mongoose - Mika House Web Development',
          },
          {
            url: 'https://mika.house/post/cache-control-in-nginx',
            title: 'Cache Control in nginx - Mika House Web Development',
          },
        ],
        title: 'Mika House Web Development',
        parent: '',
      },
      'https://mika.house/blog': {
        children: [
          {
            url: 'https://mika.house/blog/Angular',
            title: 'Posts tagged with Angular - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Puppeteer',
            title: 'Posts tagged with Puppeteer - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Node.js',
            title: 'Posts tagged with Node.js - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Nginx',
            title: 'Posts tagged with Nginx - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Static',
            title: 'Posts tagged with Static - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Security',
            title: 'Posts tagged with Security - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Sitemap',
            title: 'Posts tagged with Sitemap - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Express.js',
            title: 'Posts tagged with Express.js - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Multer',
            title: 'Posts tagged with Multer - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Mongoose',
            title: 'Posts tagged with Mongoose - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Quill.js',
            title: 'Posts tagged with Quill.js - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Tags',
            title: 'Posts tagged with Tags - Mika House Web Development',
          },
          {
            url: 'https://mika.house/blog/Caching',
            title: 'Posts tagged with Caching - Mika House Web Development',
          },
        ],
        title: 'Blog - Mika House Web Development',
        parent: 'https://mika.house',
      },
    },
    pages: [
      {
        url: 'https://mika.house',
        title: 'Mika House Web Development',
        parent: '',
      },
      {
        url: 'https://mika.house/blog',
        title: 'Blog - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/blog/Angular',
        title: 'Posts tagged with Angular - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Puppeteer',
        title: 'Posts tagged with Puppeteer - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Node.js',
        title: 'Posts tagged with Node.js - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Nginx',
        title: 'Posts tagged with Nginx - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Static',
        title: 'Posts tagged with Static - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Security',
        title: 'Posts tagged with Security - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Sitemap',
        title: 'Posts tagged with Sitemap - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Express.js',
        title: 'Posts tagged with Express.js - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Multer',
        title: 'Posts tagged with Multer - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Mongoose',
        title: 'Posts tagged with Mongoose - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Quill.js',
        title: 'Posts tagged with Quill.js - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Tags',
        title: 'Posts tagged with Tags - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/blog/Caching',
        title: 'Posts tagged with Caching - Mika House Web Development',
        parent: 'https://mika.house/blog',
      },
      {
        url: 'https://mika.house/contact',
        title: 'Contact - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/about',
        title: 'About - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/assets/resume',
        title: 'Drew Mika Resume',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/loading-scripts-per-component-in-angular',
        title: 'Loading scripts per component in Angular - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/an-unconventional-way-to-make-a-static-site',
        title: 'An unconventional way to make a static site - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/mozilla-observatory',
        title: 'Mozilla Observatory - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/generating-sitemaps-with-puppeteer-in-nodejs',
        title: 'Generating sitemaps with Puppeteer in Node.js - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/uploading-images-to-expressjs-with-angular-and-quilljs',
        title:
          'Uploading images to Express.js with Angular and Quill.js - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/passing-tags-as-an-array-in-angular-and-mongoose',
        title: 'Passing tags as an array in Angular and mongoose - Mika House Web Development',
        parent: 'https://mika.house',
      },
      {
        url: 'https://mika.house/post/cache-control-in-nginx',
        title: 'Cache Control in nginx - Mika House Web Development',
        parent: 'https://mika.house',
      },
    ],
  };
  res.send(data);
});

router.post('/generatexml', (req, res) => {
  const data = xmlgenerator(req.body.pages);
  //   console.log(data);
  res.json(data);
});

router.get('/ss', async (req, res) => {
  const data = await ss(req.query.url);
  console.log(data);
  res.json(data);
});

router.get('*', (req, res) => {
  res.status(404).json('Invalid Request');
});
module.exports = router;
