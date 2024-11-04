import puppeteer from "puppeteer";
import moment from "moment";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const URL = "https://member.chandrayogabali.com/schedule";
const STUDIO = "Chandra";
const CITY = "Canggu";
const PRICE = 140000;

export async function fetchYogaClassesChandra() {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto(URL);

  await delay(3000);

  await page.waitForSelector("#chandra-calendar");

  const calendarData = await page.$$eval("#chandra-calendar td", (columns) =>
    columns.map((column) => {
      const date = column.querySelector(".date")?.innerText.trim();
      const classes = column.querySelectorAll(".calendarblock");
      const parsedClasses = [...classes].map((classBlock) => {
        const name = classBlock.querySelector(".description").innerText;
        const time = classBlock.querySelector(".timestart").innerText;
        const duration = classBlock.querySelector(".duration").innerText;

        const parsedDate = moment(date, "MMMM, DD YYYY").format("DD/MM/YY");
        const parsedTime = moment(time, "HH:mm").format("h:mm A");

        return {
          date: parsedDate,
          time: parsedTime,
          duration: parseInt(duration),
          name,
        };
      });

      return parsedClasses; // Retourne un objet pour chaque colonne
    })
  );

  await browser.close();

  const classes = calendarData.flat().map((currentClass) => ({
    date: currentClass.date,
    time: currentClass.time,
    duration: currentClass.duration,
    name: currentClass.name,
    studio: STUDIO,
    city: CITY,
    price: PRICE,
    url: URL,
  }));

  return classes;
}

fetchYogaClassesChandra().then((classes) => console.log(classes));
