'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const seções = ["cases", "equipe"];
  const [seçãoAtiva, setSeçãoAtiva] = useState("");

  useEffect(() => {
    const lidarComRolagem = () => {
      let seçãoAtual = "";
      seções.forEach((seção) => {
        const elemento = document.getElementById(seção);
        if (elemento) {
          const retângulo = elemento.getBoundingClientRect();
          if (retângulo.top <= window.innerHeight / 2 && retângulo.bottom >= window.innerHeight / 2) {
            seçãoAtual = seção;
          }
        }
      });
      setSeçãoAtiva(seçãoAtual);
    };

    window.addEventListener("scroll", lidarComRolagem);
    return () => window.removeEventListener("scroll", lidarComRolagem);
  }, []);

  const rolarParaSeção = (id: string) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      window.scrollTo({
        top: elemento.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="bg-Amarelo w-full h-[137px] fixed top-0 left-0 z-50 flex items-center px-8 shadow-md">
      <div className="h-[156px] w-[171px]">
        <img src="/logosbg.png" alt="Logo escola do cerrado" className="h-full w-full object-contain" />
      </div>
      <div className="flex-1 flex justify-center">
        <nav className="flex items-center space-x-12 text-Preto text-[32px] font-inter">
          <div className="hidden sm:block">Sobre</div>
          <button 
            onClick={() => rolarParaSeção("cases")}
            className={`cursor-pointer transition-all ${seçãoAtiva === "cases" ? "font-bold" : ""} text-[24px] sm:text-[32px]`}
          >
            Cases
          </button>
          <button 
            onClick={() => rolarParaSeção("equipe")}
            className={`cursor-pointer transition-all ${seçãoAtiva === "equipe" ? "font-bold" : ""} text-[24px] sm:text-[32px]`}
          >
            Nossa equipe
          </button>
          <Link href="/login">
            <button className="bg-AmareloClaro text-Preto text-[24px] sm:text-[32px] py-2 px-8 rounded-full">
                Fazer Login
            </button>
          </Link>
        </nav>
      </div>  
    </header>
  );
};

export default Navbar;
