import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
function About(props) {
  return (
    <>
      <div className="about">
        <div
          className="about-container"
          style={{
            backgroundColor: props.mode === "dark" ? "#394867" : "white",
            color: props.mode === "dark" ? "white" : "#394867",
          }}
        >
          <h1>About the Text Mode</h1>
          <p>
            Welcome to Text Mode, the ultimate tool for manipulating your text
            in any way you desire. With Text Mode, you can easily convert text
            to uppercase or lowercase, remove blank spaces, and even convert
            your text to JSON. And if you need some filler text, we've got you
            covered with our random text generator.
            <br /> To convert your text to uppercase, simply click the
            "Uppercase" button. Similarly, if you want to convert your text to
            lowercase, just click the "Lowercase" button. If you want to remove
            any blank spaces in your text, click the "Remove Spaces" button.
            <br /> In addition to these basic functions, Text Mode also offers
            more advanced features. You can convert your text to JSON by
            clicking the "JSON" button, and you can convert your JSON back to
            text by clicking the "Object" button. If you need some filler text,
            simply click the "Generate Random Text" button to create a random
            string of letters, numbers, and symbols.
            <br /> But that's not all! Text Mode also has a preview feature so
            you can see how your text will look before you save it. And if
            you're curious about how long your text is, we have a word count
            feature that will give you the exact number of words in your text.
            <br /> Plus, with our integrated Grammarly feature, you can ensure
            that your text is free of any spelling or grammar errors before you
            save it.
            <br /> And of course, all of these features are customizable. You
            can adjust the settings to your liking and save your preferences for
            future use. So whether you're a writer, a programmer, or just
            someone who loves manipulating text, Text Mode is the perfect tool
            for you. Thank you for using TextMode, <span>Praveen Kumar</span>
          </p>
          <div className="footer-right">
            <div className="footer-icon">
              <a
                href="https://www.instagram.com/praveen__kumar.24/?next=%2F"
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon className="footer-icon2" icon={faInstagram} />
              </a>
            </div>
            <div className="footer-icon">
              <a
                href="https://github.com/praveenfearless08"
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon className="footer-icon2" icon={faGithub} />
              </a>
            </div>
            <div className="footer-icon">
              <a
                href="https://www.linkedin.com/in/praveen-kumar-2408/"
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon className="footer-icon2" icon={faLinkedin} />
              </a>
            </div>
          </div>
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

export default About;
