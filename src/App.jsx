import { useState} from "react";
import "./App.css";
import Admin from "./components/Admin.jsx";
import DogCatalog from "./components/DogCatalog.jsx";

const SCREENS = {
  WELCOME: "welcome",
  CATALOG: "catalog",
  ADMIN: "admin",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);

  const goToWelcome = () => setCurrentScreen(SCREENS.WELCOME);
  const goToDogCatalog = () => setCurrentScreen(SCREENS.CATALOG);
  const goToAdmin = () => setCurrentScreen(SCREENS.ADMIN);

  

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
