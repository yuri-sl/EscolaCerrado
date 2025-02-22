"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const sections = ["cases", "equipe"];
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
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
          <div>Sobre</div>
          <button 
            onClick={() => scrollToSection("cases")}
            className={`cursor-pointer transition-all ${activeSection === "cases" ? "font-bold" : ""}`}
          >
            Cases
          </button>
          <button 
            onClick={() => scrollToSection("equipe")}
            className={`cursor-pointer transition-all ${activeSection === "equipe" ? "font-bold" : ""}`}
          >
            Nossa equipe
          </button>
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
