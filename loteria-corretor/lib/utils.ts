/**
 * Formata um valor numérico para moeda brasileira
 */
export function formatCurrency(value: number): string {
  if (!value || value === 0) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Formata uma data para o padrão brasileiro
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Formata data e hora para o padrão brasileiro
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Calcula quanto tempo falta para uma data específica
 */
export function tempoRestante(dataFutura: Date | string): string {
  const agora = new Date();
  const futuro = typeof dataFutura === 'string' ? new Date(dataFutura) : dataFutura;
  const diff = futuro.getTime() - agora.getTime();

  if (diff < 0) return 'Já ocorreu';

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (dias > 0) return `${dias}d ${horas}h`;
  if (horas > 0) return `${horas}h ${minutos}m`;
  return `${minutos}m`;
}

/**
 * Valida se uma string é um número válido de loteria
 */
export function validarDezena(dezena: string, min: number, max: number): boolean {
  const num = parseInt(dezena, 10);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Ordena as dezenas em ordem crescente
 */
export function ordenarDezenas(dezenas: string[]): string[] {
  return [...dezenas].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

/**
 * Gera um ID único
 */
export function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
