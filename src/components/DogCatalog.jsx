import { useEffect } from "react";
import { useState } from "react";
import { getAllDogs } from "../api/dogs-api";
import "./DogCatalog.css";
import defaultDog from "../assets/defaultDogImg.jpg";

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllDogs()
      .then(setDogs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="loading">Loading dogs...</p>;
  }
  if (error) {
    return <p className="error">Something went wrong: {error}</p>;
  }

  return (
    <section>
      <h1>Dog Catalog</h1>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <div className="dog-card" key={dog.chipNumber}>
            <img
              src={dog.img}
              onError={(e) => {
                e.currentTarget.src = defaultDog;
              }}
            />
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
