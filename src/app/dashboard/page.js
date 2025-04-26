"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/lib/auth";
import {
    obterDadosConsumo,
    getDadosConsumoLocal,
    criarDadosDemonstracao
} from "@/lib/consumo";
import ProtectedRoute from "@/components/ProtectedRoute";

// Componentes Base
import Header from "@/components/dashboard/Header";
import ErrorState from "@/components/dashboard/ErrorState";
import LoadingState from "@/components/dashboard/LoadingState";
import Footer from "@/components/dashboard/Footer";

// Componentes Dashboard
import ApiStatusAlert from "./components/ApiStatusAlert";
import CurrentReadingCard from "./components/CurrentReadingCard";
import BillingCard from "./components/BillingCard";
import ConsumptionCard from "./components/ConsumptionCard";
import NextReadingInfo from "./components/NextReadingInfo";
import DetailedBillingInfo from "./components/DetailedBillingInfo";
import MeterPhotos from "./components/MeterPhotos";
import HistoryTable from "./components/HistoryTable";
import EmptyDataState from "./components/EmptyDataState";
import DashboardContainer from "./components/DashboardContainer";
import BackgroundEffect from "./components/BackgroundEffect";
import ConsumptionTypeSelector from "./components/ConsumptionTypeSelector";

export default function Dashboard() {
    // Estados
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dadosConsumo, setDadosConsumo] = useState({ agua: [], gas: [] });
    const [apiStatus, setApiStatus] = useState(null);
    const [tipoConsumoAtivo, setTipoConsumoAtivo] = useState("agua");

    // Função para carregar dados
    const carregarDados = async () => {
        setIsLoading(true);
        setError(null);
        setApiStatus(null);

        try {
            // Carrega dados do usuário
            const userData = getCurrentUser();
            if (userData) {
                setUser(userData);
            }

            // Primeiro tenta carregar dados locais para exibição rápida
            const dadosLocais = getDadosConsumoLocal();
            if (dadosLocais && (dadosLocais.agua.length > 0 || dadosLocais.gas.length > 0)) {
                setDadosConsumo(dadosLocais);
            }

            try {
                // Em seguida, busca dados atualizados da API
                const dadosAtualizados = await obterDadosConsumo();
                if (dadosAtualizados && (
                    dadosAtualizados.agua.length > 0 ||
                    dadosAtualizados.gas.length > 0
                )) {
                    setDadosConsumo(dadosAtualizados);
                    setApiStatus({
                        tipo: 'sucesso',
                        mensagem: 'Dados atualizados com sucesso'
                    });
                } else if (
                    (!dadosLocais.agua || dadosLocais.agua.length === 0) &&
                    (!dadosLocais.gas || dadosLocais.gas.length === 0)
                ) {
                    // Se não tiver dados locais e a API não retornou nada, usa dados de demonstração
                    const dadosDemo = criarDadosDemonstracao();
                    setDadosConsumo(dadosDemo);
                    setApiStatus({
                        tipo: 'aviso',
                        mensagem: 'Usando dados de demonstração porque a API está indisponível'
                    });
                }
            } catch (apiError) {
                console.error("Erro na API:", apiError);

                if (
                    (!dadosLocais.agua || dadosLocais.agua.length === 0) &&
                    (!dadosLocais.gas || dadosLocais.gas.length === 0)
                ) {
                    // Se não tiver dados locais, usa dados de demonstração
                    const dadosDemo = criarDadosDemonstracao();
                    setDadosConsumo(dadosDemo);
                    setApiStatus({
                        tipo: 'aviso',
                        mensagem: 'Usando dados de demonstração porque a API está indisponível'
                    });
                } else {
                    // Se tiver dados locais, usa-os
                    setApiStatus({
                        tipo: 'aviso',
                        mensagem: 'Usando dados em cache. API indisponível.'
                    });
                }
            }
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            setError("Não foi possível carregar os dados de consumo. Por favor, tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    // Carrega dados ao montar o componente
    useEffect(() => {
        carregarDados();
    }, []);

    // Verifica qual tipo de consumo tem dados disponíveis
    const dadosDisponiveis = {
        agua: dadosConsumo.agua && dadosConsumo.agua.length > 0,
        gas: dadosConsumo.gas && dadosConsumo.gas.length > 0
    };

    // Se não houver dados para o tipo selecionado, mas houver para outro tipo, seleciona o primeiro tipo disponível
    useEffect(() => {
        if (!dadosDisponiveis[tipoConsumoAtivo]) {
            if (dadosDisponiveis.agua) {
                setTipoConsumoAtivo('agua');
            } else if (dadosDisponiveis.gas) {
                setTipoConsumoAtivo('gas');
            }
        }
    }, [dadosConsumo, tipoConsumoAtivo, dadosDisponiveis]);

    // Obtém os dados do item mais recente do tipo selecionado
    const dadosAtuais = dadosConsumo[tipoConsumoAtivo] || [];
    const dadoRecente = dadosAtuais[0] || {};

    // Função para alterar o tipo de consumo
    const alterarTipoConsumo = (tipo) => {
        setTipoConsumoAtivo(tipo);
    };

    // Labels personalizados por tipo de consumo
    const unidadesMedida = {
        agua: "m³",
        gas: "m³"
    };

    // Títulos personalizados por tipo de consumo
    const titulos = {
        agua: "Água",
        gas: "Gás"
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-blue-950 to-gray-950 relative overflow-hidden p-4 md:p-6">
                {/* Efeitos de fundo */}
                <BackgroundEffect />

                <div className="max-w-6xl mx-auto relative z-10">
                    <Header user={user} onLogout={logout} />

                    {isLoading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState message={error} onRetry={carregarDados} />
                    ) : (
                        <main className="grid grid-cols-1 gap-6 animate-fade-in">
                            {/* Alerta de status da API */}
                            <ApiStatusAlert
                                apiStatus={apiStatus}
                                onRefresh={carregarDados}
                            />

                            <DashboardContainer>
                                {/* Seletor de tipo de consumo */}
                                <ConsumptionTypeSelector
                                    tipoAtivo={tipoConsumoAtivo}
                                    onChangeTipo={alterarTipoConsumo}
                                    dadosDisponiveis={dadosDisponiveis}
                                />

                                {dadosAtuais.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            {/* Cards principais */}
                                            <CurrentReadingCard
                                                dadoRecente={dadoRecente}
                                                unidadeMedida={unidadesMedida[tipoConsumoAtivo]}
                                                titulo={`Leitura Atual - ${titulos[tipoConsumoAtivo]}`}
                                                tipoConsumo={tipoConsumoAtivo}
                                            />

                                            <BillingCard
                                                valorTotal={dadoRecente.valor_total}
                                                mesReferencia={dadoRecente.mes_de_referencia}
                                                titulo={`Fatura - ${titulos[tipoConsumoAtivo]}`}
                                            />

                                            <ConsumptionCard
                                                dadoRecente={dadoRecente}
                                                unidadeMedida={unidadesMedida[tipoConsumoAtivo]}
                                                titulo={`Consumo - ${titulos[tipoConsumoAtivo]}`}
                                                tipoConsumo={tipoConsumoAtivo}
                                            />
                                        </div>

                                        {/* Próxima leitura */}
                                        <NextReadingInfo
                                            dataProximaLeitura={dadoRecente.data_da_proxima_leitura}
                                        />

                                        {/* Detalhes da fatura */}
                                        <div className="mb-6">
                                            <DetailedBillingInfo
                                                valorMedicao={dadoRecente.valor_de_medicao}
                                                valorIndividual={dadoRecente.valor_individual}
                                                valorResidual={dadoRecente.valor_residual}
                                                valorTotal={dadoRecente.valor_total}
                                                titulo={`Detalhes da Fatura - ${titulos[tipoConsumoAtivo]}`}
                                            />
                                        </div>

                                        {/* Fotos do hidrômetro */}
                                        <div className="mb-6">
                                            <MeterPhotos
                                                dadoRecente={dadoRecente}
                                                titulo={`Comprovantes - ${titulos[tipoConsumoAtivo]}`}
                                                tipoConsumo={tipoConsumoAtivo}
                                            />
                                        </div>

                                        {/* Histórico de consumo */}
                                        <HistoryTable
                                            dadosConsumo={dadosAtuais}
                                            unidadeMedida={unidadesMedida[tipoConsumoAtivo]}
                                            titulo={`Histórico - ${titulos[tipoConsumoAtivo]}`}
                                            tipoConsumo={tipoConsumoAtivo}
                                        />
                                    </>
                                ) : (
                                    <EmptyDataState tipo={titulos[tipoConsumoAtivo]} />
                                )}
                            </DashboardContainer>
                        </main>
                    )}

                    <Footer />
                </div>
            </div>
        </ProtectedRoute>
    );
}