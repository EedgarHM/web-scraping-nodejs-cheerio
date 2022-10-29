const axios = require("axios");
const cheerio = require("cheerio");

const newspapers = [
  {
    siteName: "The Guardian",
    baseUrl: "https://www.theguardian.com/world",
    urlForArticles: "",
  },
  {
    siteName: "New York Times",
    baseUrl: "https://www.nytimes.com/section/world",
    urlForArticles: "https://www.nytimes.com",
  },
    {
        siteName: 'BBC',
        baseUrl: 'https://www.bbc.com/news/world',
        urlForArticles: 'https://www.bbc.com'
    },
];
const globalNews = [];
const sportsNews = [];

const getNews = async (req, res) => {
  // Get all titles of news


  const getGlobalNewsNYT = axios.get(newspapers[0].baseUrl).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a[class="u-faux-block-link__overlay js-headline-text"]', html).each(
      function () {
        const title = $(this).text().trim();
        const url = $(this).attr("href");

        globalNews.push({
          title,
          url: newspapers[0].urlForArticles + url,
          source: newspapers[0].siteName,
        });
      }
    );
  });

  const getGlobalNewsGuardian = axios
  .get(newspapers[1].baseUrl)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('H2[class="css-14g652u e1y0a3kv0"]', html)
      .find("a")
      .each(function () {
        const title = $(this).text().trim();
        const url = $(this).attr("href");

        globalNews.push({
          title,
          url: newspapers[1].urlForArticles + url,
          source: newspapers[1].siteName,
        });
      });
  });

  

  const getGlobalNewsBBC = axios.get(newspapers[2].baseUrl).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a[class="gs-c-promo-heading gs-o-faux-block-link__overlay-link gel-pica-bold nw-o-link-split__anchor"]', html).each(
      function () {
        const title = $(this).text().trim();
        const url = $(this).attr("href");

        globalNews.push({
          title,
          url: newspapers[2].urlForArticles + url,
          source: newspapers[2].siteName,
        });
      }
    );
  });

  Promise.all([getGlobalNewsGuardian, getGlobalNewsNYT, getGlobalNewsBBC]);

  console.log(globalNews.length);
  res.json({
    data: globalNews,
  });
};

const getSportsNews = (req, res) => {
    
  const getSportsGuardian = axios.get(newspapers[0].baseUrl).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a[class="u-faux-block-link__overlay js-headline-text"]', html).each(
      function () {
        const title = $(this).text().trim();
        const url = $(this).attr("href");

        sportsNews.push({
          title,
          url: newspapers[0].urlForArticles + url,
          source: newspapers[0].siteName,
        });
      }
    );
  });

  //js-headline-text

  Promise.all([getSportsGuardian]);


  res.json({
    data: sportsNews,
  });
}

module.exports = {
  getNews,
  getSportsNews
};
