// src/lib/consumo.js
import apiClient from "./axios";

/**
 * Busca os dados de consumo das unidades do residente da nova API Python
 * @returns {Promise} Promise com os dados de consumo
 */
export const obterDadosConsumo = async () => {
    try {
        // Obtém o token de autenticação para usar na requisição
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Token de autenticação não encontrado");
        }

        try {
            // Tenta fazer a requisição para a nova API Python
            const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_API_URL}/consumos-unidades`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                // Processa todos os tipos de consumo (água fria, água quente e gás)
                let dadosProcessados = {
                    agua_fria: processarDadosConsumo(data.agua_fria || []),
                    agua_quente: processarDadosConsumo(data.agua_quente || []),
                    gas: processarDadosConsumo(data.gas || [])
                };

                // Salva os dados no localStorage para acesso offline
                localStorage.setItem("dadosConsumo", JSON.stringify(dadosProcessados));
                return dadosProcessados;
            }

            // Se a API Python falhar, recorre à API Directus original como fallback
            console.warn("API Python retornou erro, tentando API Directus...");
            throw new Error("Fallback para API Directus");

        } catch (err) {
            // Se a nova API falhar, tenta a API original como fallback
            console.warn("Usando API Directus como fallback:", err.message);

            // Fazendo a requisição para a API Directus original
            const response = await apiClient.get("/items/consumos_unidades?fields=*.*");

            if (response.data && response.data.data) {
                // Converte o formato antigo para o novo formato
                const dadosConvertidos = {
                    agua_fria: response.data.data,
                    agua_quente: [],
                    gas: []
                };

                // Salva os dados no localStorage para acesso offline
                localStorage.setItem("dadosConsumo", JSON.stringify(dadosConvertidos));
                return dadosConvertidos;
            }

            return { agua_fria: [], agua_quente: [], gas: [] };
        }
    } catch (error) {
        console.error("Erro ao obter dados de consumo:", error);

        // Se tiver dados no localStorage, use-os como último recurso
        const dadosLocais = getDadosConsumoLocal();
        if (dadosLocais && (dadosLocais.agua_fria.length > 0 || dadosLocais.agua_quente.length > 0 || dadosLocais.gas.length > 0)) {
            console.info("Usando dados em cache do localStorage");
            return dadosLocais;
        }

        throw error;
    }
};

/**
 * Processa os dados de consumo brutos para o formato esperado pela UI
 * @param {Array} dadosBrutos - Dados brutos de consumo de um tipo específico
 * @returns {Array} Dados processados no formato da UI
 */
function processarDadosConsumo(dadosBrutos) {
    if (!Array.isArray(dadosBrutos)) return [];

    // Transformar os dados no formato esperado pela UI
    const dadosProcessados = dadosBrutos.map(item => ({
        id: item.usuario_id + '-' + item.mes_de_referencia, // Criar ID único
        valor_individual: item.valor_individual,
        valor_total: item.valor_total,
        consumo: item.consumo,
        // Criar a estrutura esperada para compatibilidade com a UI existente
        leitura_unidade_id: {
            leitura: item.leitura_atual,
            data_da_leitura: item.data_da_leitura,
            mes_de_referencia: item.mes_de_referencia,
            foto_id: item.foto_atual_id
        },
        // Adicionar informações da leitura anterior
        leitura_anterior: {
            leitura: item.leitura_anterior,
            data_da_leitura: item.data_leitura_anterior,
            foto_id: item.foto_anterior_id
        },
        // Informações adicionais
        valor_medicao: item.valor_medicao,
        valor_residual: item.valor_residual,
        data_da_proxima_leitura: item.data_da_proxima_leitura
    }));

    // Ordenar dados por data de leitura (mais recente primeiro)
    dadosProcessados.sort((a, b) => {
        const dataA = new Date(a.leitura_unidade_id?.data_da_leitura || 0);
        const dataB = new Date(b.leitura_unidade_id?.data_da_leitura || 0);
        return dataB - dataA;
    });

    return dadosProcessados;
}

/**
 * Recupera os dados de consumo do localStorage
 * @returns {Object} Objeto com arrays de dados de consumo por tipo ou objeto vazio
 */
export const getDadosConsumoLocal = () => {
    if (typeof window !== "undefined") {
        const dadosConsumo = localStorage.getItem("dadosConsumo");

        if (dadosConsumo) {
            try {
                const dados = JSON.parse(dadosConsumo);

                // Verifica se está no formato novo (com tipos separados)
                if (dados && typeof dados === 'object' && ('agua_fria' in dados || 'agua_quente' in dados || 'gas' in dados)) {
                    return dados;
                }

                // Se estiver no formato antigo (apenas array), converte para o novo formato
                if (Array.isArray(dados)) {
                    return {
                        agua_fria: dados,
                        agua_quente: [],
                        gas: []
                    };
                }

                return { agua_fria: [], agua_quente: [], gas: [] };
            } catch (error) {
                console.error("Erro ao processar dados de consumo:", error);
                return { agua_fria: [], agua_quente: [], gas: [] };
            }
        }
    }

    return { agua_fria: [], agua_quente: [], gas: [] };
};

/**
 * Cria dados de demonstração para testes
 * @returns {Object} Objeto com arrays de dados de demonstração por tipo
 */
export const criarDadosDemonstracao = () => {
    // Dados de exemplo para água fria
    const dadosAguaFria = [{
        id: 'demo-agua-fria-1',
        valor_individual: 220.0,
        valor_total: 225.0,
        consumo: 15,
        valor_medicao: 5.0,
        valor_residual: 0.0,
        leitura_unidade_id: {
            leitura: 15,
            data_da_leitura: '2025-03-17',
            mes_de_referencia: '2025-02-17',
            foto_id: null
        },
        leitura_anterior: {
            leitura: null,
            data_da_leitura: null,
            foto_id: null
        },
        data_da_proxima_leitura: '2025-04-17'
    }];

    // Dados de exemplo para água quente
    const dadosAguaQuente = [{
        id: 'demo-agua-quente-1',
        valor_individual: 180.0,
        valor_total: 185.0,
        consumo: 12,
        valor_medicao: 5.0,
        valor_residual: 0.0,
        leitura_unidade_id: {
            leitura: 12,
            data_da_leitura: '2025-03-17',
            mes_de_referencia: '2025-02-17',
            foto_id: null
        },
        leitura_anterior: {
            leitura: null,
            data_da_leitura: null,
            foto_id: null
        },
        data_da_proxima_leitura: '2025-04-17'
    }];

    // Dados de exemplo para gás
    const dadosGas = [{
        id: 'demo-gas-1',
        valor_individual: 120.0,
        valor_total: 125.0,
        consumo: 10,
        valor_medicao: 5.0,
        valor_residual: 0.0,
        leitura_unidade_id: {
            leitura: 10,
            data_da_leitura: '2025-03-17',
            mes_de_referencia: '2025-02-17',
            foto_id: null
        },
        leitura_anterior: {
            leitura: null,
            data_da_leitura: null,
            foto_id: null
        },
        data_da_proxima_leitura: '2025-04-17'
    }];

    // Organiza todos os dados em um objeto
    const dadosDemo = {
        agua_fria: dadosAguaFria,
        agua_quente: dadosAguaQuente,
        gas: dadosGas
    };

    // Salva no localStorage
    localStorage.setItem("dadosConsumo", JSON.stringify(dadosDemo));
    return dadosDemo;
};