import Link from "next/link";
import "../../../styles/simpleHeaderBar.css";

export default function FuncionarioHeaderComponent({ title }) {
  return (
    <div className="h-screen w-64 bg-Laranja text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <nav className="space-y-4">
        <Link href="/funcionario" className="block p-3 rounded-md hover:bg-gray-700">Home
        </Link>
        <Link href="/funcionario/tableCases" className="block p-3 rounded-md hover:bg-gray-700">Administrar Cases
        </Link>
        <Link className="block p-3 rounded-md mt-40 hover:bg-gray-700" href="../../#" id="ExitButton"> Sair do sistema
        </Link>
      </nav>
    </div>
  );
}
