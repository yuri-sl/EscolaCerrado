'use client';

import { useState } from 'react';
import Case from './Case';

interface CaseProps {
    nomeCase?: string;
    descricaoCase?: string;
    fotoCase?: string;
}

const NossosCases = () => {
    const [cases, setCases] = useState<CaseProps[]>([
        { nomeCase: "Case 1", descricaoCase: "Descrição do Case 1", fotoCase: "/fundoBranco.png" },
        { nomeCase: "Case 2", descricaoCase: "Descrição do Case 2", fotoCase: "/fundoBranco.png" },
        { nomeCase: "Case 3", descricaoCase: "Descrição do Case 3", fotoCase: "/fundoBranco.png" },
        { nomeCase: "Case 4", descricaoCase: "Descrição do Case 4", fotoCase: "/fundoBranco.png" },
        { nomeCase: "Case 5", descricaoCase: "Descrição do Case 5", fotoCase: "/fundoBranco.png" },
    ]);

    return (
        <div className="flex flex-col mt-20">
            <h1 className="text-6xl font-gentium font-bold mb-12 text-left ml-[200px]">Cases</h1>
            <div className="flex gap-[80px] flex-wrap justify-center mb-20">
                {cases.map((caseData, index) => (
                    <Case key={index} {...caseData} />
                ))}
            </div>
        </div>
    );
};

export default NossosCases;
