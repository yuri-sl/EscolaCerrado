import Image from "next/image";
import logoSmall from "../../../public/logosbg.png";

export default function HeaderComponent({ title }) {
  return (
    <nav className="rounded-lg bg-blue-500 p-4 text-white shadow-lg">
      <ul className="flex items-center space-x-4">
        <li>
          <Image src={logoSmall} alt="logoPequena" width={100} height={100} />
        </li>
        <li>
          <h1 className="text-2xl font-bold">{title}</h1>
        </li>
      </ul>
    </nav>
  );
}
