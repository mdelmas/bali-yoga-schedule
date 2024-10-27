const puppeteer = require("puppeteer");
const moment = require("moment");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchYogaClasses() {
  console.log(moment());

  let visitedPages = 0;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.thepathyogacenter.com/");

  await delay(2000);
  await page.waitForSelector(".momence-host_schedule-session_list-item", {
    visible: true,
  });
  console.log("page loaded");

  const classes = [];

  // Boucle pour récupérer les cours sur plusieurs pages
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await page.evaluate(() => {
      console.log("evaluating page");

      const classList = [];
      const items = document.querySelectorAll(
        ".momence-host_schedule-session_list-item"
      );
      console.log("items", items);

      items.forEach((item) => {
        console.log(item);

        const title = item
          .querySelector(".momence-host_schedule-session_list-item-title")
          ?.innerText.trim();
        const date = item
          .querySelector(".momence-session-starts_at")
          ?.innerText.trim();
        const duration = item
          .querySelector(".momence-session-duration")
          ?.innerText.trim();

        const price = item
          .querySelector(".momence-host_schedule-session_list-item-price")
          ?.innerText.trim();

        classList.push({
          title,
          date,
          duration,
          price,
        });
      });

      return classList;
    });

    classes.push(...data);
    await delay(2000);
    visitedPages++;

    await page.waitForSelector(".momence-pagination_next_page");
    const nextButton = await page.$(".momence-pagination_next_page");

    // Vérifier s'il y a une page suivante et cliquer sur le bouton
    if (nextButton && visitedPages < 5) {
      await nextButton.click();
      await delay(2000);
    } else {
      hasNextPage = false; // Pas de page suivante
    }
  }

  await browser.close();

  const parsedClasses = classes.map((currentClass) => {
    const parsedClass = {
      title: currentClass.title,
      date: moment(
        currentClass.date.substring(currentClass.date.indexOf(" ") + 1),
        "MMMM D, YYYY"
      ),
      time: currentClass.duration.split("\n")[0],
      duration: parseInt(currentClass.duration.split("\n")[3]),
      studio: "The Path",
      city: "Canggu",
      price: currentClass.price.replace(/\D/g, ""),
    };
    return parsedClass;
  });

  return parsedClasses;
}

fetchYogaClasses()
  .then((classes) => {
    console.log("classes: ", classes.length);
    console.log(classes[classes.length - 1]);
  })
  .catch((err) => {
    console.error(err);
    s;
  });
