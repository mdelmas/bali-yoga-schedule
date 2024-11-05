import { addYogaClassToDB } from "./addDataToDB.js";
import { fetchYogaClassesMomence } from "./getDataMomence.js";
import { fetchYogaClassesChandra } from "./getDataChandra.js";
import { fetchYogaClassesThePractice } from "./getDataThePractice.js";
import { getDataFromCSV, STUDIOS } from "./getDataFromCSV.js";

Promise.all([
  fetchYogaClassesMomence({
    url: "https://www.thepathyogacenter.com/studio-classes",
    studio: "The Path",
    city: "Canggu",
  }),
  fetchYogaClassesMomence({
    url: "https://momence.com/u/empowered-yoga-with-bwork-bali",
    studio: "Empowered Yoga",
    city: "Canggu",
  }),
  fetchYogaClassesChandra(),
  fetchYogaClassesThePractice(),
  getDataFromCSV(STUDIOS.samadi),
  getDataFromCSV(STUDIOS.guanYin),
])
  .then(async (results) => {
    const classes = results.flat();
    console.log("classes: ", classes.length);

    for (const yogaClass of classes) {
      console.log(yogaClass);
      await addYogaClassToDB(yogaClass);
    }
  })
  .catch((err) => {
    console.error(err);
  });
