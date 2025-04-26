// src/app/dashboard/components/CurrentReadingCard.jsx
import Card from "@/components/ui/Card";
import { TrendingUp } from "lucide-react";
import { formatarData } from "@/lib/utils";

/**
 * Cartão de leitura atual do hidrômetro
 * 
 * @param {Object} props
 * @param {Object} props.dadoRecente - Dados mais recentes do consumo
 * @param {string} props.unidadeMedida - Unidade de medida (m³, etc)
 * @param {string} props.titulo - Título personalizado do cartão
 * @param {string} props.tipoConsumo - Tipo de consumo (agua, gas)
 */
export default function CurrentReadingCard({ dadoRecente, unidadeMedida = "m³", titulo = "Leitura Atual", tipoConsumo = "gas" }) {
    const isAgua = tipoConsumo === "agua";

    return (
        <Card
            variant="glow"
            gradientFrom="from-blue-900/40"
            gradientTo="to-blue-800/30"
            className="animate-fade-in-up"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{titulo}</h3>
                <TrendingUp size={22} className="text-blue-400" />
            </div>

            {isAgua ? (
                // Exibição para água (mostra fria e quente)
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Água Fria:</span>
                        <p className="text-xl font-bold text-white animate-fade-in delay-100">
                            {dadoRecente.leitura_atual_fria !== null ? dadoRecente.leitura_atual_fria : "0"} {unidadeMedida}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Água Quente:</span>
                        <p className="text-xl font-bold text-white animate-fade-in delay-100">
                            {dadoRecente.leitura_atual_quente !== null ? dadoRecente.leitura_atual_quente : "0"} {unidadeMedida}
                        </p>
                    </div>
                </div>
            ) : (
                // Exibição para gás
                <p className="text-3xl font-bold text-white mb-2 animate-fade-in delay-100">
                    {dadoRecente.leitura_atual || "0"} {unidadeMedida}
                </p>
            )}

            <p className="text-sm text-gray-400 animate-fade-in delay-200">
                Data: {formatarData(dadoRecente.data_da_leitura)}
            </p>
        </Card>
    );
}