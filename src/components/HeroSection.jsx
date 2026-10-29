import React from 'react';
import heroImg from '../assets/hero.png';

export default function HeroSection({ onStart }) {
  return (
    <div className="hero-section animate-slide">
      <div className="hero-left">
        <span className="hero-badge">RECOMENDAÇÕES</span>
        <h1>Encontre lugares que combinam com você</h1>
        <p>Responda algumas perguntas e descubra experiências incríveis feitas sob medida para o seu estilo de viagem.</p>
        <button className="btn-next hero-cta-btn" onClick={onStart}>
          Começar recomendação ✈️
        </button>
      </div>
      <div className="hero-right">
        <div className="arch-image-frame">
          <img src={heroImg} alt="Viagem" />
          <div className="floating-tag">
            Sua próxima aventura começa aqui! ✈️
          </div>
        </div>
      </div>
    </div>
  );
}