import puppeteer from "puppeteer";
import moment from "moment";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const URL = "https://www.thepracticebali.com/practice-with-us/schedule/";
const STUDIO = "The Practice";
const CITY = "Canggu";
const PRICE = 150000;

export async function fetchYogaClassesThePractice() {
  let visitedMonths = 0;

  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto(URL);

  await delay(3000);

  const allCalendarData = [];

  while (visitedMonths < 2) {
    await page.waitForSelector(".mec-calendar");
    const calendarData = await page.$eval(".mec-calendar", (calendar) => {
      const days = calendar.querySelectorAll(".mec-calendar-day ");

      const data = [];

      [...days].forEach((day) => {
        const date = moment(day.getAttribute("data-mec-cell")).format(
          "DD/MM/YY"
        );

        const classes = day.querySelectorAll(".mec-event-title");

        data.push(
          ...[...classes].map((classData) => {
            const infos = classData.innerText;

            const match = infos.match(
              /(\d{1,2}(?:\d{2})?[ap]m)\s+(.+?)\s*(?:\((\d+)(?:\s*Hr|min)?\))?\s*–\s*.+/i
            );

            if (match) {
              const rawTime = match[1];
              const className = match[2].trim(); // Class name
              const duration = match[3] ? `${match[3]} min` : "N/A"; // Duration or N/A

              const formattedTime = moment(rawTime, ["hmmA", "ha"]).format(
                "h:mm A"
              );

              return {
                infos: infos,
                date,
                time: formattedTime, // Heure de début
                duration: duration, // Durée (si présente)
                name: className, // Nom de l'activité
              };
            } else {
              return null;
            }
          })
        );
      });

      return data;
    });

    visitedMonths++;
    allCalendarData.push(...calendarData);
    console.log("data: ", allCalendarData.length);

    await page.waitForSelector(".mec-next-month");
    const nextButton = await page.$(".mec-next-month");

    if (nextButton && visitedMonths < 2) {
      console.log("going to next month");
      await nextButton.click();
      await delay(10000);
    } else {
      console.log("could not find next month button");
    }
  }

  await browser.close();

  const parsedClasses = allCalendarData
    .filter((currentClass) => currentClass !== null)
    .map((currentClass) => ({
      // infos: currentClass.infos,
      date: currentClass.date,
      time: currentClass.time,
      duration: currentClass.duration,
      name: currentClass.name,
      studio: STUDIO,
      city: CITY,
      price: PRICE,
      url: URL,
    }));

  return parsedClasses;
}

// fetchYogaClassesThePractice().then((classes) =>
//   console.log(classes[classes.length - 1])
// );
// fetchYogaClassesThePractice();
