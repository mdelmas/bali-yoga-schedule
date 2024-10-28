import puppeteer from "puppeteer";
import moment from "moment";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchYogaClassesMomence({ url, studio, city }) {
  let visitedPages = 0;

  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await delay(2000);

  await page.waitForSelector(".momence-quick_filters-all");
  const showAllButton = await page.$(".momence-quick_filters-all");

  await showAllButton.click();
  await delay(2000);

  await page.waitForSelector(".momence-host_schedule-session_list-item", {
    visible: true,
  });

  const classes = [];

  // Boucle pour récupérer les cours sur plusieurs pages
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await page.evaluate(() => {
      const classList = [];
      const items = document.querySelectorAll(
        ".momence-host_schedule-session_list-item"
      );

      items.forEach((item) => {
        console.log(item);

        const name = item
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
          name,
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
    if (nextButton && visitedPages < 2) {
      await nextButton.click();
      await delay(2000);
    } else {
      hasNextPage = false; // Pas de page suivante
    }
  }

  await browser.close();

  const parsedClasses = classes.map((currentClass) => {
    const date = currentClass.date.substring(
      currentClass.date.indexOf(" ") + 1
    );
    const time = currentClass.duration.split("\n")[0];
    const parsedDate = moment(date, "MMMM D, YYYY").format("DD/MM/YY");
    // better for comparison with firebase to store separately, to change later probably...
    // const parsedDate = moment(`${date} ${time}`, "MMMM D, YYYY h:mm A");

    const parsedClass = {
      date: parsedDate,
      time: time,
      duration: parseInt(currentClass.duration.split("\n")[3]),
      name: currentClass.name,
      studio: studio,
      city: city,
      price: currentClass.price.replace(/\D/g, ""),
      url: url,
    };

    return parsedClass;
  });

  return parsedClasses;
}
