"use client";
import CriarConta from "../_components/criarConta";

export default function CriarContaPage() {
  return (
    <main className="flex justify-center flex-1">
      <div className="flex items-center">
        <img
          src="/logosbg.png"
          alt="Logo escola do cerrado"
          className="h-[664px] w-[718px] object-contain mr-5"
        />
        <CriarConta />
      </div> 
    </main>
  );
}
