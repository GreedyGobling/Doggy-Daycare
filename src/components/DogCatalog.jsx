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

  return <p>{dogs[0].name}</p>;
}

export default DogCatalog;
