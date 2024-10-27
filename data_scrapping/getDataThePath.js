const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.thepathyogacenter.com/";

async function fetchYogaClasses() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Adapté selon la structure du site
    const classes = [];
    $(".class-list-item").each((index, element) => {
      const title = $(element).find(".class-title").text().trim();
      const date = $(element).find(".class-date").text().trim();
      const time = $(element).find(".class-time").text().trim();
      const description = $(element).find(".class-description").text().trim();

      classes.push({
        title,
        date,
        time,
        description,
      });
    });

    console.log(classes);
  } catch (error) {
    console.error("Error fetching yoga classes:", error);
  }
}

fetchYogaClasses();
