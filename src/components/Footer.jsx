import React from 'react';
import { FaPaperPlane, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

import logoRota from '../assets/logoROTA.png';
import aviaozin from '../assets/aviaozin.png';

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Avião decorativo no fundo */}
      <img src={aviaozin} alt="" className="airplane-bg" />

      <div className="footer-content">
        {/* Coluna 1: Logo + Slogan */}
        <div className="brand-column">
          <img src={logoRota} alt="Rota Cultural" className="logo" />
          <p className="tagline">Sua viagem começa aqui.</p>
        </div>

        {/* Linha divisória amarela */}
        <div className="vertical-divider" />

        {/* Coluna 2: Institucional */}
        <div className="link-column">
          <h4>Institucional</h4>
          <a href="#sobre">Sobre nós</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#contato">Contato</a>
        </div>

        {/* Coluna 3: Suporte */}
        <div className="link-column">
          <h4>Suporte</h4>
          <a href="#faq">Perguntas frequentes</a>
          <a href="#ajuda">Central de ajuda</a>
          <a href="#termos">Termos de uso</a>
        </div>

        {/* Coluna 4: Botão + Redes Sociais */}
        <div className="action-column">
          <button className="btn-contact">
            <FaPaperPlane size={14} />
            <span>Fale conosco</span>
          </button>

          <div className="social-row">
            <a href="#instagram" className="social-icon"><FaInstagram size={16} /></a>
            <a href="#facebook" className="social-icon"><FaFacebookF size={14} /></a>
            <a href="#whatsapp" className="social-icon"><FaWhatsapp size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}