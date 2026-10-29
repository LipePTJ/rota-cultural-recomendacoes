import React, { useState, useEffect } from 'react';
import './Recommendations.css';
import Header from './Header';
import HeroSection from './HeroSection';
import DestinationCard from './DestinationCard';
import DestinationDetail from './DestinationDetail';
import LoadingScreen from './LoadingScreen';

// BANCO DE DADOS COMPLETO COM OS 40 DESTINOS E IMAGENS LOCAIS
const DESTINATIONS = [
  {
    id: 1,
    name: "Pelourinho",
    location: "Salvador, BA",
    state: "Bahia",
    placeType: "historicos",
    budgetCategory: "economico",
    price: "R$ 15 - R$ 50",
    rating: "4.8",
    reviews: "1.250",
    tags: ["Histórico", "Cultura Afro", "Arquitetura Colonial"],
    image: "/images/pelourinho.png",
    activities: ["cultura", "arte", "gastronomia"],
    description: "O Pelourinho é o coração histórico de Salvador. Com casarios coloniais coloridos dos séculos XVII e XVIII, ladeiras de paralelepípedo e o som marcante do Olodum, o bairro é Patrimônio Mundial da UNESCO.",
    duration: "3 a 5 horas",
    bestTime: "Fim de tarde (para pegar o pôr do sol na Praça da Sé)",
    accessibility: "Ladeiras íngremes de pedra; pavimentação histórica adaptada em alguns pontos."
  },
  {
    id: 2,
    name: "MASP - Museu de Arte de SP",
    location: "São Paulo, SP",
    state: "São Paulo",
    placeType: "museus",
    budgetCategory: "medio",
    price: "R$ 60,00 (Terça grátis)",
    rating: "4.9",
    reviews: "4.100",
    tags: ["Arte Ocidental", "Arquitetura", "Avenida Paulista"],
    image: "/images/masp.png",
    activities: ["arte", "cultura"],
    description: "Um dos símbolos arquitetônicos mais icônicos do Brasil, projetado por Lina Bo Bardi com seu vão livre impressionante. Abriga o acervo de arte ocidental mais importante do Hemisfério Sul.",
    duration: "2 a 3 horas",
    bestTime: "Terças-feiras (entrada gratuita com agendamento online)",
    accessibility: "Totalmente acessível com elevadores e rampas."
  },
  {
    id: 3,
    name: "Parque Ibirapuera",
    location: "São Paulo, SP",
    state: "São Paulo",
    placeType: "parques",
    budgetCategory: "economico",
    price: "Gratuito",
    rating: "4.9",
    reviews: "5.800",
    tags: ["Natureza", "Lazer", "Niemeyer"],
    image: "/images/ibirapuera.png",
    activities: ["natureza", "relaxamento", "cultura"],
    description: "O pulmão verde de São Paulo. Conta com lagos, pistas de caminhada, marquise icônica projetada por Oscar Niemeyer, além de abrigar o MAM, o Museu Afro Brasil e o Auditório Ibirapuera.",
    duration: "2 a 4 horas",
    bestTime: "Manhã cedo ou fim de tarde",
    accessibility: "Totalmente plano e acessível para cadeirantes."
  },
  {
    id: 4,
    name: "Cristo Redentor",
    location: "Rio de Janeiro, RJ",
    state: "Rio de Janeiro",
    placeType: "historicos",
    budgetCategory: "confortavel",
    price: "R$ 90 - R$ 120",
    rating: "5.0",
    reviews: "9.500",
    tags: ["Maravilha do Mundo", "Panorama", "Ícone"],
    image: "/images/cristoredentor.png",
    activities: ["cultura", "natureza"],
    description: "Uma das Sete Maravilhas do Mundo Moderno. Localizado no topo do Morro do Corcovado, a 710 metros acima do nível do mar, oferece uma vista panorâmica surreal da Cidade Maravilhosa.",
    duration: "3 a 4 horas (incluindo o passeio de trem do Corcovado)",
    bestTime: "Primeiros horários da manhã para evitar filas",
    accessibility: "Possui elevadores e escadas rolantes até o topo."
  },
  {
    id: 5,
    name: "Jardim Botânico de Curitiba",
    location: "Curitiba, PR",
    state: "Paraná",
    placeType: "parques",
    budgetCategory: "economico",
    price: "Gratuito",
    rating: "4.9",
    reviews: "3.400",
    tags: ["Estufa de Vidro", "Jardim Francês", "Fotografia"],
    image: "/images/jardimbotanicocuritiba.png",
    activities: ["natureza", "relaxamento"],
    description: "Cartão-postal máximo de Curitiba. A estufa em estrutura metálica e vidro foi inspirada no Palácio de Cristal de Londres e é cercada por jardins em estilo francês geométrico.",
    duration: "1 a 2 horas",
    bestTime: "Fim de tarde para ver a iluminação da estufa",
    accessibility: "Alameda principal plana e totalmente acessível."
  },
  {
    id: 6,
    name: "Instituto Inhotim",
    location: "Brumadinho, MG",
    state: "Minas Gerais",
    placeType: "museus",
    budgetCategory: "medio",
    price: "R$ 50,00",
    rating: "5.0",
    reviews: "4.200",
    tags: ["Arte Contemporânea", "Jardim Botânico", "Cultura"],
    image: "/images/instituitoinhotim.png",
    activities: ["arte", "natureza", "cultura"],
    description: "O maior museu a céu aberto do mundo. Reúne pavilhão de arte contemporânea internacional e um exuberante jardim botânico com mais de 4.000 espécies de plantas espalhadas em 140 hectares.",
    duration: "Dia inteiro (ou 2 dias)",
    bestTime: "A partir das 9h30 para aproveitar o dia todo",
    accessibility: "Disponibiliza transporte interno de carrinhos elétricos adaptados."
  },
  {
    id: 7,
    name: "Praia de Copacabana",
    location: "Rio de Janeiro, RJ",
    state: "Rio de Janeiro",
    placeType: "praias",
    budgetCategory: "economico",
    price: "Gratuito",
    rating: "4.7",
    reviews: "7.100",
    tags: ["Calçadão", "Quiostes", "Mar"],
    image: "/images/copacabana.png",
    activities: ["relaxamento", "natureza"],
    description: "A 'Princesinha do Mar'. Conhecida pelo seu calçadão em pedras portuguesas com desenho de ondas, quiostes modernos e 4 km de orla agitada para esportes e relaxamento.",
    duration: "2 a 5 horas",
    bestTime: "Manhã de sol ou início da noite no calçadão",
    accessibility: "Rampa de acesso à areia e esteira acessível perto do Posto 6."
  },
  {
    id: 8,
    name: "Mercado Municipal de SP",
    location: "São Paulo, SP",
    state: "São Paulo",
    placeType: "restaurantes",
    budgetCategory: "medio",
    price: "R$ 40 - R$ 90",
    rating: "4.6",
    reviews: "3.900",
    tags: ["Gastronomia", "Frutas Exóticas", "Sanduíche de Mortadela"],
    image: "/images/mercadomunicipal.png",
    activities: ["gastronomia", "cultura"],
    description: "Prédio histórico de 1933 recheado de vitrais alemães. Famoso pelos fartos sanduíches de mortadela, pastéis de bacalhau e degustação de frutas exóticas do mundo todo.",
    duration: "2 horas",
    bestTime: "Horário do almoço em dias úteis",
    accessibility: "Acesso por rampas no piso térreo e elevadores para o mezanino."
  },
  {
    id: 9,
    name: "Lençóis Maranhenses",
    location: "Barreirinhas, MA",
    state: "Maranhão",
    placeType: "parques",
    budgetCategory: "premium",
    price: "R$ 200 - R$ 500",
    rating: "5.0",
    reviews: "3.100",
    tags: ["Dunas", "Lagoas Cristalinas", "Ecoturismo"],
    image: "/images/lencoismaranhenses.png",
    activities: ["natureza", "aventura"],
    description: "Um deserto único no planeta pontilhado por milhares de lagoas de água doce azul-turquesa formadas pelas chuvas entre dunas de areia ultrabranca.",
    duration: "2 a 4 dias",
    bestTime: "De Junho a Setembro (quando as lagoas estão cheias)",
    accessibility: "Requer caminhada na areia fofa e acesso em veículos 4x4 traçados."
  },
  {
    id: 10,
    name: "Chapada Diamantina",
    location: "Lençóis, BA",
    state: "Bahia",
    placeType: "parques",
    budgetCategory: "confortavel",
    price: "R$ 100 - R$ 250",
    rating: "4.9",
    reviews: "2.800",
    tags: ["Cachoeiras", "Morro do Pai Inácio", "Grutas"],
    image: "/images/chapada.png",
    activities: ["natureza", "aventura"],
    description: "Santuário ecoturístico no centro da Bahia com morros imponentes, o Poço Azul, grutas subterrâneas de água transparente e cachoeiras lendárias como a da Fumaça.",
    duration: "3 a 5 dias",
    bestTime: "Pôr do sol no Morro do Pai Inácio",
    accessibility: "Trilhas de ecoturismo com graus variado de dificuldade."
  },
  {
    id: 11,
    name: "Vila de Jericoacoara",
    location: "Jijoca de Jericoacoara, CE",
    state: "Ceará",
    placeType: "praias",
    budgetCategory: "confortavel",
    price: "Taxa de R$ 30",
    rating: "4.9",
    reviews: "4.100",
    tags: ["Redes na Água", "Pedra Furada", "Pôr do Sol"],
    image: "/images/vilajericoacoa.png",
    activities: ["relaxamento", "aventura", "natureza"],
    description: "Antiga vila de pescadores onde as ruas são de areia, sem iluminação pública agressiva, rodeada por lagoas cristalinas com redes de descanso dentro d'água.",
    duration: "2 a 4 dias",
    bestTime: "Julho a Dezembro (época dos ventos para kitesurf e dias limpos)",
    accessibility: "Ruas totalmente cobertas de areia fofa."
  },
  {
    id: 12,
    name: "Cataratas do Iguaçu",
    location: "Foz do Iguaçu, PR",
    state: "Paraná",
    placeType: "parques",
    budgetCategory: "confortavel",
    price: "R$ 90,00",
    rating: "5.0",
    reviews: "8.900",
    tags: ["Maravilha Natural", "Garganta do Diabo", "Mata Atlântica"],
    image: "/images/cataratas.png",
    activities: ["natureza", "aventura"],
    description: "Um dos espetáculos naturais mais impressionantes da Terra. São 275 quedas d'água em meio ao Parque Nacional do Iguaçu com passarelas que levam pertinho do vapor d'água.",
    duration: "Dia inteiro",
    bestTime: "Início da manhã para ver o arco-íris constante sobre o salto",
    accessibility: "Ônibus panorâmico com elevador e passarelas 100% adaptadas."
  },
  {
    id: 13,
    name: "Centro Histórico de Ouro Preto",
    location: "Ouro Preto, MG",
    state: "Minas Gerais",
    placeType: "historicos",
    budgetCategory: "economico",
    price: "R$ 15 - R$ 40",
    rating: "4.9",
    reviews: "3.600",
    tags: ["Barroco", "Aleijadinho", "História do Ouro"],
    image: "/images/centrohistoricoop.png",
    activities: ["cultura", "arte"],
    description: "Cidade histórica fundada no Século XVIII. Abriga a maior coleção de arquitetura barroca do Brasil, com esculturas de Aleijadinho na Igreja de São Francisco de Assis.",
    duration: "1 a 2 dias",
    bestTime: "Dia todo",
    accessibility: "Ladeiras muito íngremes calçadas em pedras pé-de-moleque."
  },
  {
    id: 14,
    name: "Museu do Amanhã",
    location: "Rio de Janeiro, RJ",
    state: "Rio de Janeiro",
    placeType: "museus",
    budgetCategory: "economico",
    price: "R$ 30,00",
    rating: "4.8",
    reviews: "2.300",
    tags: ["Ciência", "Sustentabilidade", "Praça Mauá"],
    image: "/images/museuamanha.png",
    activities: ["cultura", "arte"],
    description: "Projetado por Santiago Calatrava na Praça Mauá, o museu aplica a ciência e a tecnologia para examinar o passado, entender o presente e imaginar caminhos sustentáveis para o futuro.",
    duration: "2 a 3 horas",
    bestTime: "Terças-feiras (entrada grátis)",
    accessibility: "Totalmente acessível e moderno."
  },
  {
    id: 15,
    name: "Ópera de Arame",
    location: "Curitiba, PR",
    state: "Paraná",
    placeType: "eventos",
    budgetCategory: "economico",
    price: "R$ 15,00",
    rating: "4.8",
    reviews: "2.700",
    tags: ["Teatro", "Arquitetura", "Lago"],
    image: "/images/curitibaoperadearame.png",
    activities: ["arte", "cultura", "natureza"],
    description: "Estrutura tubular de aço com teto transparente construída sobre um lago numa antiga pedreira desativada. Integra música, cultura e natureza em um palco único.",
    duration: "1 a 2 horas",
    bestTime: "Tarde de sol",
    accessibility: "Passarela de acesso e elevador interno."
  },
  {
    id: 16,
    name: "Praia do Forte",
    location: "Mata de São João, BA",
    state: "Bahia",
    placeType: "praias",
    budgetCategory: "confortavel",
    price: "R$ 80 - R$ 150",
    rating: "4.8",
    reviews: "1.900",
    tags: ["Tartarugas Marinhas", "Piscinas Naturais", "Vila"],
    image: "/images/praiadoforte.png",
    activities: ["natureza", "relaxamento"],
    description: "Antiga vila de pescadores na Linha Verde. Famosa pelo centro de preservação de tartarugas marinhas do Projeto TAMAR, piscinas naturais de maré e castelo histórico.",
    duration: "Dia inteiro",
    bestTime: "Durante a maré baixa",
    accessibility: "Vila de pedestres plana e bem estruturada."
  },
  {
    id: 17,
    name: "Mercado Ver-o-Peso",
    location: "Belém, PA",
    state: "Pará",
    placeType: "restaurantes",
    budgetCategory: "economico",
    price: "R$ 20 - R$ 50",
    rating: "4.6",
    reviews: "1.800",
    tags: ["Açaí Autêntico", "Ervas Amazônicas", "Cultura do Norte"],
    image: "/images/mercadodoferrobelem.png",
    activities: ["gastronomia", "cultura"],
    description: "A maior feira livre da América Latina, situada às margens da baía do Guajará. Ponto ideal para provar açaí puro com peixe frito, tacacá e conhecer os banhos de cheiro amazônicos.",
    duration: "2 horas",
    bestTime: "Primeiras horas da manhã",
    accessibility: "Nível da rua, feira aberta movimentada."
  },
  {
    id: 18,
    name: "Beco do Batman",
    location: "São Paulo, SP",
    state: "São Paulo",
    placeType: "historicos",
    budgetCategory: "economico",
    price: "Gratuito",
    rating: "4.7",
    reviews: "3.200",
    tags: ["Arte Urbana", "Grafite", "Vila Madalena"],
    image: "/images/becobatman.png",
    activities: ["arte", "cultura"],
    description: "Uma famosa galeria de arte urbana a céu aberto no coração da Vila Madalena. A travessa estreita é 100% coberta por grafites coloridos de artistas renomados do mundo todo.",
    duration: "1 a 2 horas",
    bestTime: "Tarde com sol para fotos vibrantes",
    accessibility: "Rua de paralelepípedo sem tráfego de carros."
  },
  {
    id: 19,
    name: "Dunas do Jalapão",
    location: "Mateiros, TO",
    state: "Tocantins",
    placeType: "parques",
    budgetCategory: "premium",
    price: "R$ 300+",
    rating: "4.9",
    reviews: "1.500",
    tags: ["Fervedouros", "Expedição 4x4", "Natureza"],
    image: "/images/dunasdejalapao.png",
    activities: ["aventura", "natureza"],
    description: "Onde a água subterrânea nascente impede o corpo de afundar (fervedouros). Conta ainda com dunas de areia dourada e cachoeiras intocadas.",
    duration: "3 a 5 dias",
    bestTime: "Maio a Outubro",
    accessibility: "Requer veículos expedicionários 4x4."
  },
  {
    id: 20,
    name: "Teatro Amazonas",
    location: "Manaus, AM",
    state: "Amazonas",
    placeType: "historicos",
    budgetCategory: "economico",
    price: "R$ 20,00",
    rating: "4.9",
    reviews: "2.100",
    tags: ["Ciclo da Borracha", "Cúpula Colorida", "Ópera"],
    image: "/images/teatrosdaamazonia.png",
    activities: ["cultura", "arte"],
    description: "Inaugurado em 1896 no auge do Ciclo da Borracha. Destaca-se por sua cúpula feita com 36 mil peças de cerâmica nas cores da bandeira do Brasil e salão de espetáculos requintado.",
    duration: "1 a 2 horas",
    bestTime: "Compre ingresso antecipado para assistir a uma apresentação no fim do dia",
    accessibility: "Totalmente acessível com rampas e elevador."
  },
  {
    id: 21,
    name: "Bondinho Pão de Açúcar",
    location: "Rio de Janeiro, RJ",
    state: "Rio de Janeiro",
    placeType: "historicos",
    budgetCategory: "confortavel",
    price: "R$ 130 - R$ 160",
    rating: "4.9",
    reviews: "8.200",
    tags: ["Teleférico", "Vista Panorâmica", "Cartão-postal"],
    image: "/images/bondinhoacucar.png",
    activities: ["cultura", "natureza"],
    description: "Um dos passeios mais clássicos do Brasil. O teleférico liga a Praia Vermelha ao Morro da Urca e ao Pão de Açúcar, oferecendo uma vista deslumbrante da Baía de Guanabara.",
    duration: "2 a 3 horas",
    bestTime: "Fim de tarde para ver o pôr do sol",
    accessibility: "Totalmente acessível com elevadores e rampas em todas as estações."
  },
  {
    id: 22,
    name: "Pantanal Norte",
    location: "Poconé, MT",
    state: "Mato Grosso",
    placeType: "parques",
    budgetCategory: "premium",
    price: "R$ 300+",
    rating: "5.0",
    reviews: "1.800",
    tags: ["Onça-pintada", "Safári Fotográfico", "Vida Selvagem"],
    image: "/images/pantanalnorte.png",
    activities: ["natureza", "aventura"],
    description: "A maior planície alagável do mundo. Um paraíso para a observação da vida selvagem, incluindo jacarés, tuiuiús, capivaras e, com sorte, a majestosa onça-pintada.",
    duration: "3 a 5 dias",
    bestTime: "Julho a Outubro (estação seca, melhor para ver animais)",
    accessibility: "Passeios de barco adaptáveis, mas infraestrutura rústica em algumas pousadas."
  },
  {
    id: 23,
    name: "Porto de Galinhas",
    location: "Ipojuca, PE",
    state: "Pernambuco",
    placeType: "praias",
    budgetCategory: "confortavel",
    price: "R$ 100 - R$ 250",
    rating: "4.8",
    reviews: "6.500",
    tags: ["Piscinas Naturais", "Jangada", "Corais"],
    image: "/images/portodegalinhas.png",
    activities: ["relaxamento", "natureza"],
    description: "Famosa por suas águas mornas e cristalinas, e pelas piscinas naturais formadas entre recifes de corais, acessíveis através dos tradicionais passeios de jangada.",
    duration: "2 a 4 dias",
    bestTime: "Durante a maré baixa (consultar tábua de marés)",
    accessibility: "Acessibilidade limitada na areia e nas jangadas, calçadão acessível."
  },
  {
    id: 24,
    name: "Chapada dos Veadeiros",
    location: "Alto Paraíso de Goiás, GO",
    state: "Goiás",
    placeType: "parques",
    budgetCategory: "medio",
    price: "R$ 50 - R$ 150",
    rating: "4.9",
    reviews: "3.200",
    tags: ["Cachoeiras", "Cristais", "Misticismo"],
    image: "/images/chapadadosveadeiros.png",
    activities: ["natureza", "aventura", "relaxamento"],
    description: "Cenário de cerrado vibrante, repleto de cachoeiras deslumbrantes, cânions impressionantes e formações rochosas antiquíssimas, envolto em uma atmosfera mística.",
    duration: "4 a 6 dias",
    bestTime: "Maio a Julho (fim das chuvas, cachoeiras cheias)",
    accessibility: "Maioria das atrações exige trilhas em terreno irregular; poucas opções acessíveis."
  },
  {
    id: 25,
    name: "Maragogi",
    location: "Maragogi, AL",
    state: "Alagoas",
    placeType: "praias",
    budgetCategory: "confortavel",
    price: "R$ 100 - R$ 200",
    rating: "4.7",
    reviews: "5.100",
    tags: ["Galés", "Águas Cristalinas", "Mergulho"],
    image: "/images/maragogi.png",
    activities: ["relaxamento", "natureza"],
    description: "Conhecida como o Caribe Brasileiro devido às suas praias de mar calmo e água azul-turquesa. O principal atrativo são as Galés, enormes piscinas naturais em alto mar.",
    duration: "2 a 3 dias",
    bestTime: "Maré baixa nas luas cheia ou nova",
    accessibility: "Catamarãs maiores têm alguma estrutura, mas o acesso à água requer auxílio."
  },
  {
    id: 26,
    name: "Pinacoteca do Estado",
    location: "São Paulo, SP",
    state: "São Paulo",
    placeType: "museus",
    budgetCategory: "economico",
    price: "R$ 30,00 (Sábado grátis)",
    rating: "4.9",
    reviews: "3.800",
    tags: ["Arte Brasileira", "Arquitetura de Tijolos", "Parque da Luz"],
    image: "/images/pinacoteca.png",
    activities: ["arte", "cultura"],
    description: "O museu de arte mais antigo de São Paulo. O edifício com tijolos aparentes é uma obra de arte por si só e abriga um acervo focado na produção artística brasileira do século XIX até hoje.",
    duration: "2 a 3 horas",
    bestTime: "Sábados (entrada gratuita)",
    accessibility: "Totalmente acessível, com piso tátil, elevadores e maquetes táteis."
  },
  {
    id: 27,
    name: "Beto Carrero World",
    location: "Penha, SC",
    state: "Santa Catarina",
    placeType: "parques",
    budgetCategory: "premium",
    price: "R$ 150 - R$ 300",
    rating: "4.8",
    reviews: "12.000",
    tags: ["Parque de Diversões", "Família", "Montanha-russa"],
    image: "/images/betocarrero.png",
    activities: ["aventura", "lazer"],
    description: "O maior parque temático da América Latina. Oferece shows incríveis, zoológico e brinquedos radicais que garantem diversão para todas as idades.",
    duration: "1 a 2 dias",
    bestTime: "Dias úteis fora das férias escolares para evitar filas",
    accessibility: "Ampla estrutura de acessibilidade com prioridade em filas."
  },
  {
    id: 28,
    name: "Alter do Chão",
    location: "Santarém, PA",
    state: "Pará",
    placeType: "praias",
    budgetCategory: "confortavel",
    price: "R$ 150 - R$ 250",
    rating: "4.9",
    reviews: "2.500",
    tags: ["Rio Tapajós", "Ilha do Amor", "Amazônia"],
    image: "/images/alterdochao.png",
    activities: ["natureza", "relaxamento"],
    description: "Apelidada de 'Caribe Amazônico', esta vila balneária revela praias de areia branca banhadas pelas águas doces e mornas do Rio Tapajós.",
    duration: "3 a 4 dias",
    bestTime: "Agosto a Dezembro (época da vazante dos rios, quando as praias aparecem)",
    accessibility: "Acesso por pequenos barcos; areia dificulta locomoção."
  },
  {
    id: 29,
    name: "Museu Imperial",
    location: "Petrópolis, RJ",
    state: "Rio de Janeiro",
    placeType: "museus",
    budgetCategory: "economico",
    price: "R$ 10,00",
    rating: "4.8",
    reviews: "3.100",
    tags: ["Família Real", "História do Brasil", "Coroa de D. Pedro II"],
    image: "/images/museuimperial.png",
    activities: ["cultura", "história"],
    description: "Instalado no antigo palácio de verão do imperador D. Pedro II. O acervo possui peças raras, móveis, joias (como a coroa imperial) e documentos do Brasil Império.",
    duration: "2 horas",
    bestTime: "Tarde, aproveitando o clima de serra",
    accessibility: "Uso obrigatório de pantufas sobre os sapatos originais; possui elevadores."
  },
  {
    id: 30,
    name: "Fernando de Noronha",
    location: "Fernando de Noronha, PE",
    state: "Pernambuco",
    placeType: "praias",
    budgetCategory: "premium",
    price: "R$ 300+",
    rating: "5.0",
    reviews: "4.900",
    tags: ["Melhor Praia do Mundo", "Mergulho", "Preservação"],
    image: "/images/fernandodenoronhapraia.png",
    activities: ["natureza", "relaxamento", "aventura"],
    description: "Frequentemente eleita a melhor praia do mundo. Águas incrivelmente transparentes, ideais para mergulho livre com tartarugas, raias e peixes coloridos.",
    duration: "4 a 5 dias (no arquipélago)",
    bestTime: "Agosto a Outubro (mar piscina)",
    accessibility: "Acesso por trilhas e escadarias nas rochas."
  },
  {
    id: 31,
    name: "Jardim Botânico do Rio",
    location: "Rio de Janeiro, RJ",
    state: "Rio de Janeiro",
    placeType: "parques",
    budgetCategory: "economico",
    price: "R$ 29,00",
    rating: "4.9",
    reviews: "5.600",
    tags: ["Palmeiras Imperiais", "Vitória-régia", "Dom João VI"],
    image: "/images/jardimbotanico.png",
    activities: ["natureza", "relaxamento"],
    description: "Fundado em 1808 por D. João VI. Um santuário verde espetacular no meio do Rio de Janeiro, com o famoso corredor de Palmeiras Imperiais, orquidário e lago das vitórias-régias.",
    duration: "3 horas",
    bestTime: "Manhã para evitar o calor forte e ver macacos pregos",
    accessibility: "Terreno plano, alamedas pavimentadas e banheiros adaptados."
  },
  {
    id: 32,
    name: "Praia de Pipa",
    location: "Tibau do Sul, RN",
    state: "Rio Grande do Norte",
    placeType: "praias",
    budgetCategory: "medio",
    price: "R$ 80 - R$ 200",
    rating: "4.8",
    reviews: "4.700",
    tags: ["Falésias", "Golfinhos", "Vila Charmosa"],
    image: "/images/praiadepipa.png",
    activities: ["relaxamento", "gastronomia"],
    description: "Famosa pelas altas falésias avermelhadas e pela Praia do Madeiro, onde é super comum nadar ao lado de golfinhos livres. A vila à noite tem ótima gastronomia.",
    duration: "3 dias",
    bestTime: "Setembro a Março",
    accessibility: "Ruas de paralelepípedo na vila; descidas para as praias por escadarias."
  },
  {
    id: 33,
    name: "Cânion do Itaimbezinho",
    location: "Cambará do Sul, RS",
    state: "Rio Grande do Sul",
    placeType: "parques",
    budgetCategory: "medio",
    price: "R$ 90,00",
    rating: "4.9",
    reviews: "2.600",
    tags: ["Cânions", "Mata Araucária", "Trilhas"],
    image: "/images/canioncambaradosul.png",
    activities: ["natureza", "aventura"],
    description: "Paredões gigantescos de até 700 metros de profundidade cobertos por vegetação verde no Parque Nacional dos Aparados da Serra. Um dos cenários mais dramáticos do Sul.",
    duration: "Meio dia",
    bestTime: "Início da manhã (antes da cerração/neblina subir)",
    accessibility: "A Trilha do Vértice possui trechos pavimentados e mirantes acessíveis."
  },
  {
    id: 34,
    name: "Rua das Pedras",
    location: "Armação dos Búzios, RJ",
    state: "Rio de Janeiro",
    placeType: "historicos",
    budgetCategory: "confortavel",
    price: "R$ 150 - R$ 300",
    rating: "4.8",
    reviews: "5.400",
    tags: ["Brigitte Bardot", "Gastronomia", "Orla"],
    image: "/images/ruasdaspedras.png",
    activities: ["gastronomia", "relaxamento"],
    description: "Colocada no mapa mundial por Brigitte Bardot na década de 60, Búzios combina mais de 20 praias deslumbrantes com o charme noturno e boutiques da famosa Rua das Pedras.",
    duration: "2 a 3 dias",
    bestTime: "Primavera ou Outono (clima ameno e menos lotado)",
    accessibility: "A Rua das Pedras tem pavimentação histórica de pedras grandes."
  },
  {
    id: 35,
    name: "Memorial da América Latina",
    location: "São Paulo, SP",
    state: "São Paulo",
    placeType: "cultura",
    budgetCategory: "economico",
    price: "Gratuito",
    rating: "4.6",
    reviews: "3.100",
    tags: ["Niemeyer", "Integração", "Mão Espalmada"],
    image: "/images/memorialamericalatina.png",
    activities: ["arte", "cultura"],
    description: "Complexo arquitetônico projetado por Oscar Niemeyer. O destaque é a escultura da Mão, símbolo das lutas e da integração dos povos latino-americanos.",
    duration: "2 horas",
    bestTime: "Finais de semana (frequentemente abriga festivais de comida)",
    accessibility: "Amplo, aberto, com rampas bem distribuídas."
  },
  {
    id: 36,
    name: "Ilha do Mel",
    location: "Paranaguá, PR",
    state: "Paraná",
    placeType: "praias",
    budgetCategory: "medio",
    price: "R$ 80 - R$ 150",
    rating: "4.8",
    reviews: "2.900",
    tags: ["Sem Carros", "Farol das Conchas", "Fortaleza"],
    image: "/images/ilhadomel.png",
    activities: ["natureza", "relaxamento"],
    description: "Uma reserva ecológica encantadora onde veículos motorizados não entram. As ruas são trilhas de areia que levam ao Farol das Conchas e à Fortaleza de Nossa Senhora dos Prazeres.",
    duration: "2 a 3 dias",
    bestTime: "Verão ou início do outono",
    accessibility: "Baixa acessibilidade, locomoção totalmente feita por trilhas de areia e barcos."
  },
  {
    id: 37,
    name: "Praia dos Carneiros",
    location: "Tamandaré, PE",
    state: "Pernambuco",
    placeType: "praias",
    budgetCategory: "confortavel",
    price: "R$ 150 - R$ 250",
    rating: "4.9",
    reviews: "4.200",
    tags: ["Capela de São Benedito", "Coqueirais", "Águas Calmas"],
    image: "/images/praiadoscarneiros.png",
    activities: ["relaxamento", "natureza"],
    description: "Considerada uma das praias mais bonitas do Brasil. Suas águas calmas encontram um coqueiral denso onde repousa a pitoresca Capela de São Benedito do século XVIII.",
    duration: "1 dia (Bate e volta)",
    bestTime: "Maré baixa",
    accessibility: "Alguns restaurantes de apoio oferecem estrutura acessível."
  },
  {
    id: 38,
    name: "Chapada dos Guimarães",
    location: "Chapada dos Guimarães, MT",
    state: "Mato Grosso",
    placeType: "parques",
    budgetCategory: "medio",
    price: "R$ 50 - R$ 120",
    rating: "4.8",
    reviews: "2.700",
    tags: ["Véu de Noiva", "Paredões de Arenito", "Centro Geodésico"],
    image: "/images/chapadadosguimaraes.png",
    activities: ["natureza", "aventura"],
    description: "O portal de entrada para o Centro Geodésico da América do Sul. Impressiona pelos enormes paredões de arenito vermelho e pela Cachoeira Véu de Noiva.",
    duration: "2 a 3 dias",
    bestTime: "Fim da tarde no Mirante para ver o pôr do sol",
    accessibility: "O mirante do Véu de Noiva é de fácil acesso por trilha curta e plana."
  },
  {
    id: 39,
    name: "Monte Roraima",
    location: "Pacaraima, RR",
    state: "Roraima",
    placeType: "parques",
    budgetCategory: "premium",
    price: "R$ 300+",
    rating: "5.0",
    reviews: "800",
    tags: ["Trekking", "Tepui", "Mundo Perdido"],
    image: "/images/monteroraima.png",
    activities: ["aventura", "natureza"],
    description: "Um dos lugares mais antigos do planeta. Essa imponente montanha em formato de mesa (tepui) inspirou o livro 'O Mundo Perdido' e a animação 'Up - Altas Aventuras'.",
    duration: "7 a 10 dias",
    bestTime: "Outubro a Março (período menos chuvoso)",
    accessibility: "Destino extremo; exige excelente preparo físico."
  },
  {
    id: 40,
    name: "Ruínas de São Miguel das Missões",
    location: "São Miguel das Missões, RS",
    state: "Rio Grande do Sul",
    placeType: "historicos",
    budgetCategory: "economico",
    price: "R$ 14,00",
    rating: "4.8",
    reviews: "1.200",
    tags: ["Missões Jesuíticas", "Patrimônio UNESCO", "Espetáculo de Luzes"],
    image: "/images/ruinasdesaomiguel.png",
    activities: ["cultura", "arte"],
    description: "Impressionantes ruínas da antiga redução jesuítica guarani do século XVIII. À noite, ocorre o emocionante espetáculo Som e Luz, que conta a história da missão.",
    duration: "Meio dia",
    bestTime: "Fim de tarde e início da noite para assistir ao espetáculo",
    accessibility: "Terreno de grama e terra plano, acessível para cadeirantes."
  }
];

export default function Recommendations() {
  const [step, setStep] = useState(0);
  const [activities, setActivities] = useState(['cultura']);
  const [placeType, setPlaceType] = useState(['museus', 'historicos']);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('economico');
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const toggleArrayItem = (list, setList, item) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setHistory(prev => [place, ...prev.filter(item => item.id !== place.id)]);
    setStep(7);
  };

  const toggleFavorite = (place) => {
    if (favorites.some(f => f.id === place.id)) {
      setFavorites(favorites.filter(f => f.id !== place.id));
    } else {
      setFavorites([...favorites, place]);
    }
  };

  const runEngine = () => {
    let filtered = DESTINATIONS.filter(place => place.budgetCategory === budget);

    if (location.trim() !== '') {
      const searchStr = location.toLowerCase().trim();
      const locationMatch = filtered.filter(p => 
        p.location.toLowerCase().includes(searchStr) || 
        p.name.toLowerCase().includes(searchStr) ||
        p.state.toLowerCase().includes(searchStr)
      );
      if (locationMatch.length > 0) filtered = locationMatch;
    }

    const scored = filtered.map(place => {
      let score = 65;
      const actMatch = (place.activities || []).filter(act => activities.includes(act));
      score += actMatch.length * 15;
      if (placeType.includes(place.placeType)) score += 20;
      return { ...place, matchPercentage: Math.min(99, score) };
    });

    scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
    setRecommendations(scored);
  };

  useEffect(() => {
    if (step === 5) {
      runEngine();
      const timer = setTimeout(() => setStep(6), 1400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="app-container">
      <Header 
        step={step} 
        setStep={setStep} 
        favoritesCount={favorites.length} 
        historyCount={history.length} 
      />

      <main className="main-content fade-in">
        {step === 0 && <HeroSection onStart={() => setStep(1)} />}

        {step >= 1 && step <= 4 && (
          <div className="quiz-card">
            <div className="progress-section">
              <span className="progress-text">{step} de 4</span>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
              </div>
            </div>

            {step === 1 && (
              <div className="quiz-step animate-slide">
                <h2>O que você gosta de fazer?</h2>
                <p>Selecione as opções que mais combinam com seu estilo de viagem.</p>
                <div className="grid-3">
                  {[
                    { id: 'cultura', label: 'Cultura', icon: '🏛️' },
                    { id: 'natureza', label: 'Natureza', icon: '🌿' },
                    { id: 'gastronomia', label: 'Gastronomia', icon: '🍴' },
                    { id: 'arte', label: 'Arte', icon: '🎨' },
                    { id: 'aventura', label: 'Aventura', icon: '⛰️' },
                    { id: 'relaxamento', label: 'Relaxamento', icon: '🧘' }
                  ].map(opt => (
                    <div key={opt.id} className={`quiz-option ${activities.includes(opt.id) ? 'selected' : ''}`} onClick={() => toggleArrayItem(activities, setActivities, opt.id)}>
                      <span className="opt-icon">{opt.icon}</span>
                      <span className="opt-label">{opt.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="quiz-step animate-slide">
                <h2>Que tipo de lugar você quer conhecer?</h2>
                <p>Escolha uma ou mais categorias de destino.</p>
                <div className="grid-3">
                  {[
                    { id: 'museus', label: 'Museus', img: '/images/museuamanha.png' },
                    { id: 'historicos', label: 'Cidades Históricas', img: '/images/pelourinho.png' },
                    { id: 'parques', label: 'Parques e reservas', img: '/images/ibirapuera.png' },
                    { id: 'praias', label: 'Praias', img: '/images/copacabana.png' },
                    { id: 'restaurantes', label: 'Restaurantes', img: '/images/mercadomunicipal.png' },
                    { id: 'eventos', label: 'Eventos e festivais', img: '/images/curitibaoperadearame.png' }
                  ].map(cat => (
                    <div key={cat.id} className={`quiz-image-option ${placeType.includes(cat.id) ? 'selected' : ''}`} onClick={() => toggleArrayItem(placeType, setPlaceType, cat.id)}>
                      <img src={cat.img} alt={cat.label} />
                      <div className="overlay-text">{cat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="quiz-step animate-slide">
                <h2>Onde você quer explorar?</h2>
                <p>Escolha uma região, estado ou cidade para a sua viagem.</p>
                <div className="input-group">
                  <span className="input-icon">🔍</span>
                  <input type="text" placeholder="Ex: São Paulo, Rio de Janeiro, Bahia..." value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <button className="btn-gps" onClick={() => setLocation("Minha Localização")}>
                  📍 Usar minha localização
                </button>
                <div className="suggestions">
                  <p>Sugestões populares:</p>
                  <div className="tags">
                    {['São Paulo', 'Rio de Janeiro', 'Bahia', 'Pernambuco', 'Curitiba'].map(city => (
                      <button key={city} className="tag-btn" onClick={() => setLocation(city)}>{city}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="quiz-step animate-slide">
                <h2>Quanto você pretende gastar?</h2>
                <p>Escolha a faixa de preço que mais se encaixa no seu orçamento.</p>
                <div className="grid-2">
                  {[
                    { id: 'economico', name: 'Econômico', price: 'Até R$ 50', icon: '💰' },
                    { id: 'medio', name: 'Médio', price: 'R$ 50 - R$ 150', icon: '💵' },
                    { id: 'confortavel', name: 'Confortável', price: 'R$ 150 - R$ 300', icon: '💎' },
                    { id: 'premium', name: 'Premium', price: '+ R$ 300', icon: '🌟' }
                  ].map(b => (
                    <div key={b.id} className={`quiz-option ${budget === b.id ? 'selected' : ''}`} onClick={() => setBudget(b.id)}>
                      <span className="opt-icon">{b.icon}</span>
                      <span className="opt-label">{b.name}</span>
                      <span className="opt-desc">{b.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="quiz-footer">
              <button className="btn-back" onClick={() => setStep(step - 1)}>Voltar</button>
              <button className="btn-next" onClick={() => step < 4 ? setStep(step + 1) : setStep(5)}>
                {step < 4 ? 'Próximo →' : 'Ver resultados →'}
              </button>
            </div>
          </div>
        )}

        {step === 5 && <LoadingScreen />}

        {(step === 6 || step === 8 || step === 9) && (
          <div className="results-container animate-slide">
            <h2>
              {step === 6 ? 'Aqui estão os lugares ideais para você!' : 
               step === 8 ? `Seus Favoritos (${favorites.length})` : 
               `Seu Histórico (${history.length})`}
            </h2>
            
            <div className="grid-3 results-grid">
              {(step === 6 ? recommendations.slice(0, 6) : step === 8 ? favorites : history).map(place => (
                <DestinationCard 
                  key={place.id} 
                  place={place} 
                  onSelect={handleSelectPlace} 
                  showMatch={step === 6} 
                />
              ))}
            </div>
            
            {step === 6 && (
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button className="btn-back" onClick={() => setStep(1)}>🔄 Refazer Teste</button>
              </div>
            )}
          </div>
        )}

        {step === 7 && selectedPlace && (
          <DestinationDetail 
            place={selectedPlace} 
            onBack={() => setStep(6)} 
            onToggleFavorite={toggleFavorite} 
            isFavorite={favorites.some(f => f.id === selectedPlace.id)} 
          />
        )}
      </main>
    </div>
  );
}