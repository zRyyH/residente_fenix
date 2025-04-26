// src/app/dashboard/components/ConsumptionCard.jsx
import Card from "@/components/ui/Card";
import { Calendar } from "lucide-react";

/**
 * Cartão de consumo do período
 * 
 * @param {Object} props
 * @param {Object} props.dadoRecente - Dados mais recentes do consumo
 * @param {string} props.unidadeMedida - Unidade de medida (m³, etc)
 * @param {string} props.titulo - Título personalizado do cartão
 * @param {string} props.tipoConsumo - Tipo de consumo (agua, gas)
 */
export default function ConsumptionCard({
    dadoRecente,
    unidadeMedida = "m³",
    titulo = "Consumo no Período",
    tipoConsumo = "gas"
}) {
    // Verifica se estamos lidando com água
    const isAgua = tipoConsumo === "agua";

    return (
        <Card
            variant="glow"
            gradientFrom="from-emerald-900/40"
            gradientTo="to-emerald-800/30"
            className="animate-fade-in-up delay-200"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{titulo}</h3>
                <Calendar size={22} className="text-emerald-400" />
            </div>

            <p className="text-3xl font-bold text-white mb-2 animate-fade-in delay-100">
                {isAgua ? dadoRecente.consumo_total || 0 : dadoRecente.consumo || 0} {unidadeMedida}
            </p>

            <p className="text-sm text-gray-400 animate-fade-in delay-200">
                Variação: {isAgua ?
                    `${dadoRecente.leitura_anterior_fria !== null ? dadoRecente.leitura_anterior_fria : '-'} → ${dadoRecente.leitura_atual_fria || 0} (Fria)` :
                    `${dadoRecente.leitura_anterior !== null ? dadoRecente.leitura_anterior : '-'} → ${dadoRecente.leitura_atual || 0}`}
            </p>
        </Card>
    );
}