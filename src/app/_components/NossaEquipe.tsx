import Funcionario from "./Funcionario";

const NossaEquipe = () => {
    const funcionarios = [
        { nome: "Ana", cargo: "Designer", imagem: "/ana.png" },
        { nome: "Carlos", cargo: "Desenvolvedor", imagem: "/carlos.png" },
        { nome: "Mariana", cargo: "Gerente", imagem: "/mariana.png" },
        { nome: "José", cargo: "Analista", imagem: "/jose.png" },
        { nome: "Beatriz", cargo: "Marketing", imagem: "/beatriz.png" },
        { nome: "Rafael", cargo: "DevOps", imagem: "/rafael.png" }, // 6º funcionário (gera scroll)
    ];

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Nossa Equipe</h1>
            <div className="overflow-x-auto">
                <div className="flex gap-6">
                    {funcionarios.map((funcionario, index) => (
                        <Funcionario key={index} {...funcionario} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default NossaEquipe;
