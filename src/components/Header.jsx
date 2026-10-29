import React from 'react';
import logoRota from '../assets/logoROTA.png';

export default function Header({ step, setStep, favoritesCount, historyCount }) {
  return (
    <header className="header-nav">
      <div className="header-logo" onClick={() => setStep(0)}>
        <img src={logoRota} alt="Rota Cultural" className="logo-img" />
      </div>
      <nav className="header-links">
        <span onClick={() => setStep(0)} className={step === 0 ? 'active' : ''}>Início</span>
        <span onClick={() => setStep(1)} className={step >= 1 && step <= 6 ? 'active' : ''}>Explorar</span>
        <span onClick={() => setStep(8)} className={step === 8 ? 'active' : ''}>
          Favoritos {favoritesCount > 0 && `(${favoritesCount})`}
        </span>
        <span onClick={() => setStep(9)} className={step === 9 ? 'active' : ''}>
          Histórico {historyCount > 0 && `(${historyCount})`}
        </span>
      </nav>
      <div className="header-profile">
        <span className="profile-icon">👤</span>
      </div>
    </header>
  );
}