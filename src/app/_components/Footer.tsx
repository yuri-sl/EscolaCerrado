import { FaInstagram, FaLink } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#98a147] px-0 py-2 pb-0 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between font-bold md:flex-row">
        {/* Contato */}
        <div className="text-left">
          <h3 className="text-lg font-bold">Contato</h3>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2">📧 email@gmail.com</li>
            <li className="flex items-center gap-2">📞 3000-0000</li>
            <li className="flex items-center gap-2">
              <FaLink />
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

        {/* Redes Sociais */}
        <div className="mt-4 text-center md:mt-0 md:text-right">
          <p className="font-semibold">
            Nos acompanhe nas nossas redes sociais:
          </p>
          <div className="mt-2 flex justify-center gap-4 md:justify-end">
            <a
              href="https://www.instagram.com/escoladocerrado/"
              className="text-xl text-black hover:text-gray-700"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 h-max border-t border-black bg-VerdeClaro2 pt-2 text-center text-sm font-bold">
        Copyright © 2025 | Desenvolvido com 💚
      </div>
    </footer>
  );
};

export default Footer;
