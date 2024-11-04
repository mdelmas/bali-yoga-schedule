import fs from "fs";

export const STUDIOS = {
  samadi: {
    csv: "./csv/samadi.csv",
    url: "https://www.samadibali.com/yogaschedules/",
  },
  guanYin: {
    csv: "./csv/guanyin.csv",
    url: "https://tuguhotels.com/hotels/bali/guan-yin-yoga-shala/",
  },
};

export const getDataFromCSV = async (studio) => {
  // Read and parse CSV data
  const [fields, ...entries] = fs
    .readFileSync(studio.csv, "utf-8")
    .split("\n")
    .map((line) => line.split(",").map((value) => value.trim()));

  const classes = entries.map((entry) => {
    return fields.reduce((doc, _, index) => {
      doc[fields[index]] = entry[index];
      return doc;
    }, {});
  });

  return classes.map((yogaClass) => ({
    date: yogaClass.date,
    time: yogaClass.time,
    duration: yogaClass.duration,
    name: yogaClass.name,
    studio: yogaClass.studio,
    city: yogaClass.city,
    price: yogaClass.price,
    url: studio.url,
  }));
};

// getDataFromCSV(STUDIOS.samadi).then((classes) => console.log(classes));
