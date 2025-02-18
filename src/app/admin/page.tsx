import Link from "next/link";
import HeaderComponent from "../_components/adminComponents/simpleHeader";
import SwitchTabs from "../_components/adminComponents/trocarAbas";

export default function AreaAdmin() {
  return (
    <div className="p-6">
      <HeaderComponent title={"Área do administrador"} />
      <h1>Essa é uma zona restrita</h1>
      <SwitchTabs />
      <h1>Nome:</h1>
      <input></input>
      <h1>Cargo:</h1>
      <input></input>
      <h1>E-mail:</h1>
      <input></input>
      <h1>Senha:</h1>
      <input></input>
    </div>
  );
}
