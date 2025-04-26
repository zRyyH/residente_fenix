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

                // Apenas organiza os dados mantendo a estrutura original da API
                let dadosProcessados = {
                    agua: data.agua || [],
                    gas: data.gas || []
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
                    agua: response.data.data,
                    gas: []
                };

                // Salva os dados no localStorage para acesso offline
                localStorage.setItem("dadosConsumo", JSON.stringify(dadosConvertidos));
                return dadosConvertidos;
            }

            return { agua: [], gas: [] };
        }
    } catch (error) {
        console.error("Erro ao obter dados de consumo:", error);

        // Se tiver dados no localStorage, use-os como último recurso
        const dadosLocais = getDadosConsumoLocal();
        if (dadosLocais && (dadosLocais.agua.length > 0 || dadosLocais.gas.length > 0)) {
            console.info("Usando dados em cache do localStorage");
            return dadosLocais;
        }

        throw error;
    }
};

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

                // Verifica se está no formato novo (com tipos "agua" e "gas")
                if (dados && typeof dados === 'object') {
                    // Se tiver formato antigo com agua_fria, agua_quente e gas, converte para o novo
                    if ('agua_fria' in dados || 'agua_quente' in dados) {
                        return {
                            agua: [...(dados.agua_fria || []), ...(dados.agua_quente || [])],
                            gas: dados.gas || []
                        };
                    }

                    // Se já estiver no formato "agua" e "gas", retorna diretamente
                    if ('agua' in dados || 'gas' in dados) {
                        return {
                            agua: dados.agua || [],
                            gas: dados.gas || []
                        };
                    }
                }

                // Se estiver no formato antigo (apenas array), converte para o novo formato
                if (Array.isArray(dados)) {
                    return {
                        agua: dados,
                        gas: []
                    };
                }

                return { agua: [], gas: [] };
            } catch (error) {
                console.error("Erro ao processar dados de consumo:", error);
                return { agua: [], gas: [] };
            }
        }
    }

    return { agua: [], gas: [] };
};

/**
 * Cria dados de demonstração para testes
 * @returns {Object} Objeto com arrays de dados de demonstração por tipo
 */
export const criarDadosDemonstracao = () => {
    // Dados de exemplo para água no novo formato
    const dadosAgua = [{
        "usuario_id": "5f33de30-8c44-4d04-b1f3-ad4dc383fb31",
        "mes_de_referencia": "2025-02-17",
        "data_da_leitura": "2025-04-23",
        "data_leitura_anterior": "2025-02-17",
        "data_da_proxima_leitura": "2025-05-21",
        "leitura_atual_fria": 3,
        "leitura_anterior_fria": 3,
        "leitura_atual_quente": 3,
        "leitura_anterior_quente": 4,
        "foto_atual_id_fria": null,
        "foto_anterior_id_fria": null,
        "foto_atual_id_quente": null,
        "foto_anterior_id_quente": null,
        "consumo_total": 1,
        "valor_de_medicao": 5.0,
        "valor_individual": 15.0,
        "valor_residual": 117.5,
        "valor_total": 137.5
    }];

    // Dados de exemplo para gás
    const dadosGas = [{
        "usuario_id": "5f33de30-8c44-4d04-b1f3-ad4dc383fb31",
        "mes_de_referencia": "2025-02-17",
        "data_da_leitura": "2025-04-08",
        "data_leitura_anterior": "2025-04-11",
        "data_da_proxima_leitura": "2025-04-16",
        "leitura_atual": 5,
        "leitura_anterior": 2,
        "foto_atual_id": null,
        "foto_anterior_id": null,
        "consumo": 3,
        "valor_de_medicao": 5.0,
        "valor_individual": 96.6,
        "valor_residual": 0,
        "valor_total": 101.6
    }];

    // Organiza todos os dados em um objeto
    const dadosDemo = {
        agua: dadosAgua,
        gas: dadosGas
    };

    // Salva no localStorage
    localStorage.setItem("dadosConsumo", JSON.stringify(dadosDemo));
    return dadosDemo;
};