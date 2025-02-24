'use client'

import { useState, useEffect } from "react";
import Funcionario from "./Funcionario";

const NossaEquipe = () => {
    const funcionarios = Array(6).fill({ imagem: '/user.png', nome: 'Nome', cargo: 'Cargo' }); 
    const [indiceInicial, setIndiceInicial] = useState(0);
    const [ehMobile, setEhMobile] = useState(false); 
    const maxVisiveis = 5;
    const maxVisiveisMobile = 2;

    useEffect(() => {
        const verificarTamanhoTela = () => {
            setEhMobile(window.innerWidth < 924); 
        };
        
        verificarTamanhoTela(); 
        window.addEventListener('resize', verificarTamanhoTela); 

        return () => {
            window.removeEventListener('resize', verificarTamanhoTela); 
        };
    }, []);

    const irParaProximo = () => {
        const max = ehMobile ? maxVisiveisMobile : maxVisiveis;
        if (indiceInicial + max < funcionarios.length) {
            setIndiceInicial(indiceInicial + 1);
        }
    };

    const irParaAnterior = () => {
        const max = ehMobile ? maxVisiveisMobile : maxVisiveis;
        if (indiceInicial > 0) {
            setIndiceInicial(indiceInicial - 1);
        }
    };

    return (
        <main className="p-6 mb-20">
            <h1 className="text-6xl font-gentium font-bold mb-12 text-right mr-[200px]">Nossa equipe</h1>
            <div className="flex items-center justify-center">
                {funcionarios.length > (ehMobile ? maxVisiveisMobile : maxVisiveis) && (
                    <button 
                        onClick={irParaAnterior} 
                        className="bg-Verde text-white px-4 py-2 rounded disabled:opacity-50 mx-8" 
                        disabled={indiceInicial === 0}
                    >
                        &#9665;
                    </button>
                )}
                <div className={`flex gap-[150px] ${ehMobile ? 'gap-8' : ''}`}>
                    {funcionarios.slice(indiceInicial, indiceInicial + (ehMobile ? maxVisiveisMobile : maxVisiveis)).map((funcionario, index) => (
                        <Funcionario key={index + indiceInicial} imagem={funcionario.imagem} nome={funcionario.nome} cargo={funcionario.cargo} />
                    ))}
                </div>
                {funcionarios.length > (ehMobile ? maxVisiveisMobile : maxVisiveis) && (
                    <button 
                        onClick={irParaProximo} 
                        className="bg-Verde text-white px-4 py-2 rounded disabled:opacity-50 mx-8" 
                        disabled={indiceInicial + (ehMobile ? maxVisiveisMobile : maxVisiveis) >= funcionarios.length}
                    >
                        &#9655;
                    </button>
                )}
            </div>
        </main>
    );
};

export default NossaEquipe;
