import "./App.css";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import Alert from "./component/Alert";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./component/About";
import PDFmaker from "./component/PDF Maker/PDFmaker";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212A3E";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#f0f2f5";
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          title="TextMode"
          aboutText="about"
          mode={mode}
          toggleMode={toggleMode}
        ></Navbar>
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <TextForm
                  showAlert={showAlert}
                  heading="Enter the text to manipulate"
                  mode={mode}
                ></TextForm>
              }
            ></Route>
          </Routes>
        </div>
        <Routes>
          <Route path="/about" element={<About mode={mode} />}></Route>
        </Routes>
        <Routes>
          <Route path="/PDFmaker" element={<PDFmaker mode={mode} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
