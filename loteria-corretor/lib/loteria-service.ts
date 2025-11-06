import axios from 'axios';
import { LoteriaResultado, LOTERIAS_CONFIG, Premiacao } from '@/types/loteria';

// Cache para armazenar resultados temporariamente
const cache = new Map<string, { data: LoteriaResultado, timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

export class LoteriaService {
  
  /**
   * Busca o resultado de uma loteria específica
   */
  static async buscarResultado(tipo: string): Promise<LoteriaResultado | null> {
    try {
      // Verificar cache
      const cached = cache.get(tipo);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }

      const config = LOTERIAS_CONFIG.find(c => c.tipo === tipo);
      if (!config) {
        console.error(`Configuração não encontrada para: ${tipo}`);
        return null;
      }

      const response = await axios.get(config.url, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const data = response.data;
      
      const resultado: LoteriaResultado = {
        nome: config.nome,
        tipo: config.tipo,
        concurso: data.numero || data.numeroConcurso || 0,
        data: this.formatarData(data.dataApuracao || data.dataSorteio),
        dataProximoConcurso: data.dataProximoConcurso,
        dezenas: this.extrairDezenas(data, config.tipo),
        trevos: data.listaTrevos || data.trevos,
        timeCoracao: data.nomeTimeCoracao,
        mesSorte: data.nomeMesSorte || data.mesSorte,
        premiacoes: this.extrairPremiacoes(data),
        acumulado: this.verificarAcumulado(data),
        valorAcumulado: data.valorAcumuladoConcursoEspecial || data.valorAcumulado || 0,
        valorEstimadoProximoConcurso: data.valorEstimadoProximoConcurso || 0,
        observacao: data.observacao,
        localSorteio: data.localSorteio || data.nomeMunicipioUFSorteio,
        dataAtualizacao: new Date().toISOString()
      };

      // Salvar no cache
      cache.set(tipo, { data: resultado, timestamp: Date.now() });

      return resultado;
    } catch (error) {
      console.error(`Erro ao buscar resultado de ${tipo}:`, error);
      return null;
    }
  }

  /**
   * Busca todos os resultados de todas as loterias
   */
  static async buscarTodosResultados(): Promise<LoteriaResultado[]> {
    const promises = LOTERIAS_CONFIG.map(config => 
      this.buscarResultado(config.tipo)
    );

    const resultados = await Promise.all(promises);
    return resultados.filter(r => r !== null) as LoteriaResultado[];
  }

  /**
   * Extrai as dezenas sorteadas baseado no tipo de loteria
   */
  private static extrairDezenas(data: any, tipo: string): string[] {
    // Tentar diferentes campos onde as dezenas podem estar
    let dezenas = data.listaDezenas || 
                  data.dezenasSorteadasOrdemSorteio ||
                  data.dezenas ||
                  [];

    // Para Dupla Sena (tem dois sorteios)
    if (tipo === 'duplasena') {
      const primeiroSorteio = data.listaDezenas || [];
      const segundoSorteio = data.listaDezenasSegundoSorteio || [];
      return [...primeiroSorteio, ...segundoSorteio];
    }

    // Para Federal (números de bilhetes)
    if (tipo === 'federal') {
      const listaPremios = data.listaPremios || [];
      return listaPremios.map((p: any) => p.numero || p.numeral).slice(0, 5);
    }

    // Para Super Sete (colunas)
    if (tipo === 'supersete') {
      dezenas = data.listaDezenas || data.colunas || [];
    }

    // Garantir que são strings com 2 dígitos
    return dezenas.map((d: any) => {
      const num = typeof d === 'string' ? d : String(d);
      return num.padStart(2, '0');
    });
  }

  /**
   * Extrai as premiações
   */
  private static extrairPremiacoes(data: any): Premiacao[] {
    const listaRateioPremio = data.listaRateioPremio || 
                               data.premiacoes || 
                               data.listaPremios || 
                               [];

    return listaRateioPremio.map((p: any, index: number) => ({
      faixa: p.faixa || index + 1,
      descricao: p.descricaoFaixa || p.nome || `${index + 1}ª Faixa`,
      ganhadores: p.numeroDeGanhadores || p.ganhadores || 0,
      valorPremio: p.valorPremio || p.valor || 0
    }));
  }

  /**
   * Verifica se o concurso está acumulado
   */
  private static verificarAcumulado(data: any): boolean {
    // Verificar se há algum campo indicando acúmulo
    if (data.acumulado !== undefined) return data.acumulado;
    
    // Verificar se a primeira faixa não teve ganhadores
    const listaRateio = data.listaRateioPremio || data.premiacoes || [];
    if (listaRateio.length > 0) {
      return listaRateio[0].numeroDeGanhadores === 0 || 
             listaRateio[0].ganhadores === 0;
    }

    return false;
  }

  /**
   * Formata a data para o padrão brasileiro
   */
  private static formatarData(dataStr: string): string {
    if (!dataStr) return '';
    
    try {
      const data = new Date(dataStr);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dataStr;
    }
  }

  /**
   * Limpa o cache (útil para forçar atualização)
   */
  static limparCache(): void {
    cache.clear();
  }

  /**
   * Obtém informações de uma loteria específica
   */
  static obterConfiguracao(tipo: string) {
    return LOTERIAS_CONFIG.find(c => c.tipo === tipo);
  }

  /**
   * Lista todas as loterias disponíveis
   */
  static listarLoterias() {
    return LOTERIAS_CONFIG;
  }
}
