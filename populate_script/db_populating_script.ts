import fs from "fs";
import admin from "firebase-admin";

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const mode = argv.mode;

// Read config files
const readJSONFile = (url) =>
  JSON.parse(fs.readFileSync(new URL(url, import.meta.url)).toString());

const serviceAccountKey = readJSONFile("./config/serviceAccountKey.json");
const firebaseConfig = readJSONFile("./config/firebaseConfig.json");

// initialize db connection
admin.initializeApp({
  ...firebaseConfig,
  credential: admin.credential.cert(serviceAccountKey),
});
const db = admin.firestore();

const readDataFromFirestore = async () => {
  try {
    const snapshot = await db.collection("classes").get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    console.log("Number of documents: ", snapshot.size);

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Error reading documents: ", error);
  }
};

const addClassToFirestore = async (newClass) => {
  try {
    const docRef = await db.collection("classes").add(newClass);
    console.log("Document successfully written!", docRef.id);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

const uploadCSVDataToFirestore = async () => {
  // Read and parse CSV data
  const [fields, ...entries] = fs
    .readFileSync("./yoga_classes.csv", "utf-8")
    .split("\n")
    .map((line) => line.split(","));

  const classes = entries.map((entry) => {
    return fields.reduce((doc, _, index) => {
      doc[fields[index]] = entry[index];
      return doc;
    }, {});
  });

  // add everything to db
  for (const yogaClass of classes) {
    console.log(yogaClass);
    await addClassToFirestore(yogaClass);
  }
};

if (mode === "upload") {
  console.log("uploading from csv data to db");
  uploadCSVDataToFirestore();
} else {
  console.log("reading data from db");
  readDataFromFirestore();
}
