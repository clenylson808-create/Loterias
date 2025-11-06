export interface LoteriaResultado {
  nome: string;
  tipo: string;
  concurso: number;
  data: string;
  dataProximoConcurso?: string;
  dezenas: string[];
  trevos?: string[]; // Para +Milionária
  timeCoracao?: string; // Para Timemania
  mesSorte?: string; // Para Dia de Sorte
  premiacoes: Premiacao[];
  acumulado: boolean;
  valorAcumulado?: number;
  valorEstimadoProximoConcurso?: number;
  observacao?: string;
  localSorteio?: string;
  dataAtualizacao: string;
}

export interface Premiacao {
  faixa: number;
  descricao: string;
  ganhadores: number;
  valorPremio: number;
}

export interface LoteriaConfig {
  nome: string;
  tipo: string;
  cor: string;
  icone: string;
  url: string;
  quantidadeDezenas: number;
  range: [number, number];
}

export const LOTERIAS_CONFIG: LoteriaConfig[] = [
  {
    nome: 'Mega-Sena',
    tipo: 'megasena',
    cor: '#209869',
    icone: '🍀',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena',
    quantidadeDezenas: 6,
    range: [1, 60]
  },
  {
    nome: 'Lotofácil',
    tipo: 'lotofacil',
    cor: '#930089',
    icone: '⭐',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil',
    quantidadeDezenas: 15,
    range: [1, 25]
  },
  {
    nome: 'Quina',
    tipo: 'quina',
    cor: '#260085',
    icone: '🎯',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/quina',
    quantidadeDezenas: 5,
    range: [1, 80]
  },
  {
    nome: 'Lotomania',
    tipo: 'lotomania',
    cor: '#f78100',
    icone: '🎲',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotomania',
    quantidadeDezenas: 20,
    range: [0, 99]
  },
  {
    nome: 'Timemania',
    tipo: 'timemania',
    cor: '#00ff48',
    icone: '⚽',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/timemania',
    quantidadeDezenas: 7,
    range: [1, 80]
  },
  {
    nome: 'Dupla Sena',
    tipo: 'duplasena',
    cor: '#a61324',
    icone: '🎰',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/duplasena',
    quantidadeDezenas: 6,
    range: [1, 50]
  },
  {
    nome: 'Federal',
    tipo: 'federal',
    cor: '#103d8e',
    icone: '🏛️',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/federal',
    quantidadeDezenas: 5,
    range: [0, 99999]
  },
  {
    nome: 'Dia de Sorte',
    tipo: 'diadesorte',
    cor: '#cb852b',
    icone: '🌟',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/diadesorte',
    quantidadeDezenas: 7,
    range: [1, 31]
  },
  {
    nome: 'Super Sete',
    tipo: 'supersete',
    cor: '#a8cf45',
    icone: '7️⃣',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/supersete',
    quantidadeDezenas: 7,
    range: [0, 9]
  },
  {
    nome: '+Milionária',
    tipo: 'maismilionaria',
    cor: '#ee82ee',
    icone: '💰',
    url: 'https://servicebus2.caixa.gov.br/portaldeloterias/api/maismilionaria',
    quantidadeDezenas: 6,
    range: [1, 50]
  }
];
