import Link from "next/link";

import Image from "next/image";
import logoSmall from "../../../../public/logosbg.png";
import "../../../styles/simpleHeaderBar.css";
import perfilL from "../../../../public/perfilL.png";
import perfilV from "../../../../public/perfilV.png";
import funcionariosL from "../../../../public/funcionariosL.png";
import funcionariosV from "../../../../public/funcionariosV.png";
import casesL from "../../../../public/casesL.png";
import casesV from "../../../../public/casesV.png";

export default function HeaderComponent({ title }) {
  return (
    <div className="h-screen w-64 bg-Laranja text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <nav className="space-y-4">
        <Link href="/admin" className="block p-3 rounded-md hover:bg-gray-700">Home
        </Link>
        <Link href="/admin/tabelaFunc" className="block p-3 rounded-md hover:bg-gray-700">Tabela Funcionários</Link>
        <Link href="/admin/tabelaCases" className="block p-3 rounded-md hover:bg-gray-700">Administrar Cases
        </Link>
        <Link className="block p-3 rounded-md mt-40 hover:bg-gray-700" href="../../#" id="ExitButton"> Sair do sistema
        </Link>
      </nav>
    </div>
  );
}
