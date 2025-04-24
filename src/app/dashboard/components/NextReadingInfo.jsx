// src/app/dashboard/components/NextReadingInfo.jsx
import Card from "@/components/ui/Card";
import { Clock } from "lucide-react";
import { formatarData } from "@/lib/utils";

/**
 * Componente para exibir informações da próxima leitura
 * 
 * @param {Object} props
 * @param {string} props.dataProximaLeitura - Data da próxima leitura
 */
export default function NextReadingInfo({ dataProximaLeitura }) {
    if (!dataProximaLeitura) return null;

    return (
        <Card
            variant="glow"
            gradientFrom="from-yellow-900/20"
            gradientTo="to-yellow-800/10"
            className="mb-6 animate-fade-in-up"
        >
            <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-900/30 rounded-full">
                    <Clock size={24} className="text-yellow-400" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white">Próxima Leitura Prevista</h3>
                    <p className="text-gray-300">
                        {formatarData(dataProximaLeitura)}
                    </p>
                </div>

                <div className="ml-auto">
                    <div className="text-xs text-yellow-300 bg-yellow-900/30 px-2 py-1 rounded-full border border-yellow-700/30">
                        Aguardando
                    </div>
                </div>
            </div>
        </Card>
    );
}