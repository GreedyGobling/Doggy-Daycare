import { useState, useEffect} from "react";
import "./App.css";
import Admin from "./components/Admin.jsx";
import DogCatalog from "./components/DogCatalog.jsx";
import Attendance from "./components/Attendance.jsx";
import { getAllDogs } from "./api/dogs-api";

const SCREENS = {
  WELCOME: "welcome",
  CATALOG: "catalog",
  ADMIN: "admin",
  ATTENDANCE: "attendance",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
  const [dogOfTheDay, setDogOfTheDay] = useState(null);

useEffect(() => {
  getAllDogs()
    .then((dogs) => {
      const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
      setDogOfTheDay(randomDog);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  const goToWelcome = () => setCurrentScreen(SCREENS.WELCOME);
  const goToDogCatalog = () => setCurrentScreen(SCREENS.CATALOG);
  const goToAdmin = () => setCurrentScreen(SCREENS.ADMIN);
  const goToAttendance = () => setCurrentScreen(SCREENS.ATTENDANCE);

  

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
              <a onClick={goToAttendance}>Attendance</a>
            </li>
            <li>
              <a onClick="">Contact</a>
              <a>Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {currentScreen === SCREENS.WELCOME && (
        <>
        <section className="welcome">
          <div className="welcome-text">
            <h2>Welcome to Doggy Daycare</h2>
            <p>A safe and fun place for your furry friends!</p>

            <button onClick={goToDogCatalog}>Meet Our Dogs</button>
          </div>

          <img src="daycare.jpeg" alt="Dogs" />
        </section>

        <section className="what-we-offer">
         <h2>What We Offer</h2>

          <div className="offer-cards">

          <div className="offer-card">
           <h3>Play & Exercise</h3>
            <p>Plenty of activity and playtime for your dogs.</p>
         </div>

         <div className="offer-card">
          <h3>Care & Attention</h3>
           <p>Every dog gets the care and attention they deserve.</p>
         </div>

        <div className="offer-card">
          <h3>Safe Environment</h3>
           <p>A comfortable and safe place for dogs to relax.</p>
        </div>

        </div>
      </section>
         
      <section className="dog-of-the-day">
       <h2>Dog of the Day</h2>

        {dogOfTheDay && (
        <>
         <img src={dogOfTheDay.img} alt={dogOfTheDay.name} />
          <h3>{dogOfTheDay.name}</h3>
           <p>{dogOfTheDay.breed}</p>
        </>
         )}
      </section>

      </>
 )}


      {currentScreen === SCREENS.CATALOG && <DogCatalog />}
      {currentScreen === SCREENS.ADMIN && <Admin />}
      {currentScreen === SCREENS.ATTENDANCE && <Attendance />}
    </div>
  );
}

export default App;
