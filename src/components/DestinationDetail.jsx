import React from 'react';

const FALLBACK_PLACE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

export default function DestinationDetail({ place, onBack, onToggleFavorite, isFavorite }) {
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_PLACE;
  };

  return (
    <div className="details-container animate-slide">
      <button className="btn-back" onClick={onBack} style={{ marginBottom: '20px' }}>
        ← Voltar para os resultados
      </button>

      <div className="detail-hero-banner">
        <img src={place.image} alt={place.name} onError={handleImgError} />
        {place.matchPercentage && (
          <span className="detail-match-badge">{place.matchPercentage}% compatível</span>
        )}
      </div>

      <div className="detail-two-columns">
        <div className="detail-main-col">
          <div className="detail-header-info">
            <h2>{place.name}</h2>
            <p className="card-loc">📍 {place.location}</p>
            <p className="detail-rating">⭐ <strong>{place.rating || "4.8"}</strong> ({place.reviews || "1.200"} avaliações)</p>
          </div>

          <div className="detail-tags-row">
            {(place.tags || ["Cultura", "Turismo"]).map((tag, idx) => (
              <span key={idx} className="detail-tag-chip">{tag}</span>
            ))}
          </div>

          <div className="detail-block">
            <h3>Sobre o destino</h3>
            <p className="detail-description">{place.description}</p>
          </div>

          <div className="detail-block">
            <h3>Informações para sua visita</h3>
            <ul className="detail-bullet-list">
              <li>⏱️ <strong>Duração média:</strong> {place.duration || "2 a 4 horas"}</li>
              <li>☀️ <strong>Melhor horário:</strong> {place.bestTime || "Manhã ou fim de tarde"}</li>
              <li>♿ <strong>Acessibilidade:</strong> {place.accessibility || "Estrutura com acessibilidade"}</li>
            </ul>
          </div>
        </div>

        <div className="detail-sidebar-col">
          <div className="booking-card">
            <span className="sidebar-price-label">Investimento Estimado</span>
            <div className="sidebar-price-val">{place.price}</div>

            <button 
              className="btn-next full-width" 
              onClick={() => onToggleFavorite(place)}
              style={{ marginBottom: '12px' }}
            >
              {isFavorite ? '❤️ Salvo nos Favoritos' : '🤍 Salvar nos Favoritos'}
            </button>

            <button 
              className="btn-back full-width"
              onClick={() => alert(`Roteiro para ${place.name} adicionado ao itinerário!`)}
            >
              📍 Planejar Viagem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}