import "./App.css";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [userInput, setUserInput] = useState("");
  const [respopnseData, setResponseData] = useState("Loading ...");
  const [isAsked, setIsAsked] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [counter, setCounter] = useState(0);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyC4zzQpO5I6z0p5YKv9tWhVDh30HbvuT2E"
  );

  async function handleSubmit() {
    // For text-only input, use the gemini-pro model
    setIsAsked(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = userInput;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponseData(text);
    console.log(text);
    setPrompts((prevPrompts) => [
      ...prevPrompts,
      { you: userInput, NerdAI: text },
    ]);
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          width: "50%",
          flexDirection: "column",
          marginLeft: "25%",
          marginRight: "50%",
          marginTop: 10,
        }}
      >
        <div
          style={{
            border: "1px solid #393E46",
            backgroundColor: "#393E46",
            width: "100%",
            justifyContent: "start",
            borderRadius: 3,
          }}
        >
          <input
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            style={{
              padding: 10,
              marginLeft: 20,
              border: ".7px solid #393E46",
              backgroundColor: "rgb(46, 49, 55)",
              borderRadius: 3,
              width: "60%",
              color: "white",
              fontSize: 13.5,
              outline: "none",
            }}
            placeholder="enter your prompt here"
          />
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#00ADB5",
              border: "1px solid #00ADB5",
              borderRadius: 2,
              color: "white",
              padding: 10,
              margin: 15,
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          width: "50%",
          flexDirection: "column",
          marginLeft: "25%",
          marginRight: "50%",
        }}
      >
        {prompts.map((each) => {
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <p
                  key={counter}
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginRight: 10,
                    marginLeft: 10,
                    backgroundColor: "#393E46",
                    padding: 12,
                    textAlign: "end",
                    borderRadius: 5,
                    width: "max-content",
                    justifyContent: "end",
                  }}
                >
                  {each.you}
                </p>
              </div>
              <p
                key={counter}
                style={{
                  color: "white",
                  fontSize: 15,
                  marginRight: 10,
                  marginLeft: 10,
                  backgroundColor: "#393E46",
                  padding: 12,
                  textAlign: "start",
                  borderRadius: 5,
                  // width: "",
                }}
              >
                {each.NerdAI}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
