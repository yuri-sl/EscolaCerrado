"use client"
import { useState } from "react";
import Funcionario from "./Funcionario";

const NossaEquipe = () => {
    const funcionarios = Array(6).fill({ imagem: '/user.png', nome: 'Nome', cargo: 'Cargo' }); 
    const [startIndex, setStartIndex] = useState(0);
    const maxVisible = 5;

    const handleNext = () => {
        if (startIndex + maxVisible < funcionarios.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-6xl font-gentium font-bold mb-12 text-right mr-[200px]">Nossa equipe</h1>
            <div className="flex items-center justify-center">
                {funcionarios.length > maxVisible && (
                    <button 
                        onClick={handlePrev} 
                        className="bg-Verde text-white px-4 py-2 rounded disabled:opacity-50 mx-8" 
                        disabled={startIndex === 0}
                    >
                        &#9665;
                    </button>
                )}
                <div className="flex gap-[150px]">
                    {funcionarios.slice(startIndex, startIndex + maxVisible).map((funcionario, index) => (
                        <Funcionario key={index + startIndex} imagem={funcionario.imagem} nome={funcionario.nome} cargo={funcionario.cargo} />
                    ))}
                </div>
                {funcionarios.length > maxVisible && (
                    <button 
                        onClick={handleNext} 
                        className="bg-Verde text-white px-4 py-2 rounded disabled:opacity-50 mx-8" 
                        disabled={startIndex + maxVisible >= funcionarios.length}
                    >
                        &#9655;
                    </button>
                )}
            </div>
        </main>
    );
};

export default NossaEquipe;
