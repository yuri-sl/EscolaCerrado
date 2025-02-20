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
    <header className="flex h-[137px] w-full items-center">
      <div className="h-[156px] w-[171px]">
        <ul className="inline">
          <li>
            <Link href="/admin/">
              <img
                src="/logosbg.png"
                alt="Logo escola do cerrado"
                className="h-full w-full object-contain"
              />
            </Link>
          </li>
          <li>
            <Link href="/admin/">
              <Image src={perfilL} alt="Perfil Image" title="Perfil" />
            </Link>
          </li>
          <li>
            <Link href="/admin/tabelaFunc">
              <Image
                src={funcionariosV}
                alt="Funcionarios Image"
                title="tabela de funcionários"
              />
            </Link>
          </li>
          <li>
            <Link href="/admin/tabelaCases">
              <Image src={casesV} alt="Cases Image" title="tabela de cases" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="NomePagina">
          <h1>{title}</h1>
        </div>
      </div>
    </header>
  );
}
