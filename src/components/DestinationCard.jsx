import React from 'react';

const FALLBACK_PLACE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

export default function DestinationCard({ place, onSelect, showMatch = false }) {
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_PLACE;
  };

  return (
    <div className="result-card">
      <div className="card-img-container">
        <img src={place.image} alt={place.name} onError={handleImgError} />
        {showMatch && place.matchPercentage && (
          <span className="match-badge">{place.matchPercentage}% compatível</span>
        )}
      </div>
      <div className="card-info">
        <h3>{place.name}</h3>
        <p className="card-loc">📍 {place.location}</p>
        <p className="card-price"><strong>{place.price}</strong></p>
        <button className="btn-next full-width" onClick={() => onSelect(place)}>
          Ver local →
        </button>
      </div>
    </div>
  );
}