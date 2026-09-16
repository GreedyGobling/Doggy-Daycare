import { useState, useEffect } from "react";
import { getAllDogs, updateBin } from "../api/dogs-api.jsx"

function Admin(){
  const [dogs, setDogs] = useState([]);
  const [editing, setEditing] = useState([]);

useEffect(() => {
  getAllDogs()
    .then(setDogs)
},[])
  

  const startEditing = (dog) => {
    setEditing((current) => [...current, { ...dog }]);
  };

  const updateDraft = (chipNumber, field, value) => {
    setEditing((current) =>
      current.map((dog) =>
        dog.chipNumber === chipNumber ? { ...dog, [field]: value } : dog
      )
    );
  };

  const cancelEditing = (chipNumber) => {
    setEditing((current) => current.filter((dog) => dog.chipNumber !== chipNumber));
  };

  const saveDog = async (draft) => {
    const next = dogs.map((dog) =>
      dog.chipNumber === draft.chipNumber ? draft : dog
    );

    try {
      await updateBin(next);
      setDogs(next);
      cancelEditing(draft.chipNumber);
    } catch (err) {
      console.error(err);
    }
  };

  const grid = { display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" };
  const card = { border: "1px solid #ccc", borderRadius: 8, padding: 12, textAlign: "left", minWidth: 0 };

  return(
  <>
      <header>
        <button onClick={() => getAllDogs().then(setDogs)}>Get Dogs</button>
        <button onClick={() => updateBin(dogs)}>Update</button>
      </header>
      <section>
        <h1>hello</h1>
        <div style={grid}>
          {dogs.map((dog) => (
            <div key={dog.chipNumber} style={card}>
              <img src={dog.img} alt={dog.name} width="100%" />
              {editing.find((draft) => draft.chipNumber === dog.chipNumber) ? (
                (() => {
                  const draft = editing.find((item) => item.chipNumber === dog.chipNumber);
                  return (
                    <>
                      {['name', 'breed', 'sex', 'age'].map((field) => (
                        <label key={field}>
                          {field}: 
                          <input
                            type={field === 'age' ? 'number' : 'text'}
                            value={draft[field] ?? ''}
                            onChange={(event) => updateDraft(dog.chipNumber, field, event.target.value)}
                          />
                        </label>
                      ))}
                      <button onClick={() => saveDog(draft)}>Save</button>
                      <button onClick={() => cancelEditing(dog.chipNumber)}>Cancel</button>
                    </>
                  );
                })()
              ) : (
                <>
                  <h2>{dog.name}</h2>
                  <p>Age: {dog.age}</p>
                  <p>Breed: {dog.breed}</p>
                  <p>Sex: {dog.sex}</p>
                  <p>Owner: {dog.owner.name} {dog.owner.lastName}</p> 
                  <p>PhoneNumber: {dog.owner.phoneNumber}</p> 
                  <button onClick={() => startEditing(dog)}>Edit</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
  
}


export default Admin;
