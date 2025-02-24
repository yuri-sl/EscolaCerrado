"use client";
import Image from "next/image";
import { useState } from "react";
import FuncionarioHeaderComponent from "../_components/funcionarioComponents/FuncSimpleHeader";
import "../../styles/loginBox.css";
import user2 from "../../../public/user2.png";

export default function AreaAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Botão para abrir/fechar a Navbar */}
      <button
        className="absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
      </button>

      {/* Navbar - Exibe se isOpen for true */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <FuncionarioHeaderComponent title={"Área do Funcionário"} />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-10">
        <div className="flex gap-6">
          {/* Left Side: Tabs */}
          {/* Right Side: Content */}
          <section className="flex gap-6">
            {/* Essa deve ficar à esquerda */}
            <div className="w-1/3 pr-4">
              <Image src={user2} alt="Perfil Image" title="Perfil" />
              <button className="ml-20 mt-4 rounded bg-blue-500 px-4 py-2 pr-4 text-white">
                Inserir nova foto
              </button>
            </div>
            {/* Essa deve ficar à direita */}
            <div className="w-2/3 pl-4">
              <div className="loginBox">
                <div className="w-2/3">
                  <div className="inputField">
                    <h1 id="titleDados">Meus dados</h1>
                    <h3>Nome:</h3>
                    <input id="infoInput" />
                    <h3>Cargo:</h3>
                    <input id="infoInput" />
                    <h3>E-mail:</h3>
                    <input id="infoInput" />
                    <h3>Senha:</h3>
                    <input id="infoInput" />
                    <div className="SubmitButton">
                      <button type="submit">Editar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
