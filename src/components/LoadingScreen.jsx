import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="loading-screen animate-slide">
      <div className="spinner-globe">🌍</div>
      <h2>Procurando as melhores opções...</h2>
      <p className="loading-subtext">Analisando destinos compatíveis com suas preferências.</p>
    </div>
  );
}