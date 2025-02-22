'use client';

import { useState } from 'react';

interface CaseProps {
    nomeCase?: string;
    descricaoCase?: string;
    fotoCase?: string;
}

const Case = ({ nomeCase = "Título do Case", descricaoCase = "Descrição do Case", fotoCase = "/fundoBranco.png" }: CaseProps) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="relative w-[527px] h-[348px] cursor-pointer" onClick={() => setFlipped(!flipped)}>
            {/* Frente do Card */}
            {!flipped ? (
                <div className="absolute w-full h-full bg-Amarelo flex flex-col justify-center items-center rounded-lg p-2 text-center">
                    <img className="w-[459px] h-[240px] rounded-lg" src={fotoCase} alt="Case" />
                    <h2 className="text-black text-[32px] mt-2">{nomeCase}</h2>
                </div>
            ) : (
                // Verso do Card
                <div className="absolute w-full h-full bg-Amarelo flex justify-center items-center rounded-lg p-2 text-center">
                    <p className="text-black italic text-[32px]">{descricaoCase}</p>
                </div>
            )}
        </div>
    );
};

export default Case;
