// src/app/dashboard/components/HistoryTable.jsx
import { useState } from "react";
import Card from "@/components/ui/Card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { formatarData, formatarMoeda } from "@/lib/utils";

/**
 * Tabela de histórico de consumo
 * 
 * @param {Object} props
 * @param {Array} props.dadosConsumo - Array com histórico de consumo
 * @param {string} props.unidadeMedida - Unidade de medida (m³, etc)
 * @param {string} props.titulo - Título personalizado do componente
 * @param {string} props.tipoConsumo - Tipo de consumo (agua, gas)
 */
export default function HistoryTable({ dadosConsumo, unidadeMedida = "m³", titulo = "Histórico de Consumo", tipoConsumo = "gas" }) {
    const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
    const isAgua = tipoConsumo === "agua";

    return (
        <Card variant="glow">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
            >
                <h3 className="text-xl font-semibold text-white">{titulo}</h3>
                <button className="p-2 rounded-full hover:bg-blue-900/30">
                    {mostrarDetalhes ?
                        <ChevronUp size={20} className="text-gray-300" /> :
                        <ChevronDown size={20} className="text-gray-300" />
                    }
                </button>
            </div>

            {mostrarDetalhes && (
                <div className="mt-4 overflow-x-auto">
                    {isAgua ? (
                        // Tabela para água
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-blue-900/30">
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Ref.</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Leitura Fria</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Leitura Quente</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Consumo Total</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor Medição</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor Individual</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosConsumo.map((consumo, index) => (
                                    <tr key={consumo.usuario_id + index} className="border-b border-blue-900/20 hover:bg-blue-900/20">
                                        <td className="py-3 px-4 text-white">
                                            {formatarData(consumo.mes_de_referencia || '')}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {consumo.leitura_atual_fria !== null
                                                ? `${consumo.leitura_atual_fria} ${unidadeMedida}`
                                                : "-"}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {consumo.leitura_atual_quente !== null
                                                ? `${consumo.leitura_atual_quente} ${unidadeMedida}`
                                                : "-"}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {consumo.consumo_total || 0} {unidadeMedida}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {formatarMoeda(consumo.valor_de_medicao || 0)}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {formatarMoeda(consumo.valor_individual || 0)}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {formatarMoeda(consumo.valor_total || 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        // Tabela para gás
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-blue-900/30">
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Ref.</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Leitura</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Consumo</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor Medição</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor Individual</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosConsumo.map((consumo, index) => (
                                    <tr key={consumo.usuario_id + index} className="border-b border-blue-900/20 hover:bg-blue-900/20">
                                        <td className="py-3 px-4 text-white">
                                            {formatarData(consumo.mes_de_referencia || '')}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {consumo.leitura_atual || 0} {unidadeMedida}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {consumo.consumo || 0} {unidadeMedida}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {formatarMoeda(consumo.valor_de_medicao || 0)}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {formatarMoeda(consumo.valor_individual || 0)}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {formatarMoeda(consumo.valor_total || 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </Card>
    );
}