// src/app/dashboard/components/BackgroundEffect.jsx

/**
 * Componente para efeitos de fundo
 */
export default function BackgroundEffect() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/15 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/15 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-cyan-500/15 rounded-full filter blur-3xl"></div>
        </div>
    );
}