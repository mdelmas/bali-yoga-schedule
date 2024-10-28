import fs from "fs";
import admin from "firebase-admin";

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
console.log("connected to DB");
/*
const addClassToFirestore = async (newClass) => {
  try {
    const docRef = await db.collection("classes").add(newClass);
    console.log("Document successfully written!", docRef.id);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
*/
export const addYogaClassToDB = async (yogaClass) => {
  const uniqueID =
    `${yogaClass.date}-${yogaClass.time}-${yogaClass.studio}-${yogaClass.name}`.replace(
      /[^a-zA-Z0-9-_]/g,
      ""
    );
  console.log(uniqueID);

  const existingClass = await db.collection("classes").doc(uniqueID).get();

  if (existingClass.exists) {
    console.log("Le cours existe déjà dans la base de données.");
  } else {
    // Ajouter le cours à la base de données
    await db.collection("classes").doc(uniqueID).set(yogaClass);
    console.log("Cours ajouté avec succès !");
  }
};
