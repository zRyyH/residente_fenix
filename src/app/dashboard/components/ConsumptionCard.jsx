// src/app/dashboard/components/ConsumptionCard.jsx
import Card from "@/components/ui/Card";
import { Calendar } from "lucide-react";

/**
 * Cartão de consumo do período
 * 
 * @param {Object} props
 * @param {number} props.consumo - Valor do consumo no período
 * @param {string} props.leituraAnterior - Valor da leitura anterior
 * @param {string} props.leituraAtual - Valor da leitura atual
 * @param {string} props.unidadeMedida - Unidade de medida (m³, etc)
 * @param {string} props.titulo - Título personalizado do cartão
 */
export default function ConsumptionCard({
    consumo,
    leituraAnterior,
    leituraAtual,
    unidadeMedida = "m³",
    titulo = "Consumo no Período"
}) {
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
                {consumo} {unidadeMedida}
            </p>

            <p className="text-sm text-gray-400 animate-fade-in delay-200">
                Variação: {leituraAnterior ?
                    `${leituraAnterior} → ${leituraAtual}` :
                    "Primeira leitura"}
            </p>
        </Card>
    );
}