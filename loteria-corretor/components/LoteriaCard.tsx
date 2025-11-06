'use client';

import { LoteriaResultado } from '@/types/loteria';
import { formatCurrency } from '@/lib/utils';

interface LoteriaCardProps {
  resultado: LoteriaResultado;
}

export default function LoteriaCard({ resultado }: LoteriaCardProps) {
  const getCorFundo = (tipo: string) => {
    const cores: Record<string, string> = {
      megasena: 'bg-mega-sena',
      lotofacil: 'bg-lotofacil',
      quina: 'bg-quina',
      lotomania: 'bg-lotomania',
      timemania: 'bg-timemania',
      duplasena: 'bg-dupla-sena',
      federal: 'bg-federal',
      diadesorte: 'bg-dia-sorte',
      supersete: 'bg-super-sete',
      maismilionaria: 'bg-mais-milionaria'
    };
    return cores[tipo] || 'bg-loteria-primary';
  };

  const renderDezenas = () => {
    // Para Dupla Sena, dividir em dois sorteios
    if (resultado.tipo === 'duplasena') {
      const metade = Math.floor(resultado.dezenas.length / 2);
      const primeiro = resultado.dezenas.slice(0, metade);
      const segundo = resultado.dezenas.slice(metade);

      return (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-600">1º Sorteio</p>
            <div className="flex flex-wrap gap-2">
              {primeiro.map((dezena, idx) => (
                <div
                  key={`1-${idx}`}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-lg text-gray-800 animate-pulse-slow"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {dezena}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-600">2º Sorteio</p>
            <div className="flex flex-wrap gap-2">
              {segundo.map((dezena, idx) => (
                <div
                  key={`2-${idx}`}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-lg text-gray-800 animate-pulse-slow"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {dezena}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Dezenas normais
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {resultado.dezenas.map((dezena, idx) => (
          <div
            key={idx}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-lg text-gray-800 transform hover:scale-110 transition-transform animate-pulse-slow"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {dezena}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${getCorFundo(resultado.tipo)} rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300`}>
      {/* Cabeçalho */}
      <div className="bg-black bg-opacity-20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">{resultado.tipo === 'megasena' ? '🍀' :
                                          resultado.tipo === 'lotofacil' ? '⭐' :
                                          resultado.tipo === 'quina' ? '🎯' :
                                          resultado.tipo === 'lotomania' ? '🎲' :
                                          resultado.tipo === 'timemania' ? '⚽' :
                                          resultado.tipo === 'duplasena' ? '🎰' :
                                          resultado.tipo === 'federal' ? '🏛️' :
                                          resultado.tipo === 'diadesorte' ? '🌟' :
                                          resultado.tipo === 'supersete' ? '7️⃣' :
                                          resultado.tipo === 'maismilionaria' ? '💰' : '🎲'}</span>
              {resultado.nome}
            </h2>
            <p className="text-white text-sm opacity-90">
              Concurso {resultado.concurso} • {resultado.data}
            </p>
          </div>
          {resultado.acumulado && (
            <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm animate-pulse">
              ACUMULOU! 🔥
            </div>
          )}
        </div>
      </div>

      {/* Corpo */}
      <div className="bg-white bg-opacity-95 px-6 py-6 space-y-6">
        {/* Dezenas Sorteadas */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Números Sorteados
          </h3>
          {renderDezenas()}
        </div>

        {/* Trevos (+Milionária) */}
        {resultado.trevos && resultado.trevos.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-600 mb-2 text-center">Trevos da Sorte 🍀</h4>
            <div className="flex gap-2 justify-center">
              {resultado.trevos.map((trevo, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center font-bold"
                >
                  {trevo}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time do Coração (Timemania) */}
        {resultado.timeCoracao && (
          <div className="text-center">
            <p className="text-sm text-gray-600">Time do Coração ⚽</p>
            <p className="text-lg font-bold text-gray-800">{resultado.timeCoracao}</p>
          </div>
        )}

        {/* Mês de Sorte (Dia de Sorte) */}
        {resultado.mesSorte && (
          <div className="text-center">
            <p className="text-sm text-gray-600">Mês da Sorte 📅</p>
            <p className="text-lg font-bold text-gray-800">{resultado.mesSorte}</p>
          </div>
        )}

        {/* Premiação */}
        {resultado.premiacoes && resultado.premiacoes.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-3">Premiação</h4>
            <div className="space-y-2">
              {resultado.premiacoes.slice(0, 3).map((premiacao, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">{premiacao.descricao}</p>
                    <p className="text-xs text-gray-500">
                      {premiacao.ganhadores} {premiacao.ganhadores === 1 ? 'ganhador' : 'ganhadores'}
                    </p>
                  </div>
                  <p className="font-bold text-green-600">
                    {formatCurrency(premiacao.valorPremio)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximo Concurso */}
        {resultado.valorEstimadoProximoConcurso && resultado.valorEstimadoProximoConcurso > 0 && (
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-3 rounded-lg border-2 border-yellow-400">
            <p className="text-sm text-gray-600 text-center">Estimativa do Próximo Concurso</p>
            <p className="text-2xl font-bold text-green-700 text-center">
              {formatCurrency(resultado.valorEstimadoProximoConcurso)}
            </p>
            {resultado.dataProximoConcurso && (
              <p className="text-xs text-gray-500 text-center mt-1">
                Sorteio: {new Date(resultado.dataProximoConcurso).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
        )}

        {/* Data de Atualização */}
        <div className="text-center text-xs text-gray-400 pt-2 border-t">
          Atualizado em: {new Date(resultado.dataAtualizacao).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
}
