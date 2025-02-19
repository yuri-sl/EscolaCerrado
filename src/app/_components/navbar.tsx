import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-Amarelo w-full h-[137px] flex items-center px-8">
      <div className="h-[156px] w-[171px]">
        <img src="/logosbg.png" alt="Logo escola do cerrado" className="h-full w-full object-contain" />
      </div>
      <div className="flex-1 flex justify-center">
        <nav className="flex items-center space-x-12 text-Preto text-[32px] font-inter">
          <div>Sobre</div>
          <div>Cases</div>
          <div>Nossa equipe</div>
          <div>Entre em contato</div>
          <Link href="/login">
            <button className="bg-AmareloClaro text-Preto text-[32px] py-2 px-8 rounded-full">
                Fazer Login
            </button>
        </Link>
        </nav>
      </div>  
    </header>
  );
};

export default Navbar;
