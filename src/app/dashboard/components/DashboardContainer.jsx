// src/app/dashboard/components/DashboardContainer.jsx
import Card from "@/components/ui/Card";
import { Home } from "lucide-react";

/**
 * Container principal do dashboard
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Conteúdo do container
 */
export default function DashboardContainer({ children }) {
    return (
        <Card variant="light" className="backdrop-blur-md p-8 rounded-xl border border-blue-900/40 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-left">
                <div className="bg-blue-900/30 p-3 rounded-lg transition-scale hover-scale">
                    <Home size={24} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                    Sistema de Gerenciamento de Água
                </h2>
            </div>

            {children}
        </Card>
    );
}