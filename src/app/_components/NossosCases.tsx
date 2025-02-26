"use client";

import { api } from "~/utils/api"; 
import Case from "./Case";

const NossosCases = () => {

    const { data: cases, isLoading } = api.case.getAll.useQuery();

    if (isLoading) {
        return <p className="text-center">Carregando cases...</p>;
    }

    return (
        <div className="flex flex-col mt-20">
            <h1 className="text-6xl font-gentium font-bold mb-12 text-left ml-[200px]">Cases</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 w-[80%] mb-10 ml-[240px]">
                {cases?.map((caseData) => (
                    <Case 
                        key={caseData.id} 
                        nomeCase={caseData.titulo} 
                        descricaoCase={caseData.descricao} 
                        fotoCase={caseData.foto || "/fundoBranco.png"} 
                    />
                ))}
            </div>
        </div>
    );
};

export default NossosCases;
