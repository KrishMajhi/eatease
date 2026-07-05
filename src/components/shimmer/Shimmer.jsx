import React from "react";
import "./Shimmer.css";

const ShimmerCard = () => (
  <div className="shimmer-card">
    <div className="shimmer-img" />
    <div className="shimmer-info">
      <div className="shimmer-line sl-title" />
      <div className="shimmer-line sl-sub" />
      <div className="shimmer-line sl-detail" />
    </div>
  </div>
);

const Shimmer = () => (
  <div className="shimmer-container">
    {Array.from({ length: 12 }).map((_, i) => (
      <ShimmerCard key={i} />
    ))}
  </div>
);

export default Shimmer;
