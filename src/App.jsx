import { useState, useEffect } from "react";
import "./App.css";
import Admin from "./components/Admin.jsx";
import DogCatalog from "./components/DogCatalog.jsx";

const SCREENS = {
  WELCOME: "welcome",
  CATALOG: "catalog",
  DOGDETAIL: "dogdetail",
  ADMIN: "admin",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);

  const goToWelcome = () => setCurrentScreen(SCREENS.WELCOME);
  const goToDogCatalog = () => setCurrentScreen(SCREENS.CATALOG);
  const goToDogDetail = () => setCurrentScreen(SCREENS.DOGDETAIL);
  const goToAdmin = () => setCurrentScreen(SCREENS.ADMIN);

  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/6aa7c3abac6210605acad585")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.record.record);
        setDogs(data.record.record);
      })
      .catch((error) => console.error("Error fetching dogs:", error));
  }, []);

  return (
    <div>
      <header>
        <h1>Doggy Daycare</h1>

        <nav>
          <ul>
            <li>
              <a onClick={goToWelcome}>Home</a>
            </li>
            <li>
              <a onClick={goToDogCatalog}>Our Dogs</a>
            </li>
            <li>
              <a onClick={goToAdmin}>Admin Panel</a>
            </li>
            <li>
              <a onClick="">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {currentScreen === SCREENS.WELCOME && (
        <section className="welcome">
          <div className="welcome-text">
            <h2>Welcome to Doggy Daycare</h2>
            <p>A safe and fun place for your furry friends!</p>

            <button onClick={goToDogCatalog}>Meet Our Dogs</button>
          </div>

          <img src="daycare.jpeg" alt="Dogs" />
        </section>
      )}
      {currentScreen === SCREENS.CATALOG && <DogCatalog />}
      {currentScreen === SCREENS.ADMIN && <Admin />}
    </div>
  );
}

export default App;
