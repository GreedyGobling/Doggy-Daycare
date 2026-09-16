import { useState, useEffect } from "react";
// api 
// modify and add by api
//
const API = "";
const API_KEY = "";

const headers = () => ({ "X-Access-Key": API_KEY, "Content-Type": "application/json"});

async function readBin() {
  const res = await fetch(`${API}/latest`, { headers: headers() });
  if (!res.ok) throw new Error (`read failed: ${res.status}`);
  return (await res.json()).record;
}

function Admin(){
  const [dogs, setDogs] = useState([]);
  
useEffect(() => {
  readBin().then(setDogs).catch(console.error)
},[])

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
              <p>Present: {dog.present ? "yes" : "no"}</p>
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
