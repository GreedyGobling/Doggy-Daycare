import { useEffect } from "react";
import { useState } from "react";
import { getAllDogs } from "../api/dogs-api";
import './DogCatalog.css'

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDogs()
          .then(setDogs)
          .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return <p className="loading">Loading dogs...</p>;
  }

  return (
    <section>
      <h2>Dog Catalog</h2>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <div className="dog-card" key={dog.chipNumber}>
            <img src={dog.img}/>
            <h2>{dog.name}</h2>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Present: {dog.present ? "Present" : "Not Present"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DogCatalog;
