import { useEffect, useState } from "react";
import { getAllDogs, updateBin } from "../api/dogs-api";
import defaultDog from "../assets/defaultDogImg.jpg";
import "./Attendance.css";

function Attendance() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingChipNumber, setSavingChipNumber] = useState(null);

  useEffect(() => {
    getAllDogs()
      .then(setDogs)
      .catch(() => setError("Could not load attendance right now."))
      .finally(() => setLoading(false));
  }, []);

  const toggleAttendance = async (dog) => {
    const nextDogs = dogs.map((currentDog) =>
      currentDog.chipNumber === dog.chipNumber
        ? { ...currentDog, present: !currentDog.present }
        : currentDog
    );

    setSavingChipNumber(dog.chipNumber);
    setError("");

    try {
      await updateBin(nextDogs);
      setDogs(nextDogs);
    } catch {
      setError(`Could not update ${dog.name}'s attendance.`);
    } finally {
      setSavingChipNumber(null);
    }
  };

  if (loading) {
    return <p className="attendance-message">Loading attendance...</p>;
  }

  if (error && dogs.length === 0) {
    return <p className="attendance-message attendance-error">{error}</p>;
  }

  const presentDogs = dogs.filter((dog) => dog.present);

  return (
    <main className="attendance-page">
      <div className="attendance-heading">
        <div>
          <p className="eyebrow">Daily overview</p>
          <h2>Attendance</h2>
          <p className="attendance-date">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>
        <div className="attendance-summary" aria-label="Dogs currently at daycare">
          <strong>{presentDogs.length}</strong>
          <span>of {dogs.length} dogs here</span>
        </div>
      </div>

      {error && <p className="attendance-error">{error}</p>}

      <section className="attendance-list" aria-label="Dog attendance list">
        {dogs.map((dog) => {
          const isSaving = savingChipNumber === dog.chipNumber;

          return (
            <article className={`attendance-card ${dog.present ? "is-present" : ""}`} key={dog.chipNumber}>
              <img
                src={dog.img}
                alt={dog.name}
                onError={(event) => {
                  event.currentTarget.src = defaultDog;
                }}
              />
              <div className="attendance-dog-info">
                <h3>{dog.name}</h3>
                <p>{dog.breed}</p>
                <span className={`attendance-status ${dog.present ? "status-present" : "status-away"}`}>
                  <span className="status-dot" aria-hidden="true" />
                  {dog.present ? "Checked in" : "Not checked in"}
                </span>
              </div>
              <button
                type="button"
                className={dog.present ? "check-out-button" : "check-in-button"}
                onClick={() => toggleAttendance(dog)}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : dog.present ? "Check out" : "Check in"}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Attendance;