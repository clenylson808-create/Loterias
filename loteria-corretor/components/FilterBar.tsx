'use client';

import { LOTERIAS_CONFIG } from '@/types/loteria';

interface FilterBarProps {
  selectedLoteria: string;
  onFilterChange: (tipo: string) => void;
}

export default function FilterBar({ selectedLoteria, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtrar por Loteria:</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('todas')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            selectedLoteria === 'todas'
              ? 'bg-loteria-primary text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎲 Todas
        </button>
        {LOTERIAS_CONFIG.map((config) => (
          <button
            key={config.tipo}
            onClick={() => onFilterChange(config.tipo)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              selectedLoteria === config.tipo
                ? 'text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{
              backgroundColor: selectedLoteria === config.tipo ? config.cor : undefined
            }}
          >
            {config.icone} {config.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
