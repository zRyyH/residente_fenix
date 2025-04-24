// src/app/dashboard/components/EmptyDataState.jsx
import Card from "@/components/ui/Card";
import { Droplets, Flame } from "lucide-react";

/**
 * Componente para exibir estado vazio (sem dados de consumo)
 * 
 * @param {Object} props
 * @param {string} props.tipo - Tipo de consumo (Água Fria, Água Quente, Gás)
 */
export default function EmptyDataState({ tipo = "Água Fria" }) {
    // Seleciona o ícone baseado no tipo
    let Icon = Droplets;
    let iconColor = "text-blue-400";

    if (tipo === "Água Quente") {
        Icon = Droplets;
        iconColor = "text-orange-400";
    } else if (tipo === "Gás") {
        Icon = Flame;
        iconColor = "text-red-500";
    }

    return (
        <Card variant="glow">
            <div className="flex items-center justify-center flex-col p-8">
                <Icon size={48} className={`${iconColor} mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-2">
                    Nenhum dado de consumo de {tipo} disponível
                </h3>
                <p className="text-gray-300 text-center">
                    Ainda não há registros de leitura para este tipo de consumo.
                    As informações aparecerão aqui após a primeira leitura.
                </p>
            </div>
        </Card>
    );
}