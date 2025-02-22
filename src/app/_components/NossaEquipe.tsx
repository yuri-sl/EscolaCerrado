import Funcionario from "./Funcionario";

const NossaEquipe = () => {
    return (
        <main className="p-6">
            <h1 className="text-6xl font-gentium font-bold mb-12 text-right mr-[200px]">Nossa equipe</h1>
            <div className="overflow-x-auto flex justify-center">
                <div className="flex gap-[150px]">
                    {Array(5).fill(null).map((_, index) => (
                        <Funcionario key={index} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default NossaEquipe;