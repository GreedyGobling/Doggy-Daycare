import { useEffect } from "react";
import { useState } from "react";

const apiURL = "https://api.jsonbin.io/v3/b/6aa7c2faffd5d160530465bf";
const ACCESS_KEY =
  "$2a$10$zXa7BhCgKbQSrVOx5p3dQuV6kdmQ5SzMEZV4dY.dQf9zWxmkNKro.";

function DogCatalog() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(apiURL, {
        headers: {
          "X-Access-Key": ACCESS_KEY,
        },
      });
      console.log("Got response: ", response);
      const data = await response.json();
      console.log("Got data", data);

      console.log("Dogs:", data.record.record);
      setDogs(data.record.record);
    };
    getData();
  }, []);

  if (dogs.length === 0) {
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
