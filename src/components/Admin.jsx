import { useState, useEffect } from "react";
import { getAllDogs, updateBin } from "../api/dogs-api.jsx"

function Admin(){
  const [dogs, setDogs] = useState([]);
  
useEffect(() => {
  getAllDogs()
    .then(setDogs)
},[])

  const togglePresent = async (chipNumber) => {
    const next = dogs.map((dog) =>
      dog.chipNumber === chipNumber ? { ...dog, present: !dog.present } : dog
    );
    setDogs(next);
    try {
      await updateBin(next);
    } catch (err) {
      console.error(err);
      setDogs(dogs);
    }
  };

  const grid = { display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" };
  const card = { border: "1px solid #ccc", borderRadius: 8, padding: 12, textAlign: "left" };

  return(
  <>
      <section>
        <h1>hello</h1>
        <div style={grid}>
          {dogs.map((dog) => (
            <div key={dog.chipNumber} style={card}>
              <img src={dog.img} alt={dog.name} width="100%" />
              <h2>{dog.name}</h2>
              <p>Age: {dog.age}</p>
              <p>Breed: {dog.breed}</p>
              <p>Sex: {dog.sex}</p>
              <button onClick={() => togglePresent(dog.chipNumber)}>
                Present: {dog.present ? "yes" : "no"}
              </button>
              <p>
                Owner: {dog.owner.name} {dog.owner.lastName} ({dog.owner.phoneNumber})
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
  
}


export default Admin;
