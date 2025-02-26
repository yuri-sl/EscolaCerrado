import { FaInstagram, FaLink } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-[#98a147] text-black py-6 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Contato */}
        <div className="text-left">
          <h3 className="font-bold text-lg">Contato</h3>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2">
              📧 email@gmail.com
            </li>
            <li className="flex items-center gap-2">
              📞 3000-0000
            </li>
            <li className="flex items-center gap-2">
              <FaLink />
              <a href="https://linktr.ee/escoladocerrado" target="_blank" rel="noopener noreferrer" className="hover:underline">
                linktr.ee/escoladocerrado
              </a>
            </li>
          </ul>
        </div>
        
        {/* Redes Sociais */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="font-semibold">Nos acompanhe nas nossas redes sociais:</p>
          <div className="flex gap-4 justify-center md:justify-end mt-2">
            <a href="https://www.instagram.com/escoladocerrado/" className="text-black hover:text-gray-700 text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-sm mt-6 border-t border-black pt-2">
        Copyright © 2025 | Desenvolvido com 💚
      </div>
    </footer>
  );
};

export default Footer;
