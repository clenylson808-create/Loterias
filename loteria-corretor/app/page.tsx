'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import LoteriaCard from '@/components/LoteriaCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { LoteriaResultado } from '@/types/loteria';

export default function Home() {
  const [resultados, setResultados] = useState<LoteriaResultado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLoteria, setSelectedLoteria] = useState('todas');
  const [lastUpdate, setLastUpdate] = useState<Date | undefined>(undefined);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Função para buscar resultados
  const buscarResultados = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);

      const response = await fetch('/api/loterias?tipo=todas', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar resultados');
      }

      const data = await response.json();
      setResultados(data.resultados || []);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Erro ao buscar resultados:', err);
      setError('Erro ao carregar resultados. Tentando novamente...');
      
      // Tentar novamente após 5 segundos
      setTimeout(() => buscarResultados(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Carregar resultados ao montar o componente
  useEffect(() => {
    buscarResultados();
  }, []);

  // Auto-refresh a cada 30 minutos
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      console.log('Auto-refresh: buscando novos resultados...');
      buscarResultados(false);
    }, 30 * 60 * 1000); // 30 minutos

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filtrar resultados
  const resultadosFiltrados = selectedLoteria === 'todas'
    ? resultados
    : resultados.filter(r => r.tipo === selectedLoteria);

  // Handler para atualizar resultados manualmente
  const handleRefresh = () => {
    buscarResultados(true);
  };

  return (
    <div className="min-h-screen">
      <Header onRefresh={handleRefresh} lastUpdate={lastUpdate} />

      <main className="container mx-auto px-4 py-8">
        {/* Configurações */}
        <div className="mb-6 flex justify-end">
          <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 text-loteria-primary"
            />
            <span className="text-sm font-medium text-gray-700">
              🔄 Atualização Automática (30min)
            </span>
          </label>
        </div>

        {/* Filtro */}
        <FilterBar
          selectedLoteria={selectedLoteria}
          onFilterChange={setSelectedLoteria}
        />

        {/* Mensagem de Erro */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <p className="font-bold">Ops! Algo deu errado</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && resultados.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Resultados */}
        {!loading && resultadosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎰</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Nenhum resultado encontrado
            </h2>
            <p className="text-gray-500">
              {selectedLoteria === 'todas'
                ? 'Não foi possível carregar os resultados. Tente novamente em alguns instantes.'
                : 'Não há resultados para esta loteria no momento.'}
            </p>
            <button
              onClick={handleRefresh}
              className="mt-6 bg-loteria-primary hover:bg-loteria-secondary text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              🔄 Tentar Novamente
            </button>
          </div>
        )}

        {!loading && resultadosFiltrados.length > 0 && (
          <>
            {/* Contador de resultados */}
            <div className="mb-6 text-center">
              <p className="text-lg text-gray-600">
                Exibindo <span className="font-bold text-loteria-primary">{resultadosFiltrados.length}</span>{' '}
                {resultadosFiltrados.length === 1 ? 'resultado' : 'resultados'}
              </p>
            </div>

            {/* Grid de resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {resultadosFiltrados.map((resultado, index) => (
                <div
                  key={resultado.tipo}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <LoteriaCard resultado={resultado} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Informações adicionais */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">ℹ️ Informações Importantes</h3>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-start gap-2">
              <span className="text-xl">✅</span>
              <span>Os resultados são obtidos diretamente da API oficial da Caixa Econômica Federal.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🕐</span>
              <span>Os dados são atualizados automaticamente a cada 30 minutos.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🔄</span>
              <span>Você pode atualizar manualmente clicando no botão "Atualizar Resultados" no cabeçalho.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">⚡</span>
              <span>Os resultados podem estar disponíveis até uma hora antes da divulgação oficial no site da Caixa.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🎯</span>
              <span>Use os filtros acima para visualizar apenas a loteria de seu interesse.</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm pb-8">
          <p className="mb-2">
            © {new Date().getFullYear()} Corretor de Loterias | Desenvolvido com ❤️ para apostadores
          </p>
          <p className="text-xs">
            Os resultados apresentados são meramente informativos. 
            Sempre confira os resultados oficiais no site da{' '}
            <a
              href="https://loterias.caixa.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-loteria-primary hover:underline font-semibold"
            >
              Caixa Econômica Federal
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
