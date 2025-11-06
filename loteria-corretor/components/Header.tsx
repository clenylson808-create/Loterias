'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  onRefresh?: () => void;
  lastUpdate?: Date;
}

export default function Header({ onRefresh, lastUpdate }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-gradient-to-r from-loteria-primary to-loteria-secondary text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              🎰 Corretor de Loterias
            </h1>
            <p className="text-sm opacity-90 mt-2">
              Resultados atualizados das Loterias da Caixa Econômica Federal
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-xs opacity-75">Horário Atual</p>
              <p className="text-xl font-mono font-bold">
                {currentTime.toLocaleTimeString('pt-BR')}
              </p>
              <p className="text-xs opacity-75">
                {currentTime.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {onRefresh && (
              <button
                onClick={onRefresh}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
              >
                🔄 Atualizar Resultados
              </button>
            )}

            {lastUpdate && (
              <p className="text-xs opacity-75">
                Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Barra de informação */}
      <div className="bg-black bg-opacity-20 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            ⚡ Resultados atualizados automaticamente | 
            📊 Dados oficiais da Caixa Econômica Federal |
            ⏰ Atualização a cada 30 minutos
          </p>
        </div>
      </div>
    </header>
  );
}
