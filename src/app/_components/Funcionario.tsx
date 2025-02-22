interface FuncionarioProps {
    imagem?: string;
    nome?: string;
    cargo?: string;
}

const Funcionario = ({ 
    imagem = "/user.png", 
    nome = "Nome", 
    cargo = "Cargo" 
}: FuncionarioProps) => {
    return (
        <div className="flex flex-col font-inter items-center w-48">
            <img className="w-[210px] h-[210px] rounded-full" src={imagem} />
            <h2 className="text-Laranja font-bold mt-2 text-[32px]">{nome}</h2>
            <h3 className="text-Preto italic text-[24px]">{cargo}</h3>
        </div>
    );
};

export default Funcionario;