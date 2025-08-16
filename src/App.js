import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Quiz from "./Quiz";

function App() {
  const [completed, setCompleted] = useState(false);
  const [hustleType, setHustleType] = useState("");

  const saveQuizResult = async (data) => {
    try {
      await addDoc(collection(db, "quizResults"), {
        ...data,
        timestamp: new Date()
      });
      console.log("Saved to Firestore");
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const matchHustle = (answers) => {
    if (answers[1] === "Creativity") return "Brand Strategist";
    if (answers[2] === "Talking to people") return "Virtual Assistant";
    return "Visionary Hustler";
  };

  const handleQuizComplete = (answers) => {
    const hustle = matchHustle(answers);
    saveQuizResult({ name: "Shalonda", hustle, answers });
    setHustleType(hustle);
    setCompleted(true);
  };
console.log("Completed:", completed);
console.log("Hustle Type:", hustleType);
  return (
    <div>
      
      {completed ? (
        <div>
          <h2>🎉 You're a {hustleType}!</h2>
          <p>Your results have been saved!</p>
        </div>
      ) : (
        <Quiz onComplete={handleQuizComplete} />
      )}
    </div>
  );
}

export default App;