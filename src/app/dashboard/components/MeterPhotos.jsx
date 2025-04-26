// src/app/dashboard/components/MeterPhotos.jsx
import Card from "@/components/ui/Card";
import BlobImage from "@/components/ui/BlobImage";
import { Droplets, FileImage } from "lucide-react";
import { formatarData, criarUrlDownload } from "@/lib/utils";

/**
 * Componente para exibir fotos das leituras do hidrômetro
 * 
 * @param {Object} props
 * @param {Object} props.dadoRecente - Dados mais recentes do consumo
 * @param {string} props.titulo - Título personalizado do componente
 * @param {string} props.tipoConsumo - Tipo de consumo (agua, gas)
 */
export default function MeterPhotos({ dadoRecente, titulo = "Comprovantes de Leitura", tipoConsumo = "gas" }) {
    // Verifica se estamos lidando com água
    const isAgua = tipoConsumo === "agua";

    return (
        <Card variant="glow" gradientFrom="from-blue-900/30" gradientTo="to-blue-800/20">
            <h3 className="text-xl font-semibold text-white mb-4">{titulo}</h3>

            {isAgua ? (
                // Layout para água (com fotos de água fria e quente)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Leitura Atual - Água Fria */}
                    <Card variant="light" className="p-4">
                        <h4 className="text-lg font-medium text-white mb-3">Leitura Atual - Água Fria</h4>

                        <div className="mb-3">
                            <BlobImage
                                fotoId={dadoRecente.foto_atual_id_fria}
                                alt="Foto da leitura atual - Água Fria"
                            />

                            {dadoRecente.foto_atual_id_fria && (
                                <a
                                    href={criarUrlDownload(dadoRecente.foto_atual_id_fria)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                    download={`leitura-atual-fria.jpg`}
                                >
                                    <FileImage size={16} className="mr-1" />
                                    <span>Visualizar em tamanho original</span>
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-400">Leitura:</p>
                                <p className="text-white font-medium">{dadoRecente.leitura_atual_fria || "-"} m³</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Data:</p>
                                <p className="text-white font-medium">{formatarData(dadoRecente.data_da_leitura)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Referência:</p>
                                <p className="text-white font-medium">{formatarData(dadoRecente.mes_de_referencia)}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Leitura Atual - Água Quente */}
                    <Card variant="light" className="p-4">
                        <h4 className="text-lg font-medium text-white mb-3">Leitura Atual - Água Quente</h4>

                        <div className="mb-3">
                            <BlobImage
                                fotoId={dadoRecente.foto_atual_id_quente}
                                alt="Foto da leitura atual - Água Quente"
                            />

                            {dadoRecente.foto_atual_id_quente && (
                                <a
                                    href={criarUrlDownload(dadoRecente.foto_atual_id_quente)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                    download={`leitura-atual-quente.jpg`}
                                >
                                    <FileImage size={16} className="mr-1" />
                                    <span>Visualizar em tamanho original</span>
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-400">Leitura:</p>
                                <p className="text-white font-medium">{dadoRecente.leitura_atual_quente || "-"} m³</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Data:</p>
                                <p className="text-white font-medium">{formatarData(dadoRecente.data_da_leitura)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Referência:</p>
                                <p className="text-white font-medium">{formatarData(dadoRecente.mes_de_referencia)}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Leitura Anterior - Água Fria */}
                    {dadoRecente.leitura_anterior_fria !== null || dadoRecente.foto_anterior_id_fria ? (
                        <Card variant="light" className="p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Leitura Anterior - Água Fria</h4>

                            <div className="mb-3">
                                <BlobImage
                                    fotoId={dadoRecente.foto_anterior_id_fria}
                                    alt="Foto da leitura anterior - Água Fria"
                                />

                                {dadoRecente.foto_anterior_id_fria && (
                                    <a
                                        href={criarUrlDownload(dadoRecente.foto_anterior_id_fria)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                        download={`leitura-anterior-fria.jpg`}
                                    >
                                        <FileImage size={16} className="mr-1" />
                                        <span>Visualizar em tamanho original</span>
                                    </a>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Leitura:</p>
                                    <p className="text-white font-medium">{dadoRecente.leitura_anterior_fria || "-"} m³</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Data:</p>
                                    <p className="text-white font-medium">{formatarData(dadoRecente.data_leitura_anterior)}</p>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card variant="light" className="p-6 flex flex-col items-center justify-center">
                            <Droplets size={32} className="text-blue-400 mb-3" />
                            <h4 className="text-lg font-medium text-white mb-2">Sem leitura anterior - Água Fria</h4>
                            <p className="text-center text-gray-400">
                                Esta é a primeira leitura registrada para a sua unidade.
                            </p>
                        </Card>
                    )}

                    {/* Leitura Anterior - Água Quente */}
                    {dadoRecente.leitura_anterior_quente !== null || dadoRecente.foto_anterior_id_quente ? (
                        <Card variant="light" className="p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Leitura Anterior - Água Quente</h4>

                            <div className="mb-3">
                                <BlobImage
                                    fotoId={dadoRecente.foto_anterior_id_quente}
                                    alt="Foto da leitura anterior - Água Quente"
                                />

                                {dadoRecente.foto_anterior_id_quente && (
                                    <a
                                        href={criarUrlDownload(dadoRecente.foto_anterior_id_quente)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                        download={`leitura-anterior-quente.jpg`}
                                    >
                                        <FileImage size={16} className="mr-1" />
                                        <span>Visualizar em tamanho original</span>
                                    </a>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Leitura:</p>
                                    <p className="text-white font-medium">{dadoRecente.leitura_anterior_quente || "-"} m³</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Data:</p>
                                    <p className="text-white font-medium">{formatarData(dadoRecente.data_leitura_anterior)}</p>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card variant="light" className="p-6 flex flex-col items-center justify-center">
                            <Droplets size={32} className="text-blue-400 mb-3" />
                            <h4 className="text-lg font-medium text-white mb-2">Sem leitura anterior - Água Quente</h4>
                            <p className="text-center text-gray-400">
                                Esta é a primeira leitura registrada para a sua unidade.
                            </p>
                        </Card>
                    )}
                </div>
            ) : (
                // Layout para gás
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Leitura Atual */}
                    <Card variant="light" className="p-4">
                        <h4 className="text-lg font-medium text-white mb-3">Leitura Atual</h4>

                        <div className="mb-3">
                            <BlobImage
                                fotoId={dadoRecente.foto_atual_id}
                                alt="Foto da leitura atual"
                            />

                            {dadoRecente.foto_atual_id && (
                                <a
                                    href={criarUrlDownload(dadoRecente.foto_atual_id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                    download={`leitura-atual-gas.jpg`}
                                >
                                    <FileImage size={16} className="mr-1" />
                                    <span>Visualizar em tamanho original</span>
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-400">Leitura:</p>
                                <p className="text-white font-medium">{dadoRecente.leitura_atual || "-"} m³</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Data:</p>
                                <p className="text-white font-medium">{formatarData(dadoRecente.data_da_leitura)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Referência:</p>
                                <p className="text-white font-medium">{formatarData(dadoRecente.mes_de_referencia)}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Leitura Anterior */}
                    {dadoRecente.leitura_anterior !== null || dadoRecente.foto_anterior_id ? (
                        <Card variant="light" className="p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Leitura Anterior</h4>

                            <div className="mb-3">
                                <BlobImage
                                    fotoId={dadoRecente.foto_anterior_id}
                                    alt="Foto da leitura anterior"
                                />

                                {dadoRecente.foto_anterior_id && (
                                    <a
                                        href={criarUrlDownload(dadoRecente.foto_anterior_id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2"
                                        download={`leitura-anterior-gas.jpg`}
                                    >
                                        <FileImage size={16} className="mr-1" />
                                        <span>Visualizar em tamanho original</span>
                                    </a>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Leitura:</p>
                                    <p className="text-white font-medium">{dadoRecente.leitura_anterior || "-"} m³</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Data:</p>
                                    <p className="text-white font-medium">{formatarData(dadoRecente.data_leitura_anterior)}</p>
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
            )}
        </Card>
    );
}