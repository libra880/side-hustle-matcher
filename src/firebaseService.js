import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const saveQuizResult = async (result) => {
  try {
    await addDoc(collection(db, "quizResults"), result);
    console.log("Saved to Firestore!");
  } catch (e) {
    console.error("Error saving result: ", e);
  }
};