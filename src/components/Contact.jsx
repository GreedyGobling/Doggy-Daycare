import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    event.currentTarget.reset();
    setMessageSent(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-card">
        <h2>Contact Us</h2>

        <p>
          Have a question about Doggy Daycare? Send us a message and we will get
          back to you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />

          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="6" required />

          <button type="submit">Send message</button>

          {messageSent && (
            <p className="contact-success" role="status">
              Thank you! Your message has been received.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Contact;
