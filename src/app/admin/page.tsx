import Link from "next/link";
import Image from "next/image";

import HeaderComponent from "../_components/adminComponents/simpleHeader";
import SwitchTabs from "../_components/adminComponents/trocarAbas";
import "../../styles/loginBox.css";
import user2 from "../../../public/user2.png";

export default function AreaAdmin() {
  return (
    <div className="p-6">
      <HeaderComponent title={"Área do administrador"} />
      <div className="flex gap-6">
        {/* Left Side: Tabs */}
        <SwitchTabs />

        {/* Right Side: Content */}
        {/*Deixar elementos lado a lado*/}
        <section className="flex gap-6">
          {/* Essa deve ficar a esquerda*/}
          <div className="w-1/3 pr-4">
            <Image src={user2} alt="Perfil Image" title="Perfil" />
            <button className="ml-20 mt-4 rounded bg-blue-500 px-4 py-2 pr-4 text-white">
              Inserir nova foto
            </button>
          </div>
          {/* Essa deve ficar a direita*/}
          <div className="w-2/3 pl-4">
            <div className="loginBox">
              <div className="w-2/3">
                <div className="inputField">
                  <h1 id="titleDados">Meus dados</h1>
                  <h3>Nome:</h3>
                  <input id="infoInput"></input>
                  <h3>Cargo:</h3>
                  <input id="infoInput"></input>
                  <h3>E-mail:</h3>
                  <input id="infoInput"></input>
                  <h3>Senha:</h3>
                  <input id="infoInput"></input>
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
  );
}
