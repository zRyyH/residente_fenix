// src/app/dashboard/components/DetailedBillingInfo.jsx
import Card from "@/components/ui/Card";
import { formatarMoeda } from "@/lib/utils";

/**
 * Componente para exibir informações detalhadas da fatura
 * 
 * @param {Object} props
 * @param {number} props.valorMedicao - Valor da medição
 * @param {number} props.valorIndividual - Valor individual
 * @param {number} props.valorResidual - Valor residual
 * @param {number} props.valorTotal - Valor total
 * @param {string} props.titulo - Título personalizado do componente
 */
export default function DetailedBillingInfo({
    valorMedicao,
    valorIndividual,
    valorResidual,
    valorTotal,
    titulo = "Detalhes da Fatura Atual"
}) {
    return (
        <Card variant="glow">
            <h3 className="text-xl font-semibold text-white mb-4">{titulo}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="light" className="p-4">
                    <h4 className="text-lg font-medium text-white mb-2">Valor da Medição</h4>
                    <p className="text-2xl font-bold text-white">
                        {formatarMoeda(valorMedicao || 0)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Apenas consumo</p>
                </Card>

                <Card variant="light" className="p-4">
                    <h4 className="text-lg font-medium text-white mb-2">Valor Individual</h4>
                    <p className="text-2xl font-bold text-white">
                        {formatarMoeda(valorIndividual || 0)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Taxa por unidade</p>
                </Card>

                <Card variant="light" className="p-4">
                    <h4 className="text-lg font-medium text-white mb-2">Valor Residual</h4>
                    <p className="text-2xl font-bold text-white">
                        {formatarMoeda(valorResidual || 0)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Custos adicionais</p>
                </Card>
            </div>

            <Card variant="light" className="p-4 mt-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-white">Total da Fatura</h4>
                    <div className="text-2xl font-bold text-white">
                        {formatarMoeda(valorTotal || 0)}
                    </div>
                </div>
            </Card>
        </Card>
    );
}