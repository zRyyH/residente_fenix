// src/components/ui/Card.jsx
import React from "react";

/**
 * Componente de cartão base com efeito de vidro
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo do cartão
 * @param {string} props.className - Classes adicionais 
 * @param {string} props.variant - Variante do cartão ("default" | "light" | "glow")
 * @param {Object} props.gradientFrom - Objeto com cor inicial do gradiente (ex: {from-blue-900/40})
 * @param {Object} props.gradientTo - Objeto com cor final do gradiente (ex: {to-blue-800/30})
 * @param {boolean} props.animated - Aplicar animações ao card
 */
export default function Card({
    children,
    className = "",
    variant = "default",
    gradientFrom = "from-indigo-900/30",
    gradientTo = "to-indigo-800/20",
    animated = false,
    ...props
}) {
    const baseClass = "p-6 relative overflow-hidden rounded-xl";

    // Seleciona a classe de variante
    const variantClass = {
        default: "glass-card border border-blue-900/40",
        light: "glass-card-light border border-blue-900/40",
        glow: "glass-card-glow"
    }[variant] || "glass-card-light border border-blue-900/40";

    // Adiciona gradiente apenas para a variante glow
    const gradientClass = variant === "glow"
        ? `absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} -z-10`
        : "";

    // Classe de animação baseada na propriedade animated
    const animationClass = animated ? "transition-scale hover-scale" : "";

    return (
        <div className={`${baseClass} ${variantClass} ${animationClass} ${className}`} {...props}>
            {variant === "glow" && <div className={gradientClass}></div>}
            {children}
        </div>
    );
}