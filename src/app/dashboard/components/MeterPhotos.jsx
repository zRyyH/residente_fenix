// src/app/dashboard/components/MeterPhotos.jsx
import Card from "@/components/ui/Card";
import BlobImage from "@/components/ui/BlobImage";
import { Droplets, FileImage } from "lucide-react";
import { formatarData, criarUrlDownload } from "@/lib/utils";

/**
 * Componente para exibir fotos das leituras do hidrômetro
 * 
 * @param {Object} props
 * @param {Object} props.leituraAtual - Dados da leitura atual
 * @param {Object} props.leituraAnterior - Dados da leitura anterior
 * @param {string} props.titulo - Título personalizado do componente
 */
export default function MeterPhotos({ leituraAtual, leituraAnterior, titulo = "Comprovantes de Leitura" }) {
    return (
        <Card variant="glow" gradientFrom="from-blue-900/30" gradientTo="to-blue-800/20">
            <h3 className="text-xl font-semibold text-white mb-4">{titulo}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Leitura Atual */}
                <Card variant="light" className="p-4">
                    <h4 className="text-lg font-medium text-white mb-3">Leitura Atual</h4>

                    <div className="mb-3">
                        <BlobImage
                            fotoId={leituraAtual?.foto_id}
                            alt="Foto da leitura atual"
                        />

                        {leituraAtual?.foto_id && (
                            <a
                                href={criarUrlDownload(leituraAtual.foto_id)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                download={`leitura-atual-${leituraAtual.leitura}.jpg`}
                            >
                                <FileImage size={16} className="mr-1" />
                                <span>Visualizar em tamanho original</span>
                            </a>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-gray-400">Leitura:</p>
                            <p className="text-white font-medium">{leituraAtual?.leitura || "-"} m³</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Data:</p>
                            <p className="text-white font-medium">{formatarData(leituraAtual?.data_da_leitura)}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Referência:</p>
                            <p className="text-white font-medium">{formatarData(leituraAtual?.mes_de_referencia)}</p>
                        </div>
                    </div>
                </Card>

                {/* Leitura Anterior */}
                {leituraAnterior?.leitura || leituraAnterior?.foto_id ? (
                    <Card variant="light" className="p-4">
                        <h4 className="text-lg font-medium text-white mb-3">Leitura Anterior</h4>

                        <div className="mb-3">
                            <BlobImage
                                fotoId={leituraAnterior?.foto_id}
                                alt="Foto da leitura anterior"
                            />

                            {leituraAnterior?.foto_id && (
                                <a
                                    href={criarUrlDownload(leituraAnterior.foto_id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                    download={`leitura-anterior-${leituraAnterior.leitura}.jpg`}
                                >
                                    <FileImage size={16} className="mr-1" />
                                    <span>Visualizar em tamanho original</span>
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-400">Leitura:</p>
                                <p className="text-white font-medium">{leituraAnterior?.leitura || "-"} m³</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Data:</p>
                                <p className="text-white font-medium">{formatarData(leituraAnterior?.data_da_leitura)}</p>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card variant="light" className="p-6 flex flex-col items-center justify-center">
                        <Droplets size={32} className="text-blue-400 mb-3" />
                        <h4 className="text-lg font-medium text-white mb-2">Sem leitura anterior</h4>
                        <p className="text-center text-gray-400">
                            Esta é a primeira leitura registrada para a sua unidade.
                        </p>
                    </Card>
                )}
            </div>
        </Card>
    );
}