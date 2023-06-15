import React, { useState } from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import PdfConverter from "./PdfConverter";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");

  // To Uppercase
  const handleClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };
  // To Lowercase
  const handleClick2 = () => {
    const newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  // Clear
  const handleClick3 = () => {
    const newText = " ";
    setText(newText);
  };

  // Reverse
  const handleReverse = (event) => {
    let strArr = text.split("");
    strArr = strArr.reverse();
    let newText = strArr.join("");
    setText(newText);
    props.showAlert("Text reversed!", "success");
  };

  // Copy
  const handleCopy = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied to clipboard !", "success");
  };
  //Remove all spaces
  const removeAllSpace = () => {
    var newText = text.replace(/\s/g, "");
    setText(newText);
    props.showAlert("Spaces are removed !", "success");
  };

  // Remove extra space
  const handleExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra space removed!", "success");
  };
  //JSON Converter
  const jsonConverter = () => {
    const jsonObj = { word: text };
    setText(JSON.stringify(jsonObj));
    props.showAlert("Text converted to JSON!", "success");
  };
  //Text Converter
  const objConverter = () => {
    let newText = text;
    const obj = JSON.parse(newText);
    setText(obj.word);
    props.showAlert("JSON converted to text!", "success");
  };

  // random text generator along with random spaces
  const generateRandomText = (length) => {
    const num = Number(length);
    if (num > 10000) {
      props.showAlert("Text length should not be more than 10000", "warning");
    } else {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      let spaceCounter = 0;
      for (let i = 0; i < num; i++) {
        if (spaceCounter >= 3 && i !== num - 1 && Math.random() < 0.5) {
          result += " ";
          spaceCounter = 0;
        }
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        if (i !== num - 1 && result[i] !== " ") {
          spaceCounter++;
        }
      }
      setText(result);
      props.showAlert("Random text generated!", "success");
      setNumber("");
    }
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "#394867",
        }}
      >
        <h1>{props.heading} </h1>
        <div className="mb-3">
          <GrammarlyEditorPlugin clientId="client_XWHKWN8LQvQbjkStWDMdfA">
            <textarea
              className="form-control textarea"
              value={text}
              onChange={handleOnChange}
              style={{
                backgroundColor: props.mode === "dark" ? "#394867" : "white",

                color: props.mode === "dark" ? "white" : "#394867",
              }}
              id="myBox"
              rows="8"
            ></textarea>
          </GrammarlyEditorPlugin>
        </div>

        <div className="button-container">
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={handleClick}
          >
            Convert to Uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={handleClick2}
          >
            Convert to Lowercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={handleClick3}
          >
            Clear
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={handleReverse}
          >
            Reverse
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={handleCopy}
          >
            Copy Text
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={removeAllSpace}
          >
            Remove Spaces
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={handleExtraSpace}
          >
            Remove extra space
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={jsonConverter}
          >
            Convert to JSON
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-2 my-2"
            onClick={objConverter}
          >
            Convert to Text
          </button>
          <PdfConverter text={text} />
        </div>
      </div>
      <div
        className="random"
        style={{
          color: props.mode === "dark" ? "white" : "#394867",
        }}
      >
        <h2 className="summary"> Generate random text</h2>
        <input
          type="text"
          placeholder="Text Size"
          value={number}
          style={{
            borderRadius: "5px",
            backgroundColor: props.mode === "dark" ? "#394867" : "white",
            color: props.mode === "dark" ? "white" : "#394867",
          }}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          className="btn btn-primary mx-2 my-2"
          onClick={() => generateRandomText(number)}
          disabled={number.length === 0}
        >
          Generate
        </button>
      </div>
      <div
        className="preview"
        style={{
          color: props.mode === "dark" ? "white" : "#394867",
          backgroundColor: props.mode === "dark" ? "#394867" : "#fff",
        }}
      >
        <h2 className="summary">Your text summary</h2>
        <div
          className="container my-3 summary"
          style={{ color: props.mode === "dark" ? "white" : "#394867" }}
        >
          <div className="div">
            <h2>Text Count</h2>
            <p>
              {
                text.split(/\s+/).filter((element) => {
                  return element.length !== 0;
                }).length
              }{" "}
              Words and {text.length} Character
            </p>
          </div>
          <div className="div">
            <h2>Time to read</h2>
            <p>
              {0.008 *
                text.split(" ").filter((element) => {
                  return element.length !== 0;
                }).length}{" "}
              Minutes to read
            </p>
          </div>
        </div>
        <div className="preview1">
          <h2>Preview</h2>
          <p>{text.length > 0 ? text : "Nothing to Preview"}</p>
        </div>
      </div>
      <div
        className="footer"
        style={{ color: props.mode === "dark" ? "white" : "#394867" }}
      >
        <p>© 2022-2023 | textmode.com</p>
      </div>
    </>
  );
}
