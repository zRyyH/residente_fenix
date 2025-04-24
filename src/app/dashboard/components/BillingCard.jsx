// src/app/dashboard/components/BillingCard.jsx
import Card from "@/components/ui/Card";
import { CreditCard } from "lucide-react";
import { formatarMoeda, formatarData } from "@/lib/utils";

/**
 * Cartão com informações de fatura
 * 
 * @param {Object} props
 * @param {number} props.valorTotal - Valor total da fatura
 * @param {string} props.mesReferencia - Mês de referência da fatura
 * @param {string} props.titulo - Título personalizado do cartão
 */
export default function BillingCard({ valorTotal, mesReferencia, titulo = "Valor da Fatura" }) {
    return (
        <Card
            variant="glow"
            gradientFrom="from-purple-900/40"
            gradientTo="to-purple-800/30"
            className="animate-fade-in-up delay-100"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{titulo}</h3>
                <CreditCard size={22} className="text-purple-400" />
            </div>

            <p className="text-3xl font-bold text-white mb-2 animate-fade-in delay-100">
                {formatarMoeda(valorTotal || 0)}
            </p>

            <p className="text-sm text-gray-400 animate-fade-in delay-200">
                Referente a: {formatarData(mesReferencia)}
            </p>
        </Card>
    );
}