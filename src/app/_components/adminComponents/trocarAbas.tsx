import Link from "next/link";

export default function trocarAbas() {
  return (
    <nav>
      <ul>
        <li>
          <a>Perfil</a>
        </li>
        <li>
          <Link href="/admin/tabelaFunc">Funcionários</Link>
        </li>
        <li>
          <Link href="/admin/tabelaCases">Cases</Link>
        </li>
      </ul>
    </nav>
  );
}
