import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

// 🔹 All questions including fallback
const questionsMap = {
  Q1: {
    id: "Q1",
    text: "How do you prefer to work?",
    options: [
      { label: "🧍 Solo", next: "Q2a" },
      { label: "👥 With others", next: "Q2b" },
      { label: "🤷 Depends", next: "Q2c" }
    ]
  },
  Q2a: {
    id: "Q2a",
    text: "What motivates you most?",
    options: [
      { label: "💡 Creative freedom", next: "Q3a" },
      { label: "💰 Earning potential", next: "Q3b" },
      { label: "🧘 Flexibility", next: "Q3c" }
    ]
  },
  Q2b: {
    id: "Q2b",
    text: "Which role fits you best?",
    options: [
      { label: "🧠 Strategist", next: "Q3d" },
      { label: "🤝 Connector", next: "Q3e" },
      { label: "🛠️ Doer", next: "Q4f" }
    ]
  },
  Q2c: {
    id: "Q2c",
    text: "Pick your ideal hustle vibe.",
    options: [
      { label: "🎨 Artistic", next: "Q3a" },
      { label: "📈 Business-minded", next: "Q3b" },
      { label: "🧩 Problem-solving", next: "Q3d" }
    ]
  },
  Q3a: {
    id: "Q3a",
    text: "Which tool feels most natural to you?",
    options: [
      { label: "🎥 Camera", next: "Q4a" },
      { label: "✍️ Pen", next: "F1" },
      { label: "🎨 Design software", next: "F2" }
    ]
  },
  Q3b: {
    id: "Q3b",
    text: "How do you want to earn?",
    options: [
      { label: "📦 Selling products", next: "F3" },
      { label: "🧠 Offering expertise", next: "F3" },
      { label: "📊 Managing others", next: "F3" }
    ]
  },
  Q3c: {
    id: "Q3c",
    text: "How much time can you commit weekly?",
    options: [
      { label: "🕰️ 5–10 hours", next: "RESULT" },
      { label: "🧭 10+ hours", next: "RESULT" }
    ]
  },
  Q3d: {
    id: "Q3d",
    text: "Which tool feels most natural to you?",
    options: [
      { label: "🎥 Camera", next: "Q4a" },
      { label: "✍️ Pen", next: "F1" },
      { label: "🎨 Design software", next: "F2" }
    ]
  },
  Q3e: {
    id: "Q3e",
    text: "How do you want to earn?",
    options: [
      { label: "📦 Selling products", next: "F3" },
      { label: "🧠 Offering expertise", next: "F3" },
      { label: "📊 Managing others", next: "F3" }
    ]
  },
 
Q4a: {
  id: "Q4a",
  text: "What kind of photography do you enjoy?",
  options: [
    { label: "📸 Portraits", next: "Q5a" },
    { label: "🌿 Nature", next: "Q5a" },
    { label: "🎉 Events", next: "Q5a" },
    { label: "🛍️ Products", next: "Q5a" }
  ]
},
Q4f: {
  id: "Q4f",
  text: "Which skill do you enjoy using most?",
  options: [
    { label: "🛠️ Building things", next: "F3" },
    { label: "📋 Organizing tasks", next: "F3" },
    { label: "🗣️ Talking to people", next: "F3" },
    { label: "💻 Tech tinkering", next: "F3" }
  ]
},
Q5a: {
  id: "Q5a",
  text: "How many hours do you spend creating or editing each week?",
  options: [
    { label: "📷 5 hrs", next: "RESULT" },
    { label: "📷 10 hrs", next: "RESULT" },
    { label: "📷 20+ hrs", next: "RESULT" },
    { label: "📷 It varies", next: "RESULT" }
  ]
},
  F1: {
    id: "F1",
    text: "What motivates you most?",
    options: [
      { label: "🧘 Flexibility", next: "F2" },
      { label: "🎨 Creativity", next: "F2" },
      { label: "🤝 Helping others", next: "F2" },
      { label: "💰 Making money", next: "F2" }
    ]
  },
  F2: {
    id: "F2",
    text: "Which skill do you enjoy using?",
    options: [
      { label: "✍️ Writing", next: "F3" },
      { label: "🎨 Design", next: "F3" },
      { label: "🗣️ Talking to people", next: "F3" },
      { label: "📋 Organizing tasks", next: "F3" }
    ]
  },
  F3: {
    id: "F3",
    text: "How much time can you commit weekly?",
    options: [
      { label: "🕔 5 hrs", next: "RESULT" },
      { label: "🕙 10 hrs", next: "RESULT" },
      { label: "🕓 20+ hrs", next: "RESULT" },
      { label: "⏳ It varies", next: "RESULT" }
    ]
  }
};

// 🔹 Hustle match dictionary
const hustleMatches = {
  "🎥 Camera": "🎥 Content Creator",
  "📸 Portraits": "📸 Portrait Photographer",
  "🌿 Nature": "🌿 Nature Photographer",
  "🎉 Events": "🎉 Event Photographer",
  "🛍️ Products": "🛍️ Product Photographer",
  "✍️ Pen": "✍️ Writer/Editor",
  "✍️ Writing": "✍️ Writer/Editor",
  "🎨 Design software": "🎨 Freelance Designer",
  "🎨 Design": "🎨 Freelance Designer",
  "📦 Selling products": "📦 E-commerce Hustler",
  "🧠 Offering expertise": "🧠 Consultant/Coach",
  "📊 Managing others": "📊 Virtual Assistant",
  "📋 Organizing tasks": "📊 Virtual Assistant",
  "🕔 5 hrs": "⏱️ Part-Time Freelancer",
   "🕙 10 hrs": "🧮 Steady Builder",
  "🕓 20+ hrs": "🧭 Scalable Hustler", 
"⏳ It varies": "🌊 Adaptive Hustler",
"🛠️ Building things": "🔧 Maker Hustler",
"💻 Tech tinkering": "💻 Tech Fixer"
};

// 🔹 Main Quiz Component
function Quiz() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentId, setCurrentId] = useState("Q1");
  const [answers, setAnswers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleAnswer = (option) => {
    const label = typeof option === "string" ? option : option.label;
    setAnswers((prev) => [...prev, label]);

    const match = hustleMatches[label];
    if (match) {
      setAnswers((prev) => [...prev, match]);
    }

    const nextId = option.next || "RESULT";
    if (nextId === "RESULT") {
      setCurrentId("RESULT");
      setShowConfetti(true);
    } else {
      setCurrentId(nextId);
    }
  };

  const handleRetake = () => {
    setName("");
    setStarted(false);
    setCurrentId("Q1");
    setAnswers([]);
    setShowConfetti(false);
  };


  if (!started) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Welcome to Hustle & Go!</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <br />
        <button
          onClick={() => setStarted(true)}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer"
          }}
        >
          🚀 Start Quiz
        </button>
      </div>
    );
  }




  if (currentId === "RESULT") {
  const matched = answers.find((a) => hustleMatches[a]) || "✨ Custom Hustle";
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      
      <h2>🎉 Congrats, {name || "Hustler"}!</h2>
    
        <p>You’re matched with a hustle that fits your vibe and skills!</p>
        <h2>Your side hustle type is: {hustleMatches[matched] || matched}</h2>
<p>Your hustle match equals {hustleMatches[answers.find((a) => a.includes("hrs") || a.includes("It varies"))] || "🌟 Custom Hustler"}</p>
        <h4>Your Path:</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {answers.map((ans, i) => (
            <li key={i}>{ans}</li>
          ))}
        </ul>
        <button
          onClick={handleRetake}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            cursor: "pointer"
          }}
        >
          🔄 Retake Quiz
        </button>
      </div>
    );
  }

  const currentQuestion =
    questionsMap[currentId] 

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>{currentQuestion.text}</h2>
      {currentQuestion.options.map((opt) => {
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <button
            key={label}
            onClick={() => handleAnswer(opt)}
            style={{
              margin: "0.5rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer"
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default Quiz;