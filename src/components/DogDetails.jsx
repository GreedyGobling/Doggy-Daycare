import "./DogDetails.css";
import defaultDog from "../assets/defaultDogImg.jpg";

function DogDetails({ dog, onBack }) {
  if (!dog) {
    return <p>No dog selected.</p>;
  }

  return (
    <section className="dog-details-overlay">
      <div className="dog-details">
        <div className="dog-card-detail">
          <button className="close-card-button" type="button" onClick={onBack}>
            ×
          </button>

          <div className="dog-detail-hero">
            <img
              src={dog.img}
              alt={dog.name}
              onError={(e) => {
                e.currentTarget.src = defaultDog;
              }}
            />

            <div className="dog-detail-name">
              <h2>{dog.name}</h2>
              <p>
                <strong>Breed:</strong> {dog.breed}
              </p>
            </div>
          </div>

          <div className="dog-detail-stats">
            <div className="stat-box">
              <p>
                <strong>Age:</strong> {dog.age}
              </p>
            </div>
            <div className="stat-box">
              <p>
                <strong>Sex:</strong> {dog.sex}
              </p>
            </div>
            <div className="stat-box">
              <p>
                <strong>Chip number:</strong> {dog.chipNumber}
              </p>
            </div>
            <div className="stat-box">
              <p>
                <strong>Status:</strong>{" "}
                <span className={dog.present ? "present" : "not-present"}>
                {dog.present ? "Present at daycare" : "Not present"}
                </span>
              </p>
            </div>

            <div className="dog-detail-owner">
              <div className="owner-info">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DogDetails;
