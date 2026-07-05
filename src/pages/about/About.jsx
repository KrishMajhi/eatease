import React from "react";
import "./about.css";

const STATS = [
  { label: "Restaurant Partners", value: "500+" },
  { label: "Cities Served", value: "12" },
  { label: "Orders Delivered", value: "2M+" },
  { label: "Avg. Delivery Time", value: "28 min" },
];

const VALUES = [
  {
    icon: "🍽️",
    title: "Food First",
    desc: "We obsess over getting your order right — hot, fresh, and exactly as ordered.",
  },
  {
    icon: "⚡",
    title: "Speed Matters",
    desc: "Smart routing and real partner restaurants mean your food arrives fast, every time.",
  },
  {
    icon: "🤝",
    title: "Fair to Partners",
    desc: "Restaurants on EatEase keep more of every order, so local kitchens can thrive.",
  },
  {
    icon: "🌱",
    title: "Built to Last",
    desc: "We're building a platform for the long run — for eaters, riders, and restaurants alike.",
  },
];

const About = ({ name = "EatEase" }) => {
  return (
    <div className="about-container">
      {/* Hero */}
      <section className="about-hero">
        <span className="about-eyebrow">Our Story</span>
        <h1>
          About <span className="brand-highlight">{name}</span>
        </h1>
        <p className="about-hero-sub">
          We connect hungry people with the restaurants they love — fast,
          reliable, and made for everyday cravings.
        </p>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {STATS.map((s) => (
          <div className="about-stat-card" key={s.label}>
            <p className="about-stat-value">{s.value}</p>
            <p className="about-stat-label">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-mission-text">
          <h2>Why we do this</h2>
          <p>
            EatEase started with a simple idea: ordering food online should
            feel effortless. No clutter, no confusion — just great restaurants,
            clear menus, and a cart that gets your order to your door quickly.
          </p>
          <p>
            Today we work with restaurants of every size, from neighborhood
            favorites to citywide chains, so there's always something nearby
            worth ordering.
          </p>
        </div>
        <div className="about-mission-visual" aria-hidden="true">
          🍕🍔🍜
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <h2 className="about-section-title">What we stand for</h2>
        <div className="about-values-grid">
          {VALUES.map((v) => (
            <div className="about-value-card" key={v.title}>
              <span className="about-value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
