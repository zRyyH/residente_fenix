// src/app/dashboard/components/ApiStatusAlert.jsx
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Alerta de status da API
 * 
 * @param {Object} props
 * @param {Object} props.apiStatus - Status atual da API { tipo: 'sucesso'|'aviso', mensagem: string }
 * @param {Function} props.onRefresh - Função para atualizar os dados
 */
export default function ApiStatusAlert({ apiStatus, onRefresh }) {
    if (!apiStatus) return null;

    const isSucesso = apiStatus.tipo === 'sucesso';

    return (
        <div className={`glass-card-light p-4 rounded-lg border flex items-center gap-3 ${isSucesso
                ? 'border-green-500/40 bg-green-950/20'
                : 'border-yellow-500/40 bg-yellow-950/20'
            }`}>
            {isSucesso ? (
                <div className="bg-green-900/40 p-2 rounded-full">
                    <RefreshCw size={18} className="text-green-400" />
                </div>
            ) : (
                <div className="bg-yellow-900/40 p-2 rounded-full">
                    <AlertTriangle size={18} className="text-yellow-400" />
                </div>
            )}

            <p className={`text-sm ${isSucesso ? 'text-green-300' : 'text-yellow-300'
                }`}>
                {apiStatus.mensagem}
            </p>

            <button
                onClick={onRefresh}
                className="ml-auto text-sm bg-blue-900/40 hover:bg-blue-800/50 px-3 py-1 rounded text-blue-300"
            >
                Atualizar
            </button>
        </div>
    );
}