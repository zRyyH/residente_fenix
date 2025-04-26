// src/app/dashboard/components/ConsumptionTypeSelector.jsx
import { Droplets, Flame } from "lucide-react";
import Card from "@/components/ui/Card";

/**
 * Componente para selecionar o tipo de consumo a ser exibido
 * 
 * @param {Object} props
 * @param {string} props.tipoAtivo - Tipo de consumo atualmente selecionado
 * @param {Function} props.onChangeTipo - Função para alterar o tipo de consumo
 * @param {Object} props.dadosDisponiveis - Objeto com booleanos indicando quais tipos têm dados disponíveis
 */
export default function ConsumptionTypeSelector({ tipoAtivo, onChangeTipo, dadosDisponiveis }) {
    const tipos = [
        { id: 'agua', label: 'Água', icon: Droplets, color: 'text-blue-400', bgColor: 'bg-blue-900/30' },
        { id: 'gas', label: 'Gás', icon: Flame, color: 'text-red-500', bgColor: 'bg-red-900/30' },
    ];

    return (
        <Card variant="glow" className="mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-4">Selecione o tipo de consumo</h3>
            <div className="flex flex-wrap gap-3">
                {tipos.map((tipo, index) => {
                    const Icon = tipo.icon;
                    const estaAtivo = tipoAtivo === tipo.id;
                    const temDados = dadosDisponiveis[tipo.id];

                    // Se não tiver dados, desabilita o botão e aplica estilo de desabilitado
                    return (
                        <button
                            key={tipo.id}
                            onClick={() => temDados && onChangeTipo(tipo.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${estaAtivo
                                    ? 'bg-gradient-to-r from-blue-600/80 to-indigo-700/80 shadow-lg text-white'
                                    : temDados
                                        ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300'
                                        : 'bg-gray-800/30 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!temDados}
                        >
                            <div className={`p-2 rounded-full ${estaAtivo ? 'bg-blue-700/50' : tipo.bgColor}`}>
                                <Icon size={18} className={estaAtivo ? 'text-white' : tipo.color} />
                            </div>
                            <span>{tipo.label}</span>
                            {!temDados && (
                                <span className="text-xs ml-1 text-gray-500">(sem dados)</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </Card>
    );
}