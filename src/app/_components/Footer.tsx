import { FaInstagram, FaLink } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-Verde px-0 py-2 pb-0 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between text-2xl font-bold md:flex-row">
        <div className="text-left">
          <h3 className="text-[32px] font-bold font-inter mt-4 mb-4">Contato</h3>
          <ul className="text-[16px] mt-2 space-y-1 font-inter">
            <li className="flex items-center gap-2">
              <img src="/email.png" alt="Email" width="25" height="25" />
              email@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <img src="/telefone.png" alt="Telefone" width="25" height="25" />
              3000-0000
            </li>
            <li className="flex items-center gap-2">
              <FaLink size={25} />
              <a
                href="https://linktr.ee/escoladocerrado"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linktr.ee/escoladocerrado
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-4 text-center md:mt-0 md:text-right">
          <p className="font-semibold font-inter">
            Nos acompanhe nas nossas redes sociais:
          </p>
          <div className="mt-2 flex justify-center gap-4 md:justify-end">
            <a
              href="https://www.instagram.com/escoladocerrado/"
              className="text-black hover:text-gray-700"
            >
              <FaInstagram size={41} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 h-max border-t bg-VerdeClaro2 pt-2 text-center text-[24px] font-bold">
        Copyright © 2025 | Desenvolvido com 💚
      </div>
    </footer>
  );
};

export default Footer;
