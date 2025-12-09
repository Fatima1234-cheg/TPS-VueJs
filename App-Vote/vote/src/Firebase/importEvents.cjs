const { db } = require("./config.js");
const { collection, addDoc, Timestamp } = require("firebase/firestore");
const fs = require("fs");
const path = require("path");

const eventsPath = path.resolve("public/events.json");
const eventsData = fs.readFileSync(eventsPath, "utf-8");
const events = JSON.parse(eventsData);

const importEvents = async () => {
  try {
    for (const e of events) {
      const date = Timestamp.fromDate(new Date(e.date));
      await addDoc(collection(db, "events"), { ...e, date, yesVotes: 0, noVotes: 0 });
      console.log("Événement ajouté :", e.title);
    }
    console.log("Tous les événements ont été importés !");
  } catch (err) {
    console.error("Erreur lors de l'import :", err);
  }
};

importEvents();
