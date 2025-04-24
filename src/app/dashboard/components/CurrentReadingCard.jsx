// src/app/dashboard/components/CurrentReadingCard.jsx
import Card from "@/components/ui/Card";
import { TrendingUp } from "lucide-react";
import { formatarData } from "@/lib/utils";

/**
 * Cartão de leitura atual do hidrômetro
 * 
 * @param {Object} props
 * @param {Object} props.leituraAtual - Dados da leitura atual
 * @param {string} props.unidadeMedida - Unidade de medida (m³, etc)
 * @param {string} props.titulo - Título personalizado do cartão
 */
export default function CurrentReadingCard({ leituraAtual, unidadeMedida = "m³", titulo = "Leitura Atual" }) {
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

            <p className="text-3xl font-bold text-white mb-2 animate-fade-in delay-100">
                {leituraAtual?.leitura || "0"} {unidadeMedida}
            </p>

            <p className="text-sm text-gray-400 animate-fade-in delay-200">
                Data: {formatarData(leituraAtual?.data_da_leitura)}
            </p>
        </Card>
    );
}