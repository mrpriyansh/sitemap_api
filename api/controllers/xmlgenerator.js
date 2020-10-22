module.exports = links => {
  let map =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  links.forEach(link => {
    map += `<url><loc>${link.url}</loc><priority>0.5</priority></url>\n`;
  });

  map += '</urlset>';

  return map;
};
