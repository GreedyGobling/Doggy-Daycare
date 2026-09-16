function DogDetails({ dog, onBack }) {
  if (!dog) {
    return <p>No dog selected.</p>;
  }

  return (
    <section className="dog-details">
      <button type="button" onClick={onBack}>
        ← Back to catalog
      </button>

      <img src={dog.img} alt={dog.name} />

      <div>
        <h2>{dog.name}</h2>
        <p>
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p>
          <strong>Age:</strong> {dog.age}
        </p>
        <p>
          <strong>Sex:</strong> {dog.sex}
        </p>
        <p>
          <strong>Chip number:</strong> {dog.chipNumber}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {dog.present ? "Present at daycare" : "Not present"}
        </p>

        {dog.owner && (
          <>
            <h3>Owner</h3>
            <p>
              {dog.owner.name} {dog.owner.lastName}
            </p>
            <p>{dog.owner.phoneNumber}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default DogDetails;
