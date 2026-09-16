import { useEffect, useState } from "react";
import { getAllDogs } from "../api/dogs-api";
import DogDetails from "./DogDetails";

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    getAllDogs().then(setDogs);
  }, []);

  if (dogs.length === 0) {
    return <p className="loading">Loading dogs...</p>;
  }

  if (selectedDog) {
    return <DogDetails dog={selectedDog} onBack={() => setSelectedDog(null)} />;
  }

  return (
    <section>
      <h2>Dog Catalog</h2>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <div className="dog-card" key={dog.chipNumber}>
            <img src={dog.img} />
            <h2>{dog.name}</h2>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Present: {dog.present ? "Present" : "Not Present"}</p>

            <button type="button" onClick={() => setSelectedDog(dog)}>
              View details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DogCatalog;
