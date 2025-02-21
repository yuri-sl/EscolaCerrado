interface FuncionarioProps {
    imagem?: string;
    nome?: string;
    cargo?: string;
}

const Funcionario = ({ imagem = "/user.png", nome = "Nome", cargo = "Cargo" }: FuncionarioProps) => {
    return (
        <div className="flex flex-col items-center w-32">
            <img className="w-20 h-20 rounded-full bg-gray-300" src={imagem} alt={`Foto de ${nome}`} />
            <h2 className="text-orange-500 font-bold text-sm mt-2">{nome}</h2>
            <h3 className="text-gray-600 text-xs italic">{cargo}</h3>
        </div>
    );
};

export default Funcionario;
