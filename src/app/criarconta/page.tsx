"use client";
import CriarConta from "../_components/criarConta";

export default function CriarContaPage() {
  return (
    <main className="flex justify-center flex-1 mt-11 mr-20">
      <div className="flex items-center ">
        <img
          src="/logosbg.png"
          alt="Logo escola do cerrado"
          className="h-[764px] w-[818px] object-contain mr-20"
        />
        <CriarConta />
      </div> 
    </main>
  );
}
