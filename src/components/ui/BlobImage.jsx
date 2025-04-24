// src/components/ui/BlobImage.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageIcon, RefreshCw } from "lucide-react";

/**
 * Componente para exibir imagem carregada diretamente via blob
 * @param {Object} props - Propriedades do componente
 * @param {string} props.fotoId - ID da foto no Directus
 * @param {string} props.alt - Texto alternativo para a imagem
 */
export default function BlobImage({ fotoId, alt }) {
    const [imagemUrl, setImagemUrl] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    // Função para carregar a imagem
    const carregarImagem = useCallback(async () => {
        if (!fotoId) {
            setCarregando(false);
            setErro(true);
            return;
        }

        try {
            setCarregando(true);
            setErro(false); // Resetar erro ao tentar novamente

            // Obter token de autenticação
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Token de autenticação não encontrado");
            }

            // URL base do sistema Directus
            const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://hidroapp.com.br";
            const imageUrl = `${baseUrl}/assets/${fotoId}`;

            // Buscar imagem com autenticação
            const response = await fetch(imageUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao carregar imagem: ${response.status}`);
            }

            // Converter para blob e criar URL de objeto
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);

            setImagemUrl(objectUrl);
            setCarregando(false);
        } catch (error) {
            console.error("Erro ao carregar imagem:", error);
            setErro(true);
            setCarregando(false);
        }
    }, [fotoId]);

    // Limpar URL do objeto ao desmontar componente
    useEffect(() => {
        // Limpar URL anterior se existir
        if (imagemUrl) {
            URL.revokeObjectURL(imagemUrl);
            setImagemUrl(null);
        }

        // Carregar a imagem
        carregarImagem();

        // Limpar ao desmontar
        return () => {
            if (imagemUrl) {
                URL.revokeObjectURL(imagemUrl);
            }
        };
    }, [fotoId, carregarImagem]);

    if (carregando) {
        return (
            <div className="h-48 bg-gray-900/50 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
                    <p className="text-gray-400 text-sm">Carregando imagem...</p>
                </div>
            </div>
        );
    }

    if (erro || !imagemUrl) {
        return (
            <div className="h-48 bg-gray-900/50 rounded-lg flex flex-col items-center justify-center">
                <ImageIcon size={32} className="text-gray-600 mb-2" />
                <p className="text-gray-400 text-sm text-center">Não foi possível carregar a imagem</p>
                <button
                    onClick={() => carregarImagem()}
                    className="mt-2 px-3 py-1 bg-blue-900/50 hover:bg-blue-800/50 text-xs text-blue-300 rounded-md transition-colors"
                >
                    <div className="flex items-center gap-1">
                        <RefreshCw size={14} />
                        <span>Tentar novamente</span>
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className="h-48 bg-gray-900 rounded-lg overflow-hidden">
            <img
                src={imagemUrl}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}