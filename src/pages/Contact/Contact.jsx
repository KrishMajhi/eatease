import React, { useState } from "react";
import "./contact.css";

const INFO_CARDS = [
  {
    icon: "💬",
    title: "Customer Support",
    lines: ["support@eatease.com", "+91 98765 43210"],
  },
  {
    icon: "🕐",
    title: "Delivery Hours",
    lines: ["Mon–Fri: 10:00 AM – 11:00 PM", "Sat–Sun: 9:00 AM – 12:00 AM"],
  },
  {
    icon: "📍",
    title: "Visit Us",
    lines: ["123 Tasty Street, Food City", "India"],
  },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-inner">
        <span className="contact-eyebrow">Get in Touch</span>
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Have questions about your order, menu, or delivery? We're here to
          help!
        </p>

        <div className="contact-cards">
          {INFO_CARDS.map((c) => (
            <div className="contact-card" key={c.title}>
              <span className="contact-card-icon">{c.icon}</span>
              <h2>{c.title}</h2>
              {c.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="contact-form-wrap">
          <h2 className="contact-form-title">Send us a message</h2>

          {sent && (
            <div className="contact-success">
              ✓ Thanks! Your message has been received — we'll get back to
              you soon.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
