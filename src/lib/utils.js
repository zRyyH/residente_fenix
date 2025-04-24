// src/lib/utils.js
// Funções utilitárias para formatação e cálculos

/**
 * Formata valor para moeda brasileira
 * @param {number} valor - Valor a ser formatado
 * @returns {string} Valor formatado como moeda
 */
export const formatarMoeda = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

/**
 * Formata data para exibição no formato brasileiro
 * @param {string} dataString - Data em formato ISO ou string
 * @returns {string} Data formatada DD/MM/YYYY
 */
export const formatarData = (dataString) => {
    if (!dataString) return "N/A";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
};

/**
 * Calcula diferença de consumo entre duas leituras
 * @param {number|string} leituraAtual - Valor da leitura atual
 * @param {number|string} leituraAnterior - Valor da leitura anterior
 * @returns {number} Diferença de consumo
 */
export const calcularConsumo = (leituraAtual, leituraAnterior) => {
    if (!leituraAtual || !leituraAnterior) return 0;

    const atual = parseFloat(leituraAtual);
    const anterior = parseFloat(leituraAnterior);

    return atual > anterior ? (atual - anterior) : 0;
};

/**
 * Cria URL para download direto de uma imagem com autenticação
 * @param {string} fotoId - ID da foto no Directus
 * @returns {string|null} URL completa para download ou null
 */
export const criarUrlDownload = (fotoId) => {
    if (!fotoId) return null;

    const token = localStorage.getItem("authToken");
    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://hidroapp.com.br";
    return `${baseUrl}/assets/${fotoId}?access_token=${encodeURIComponent(token)}`;
};