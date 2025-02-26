"use client"
import HeaderComponent from "../../_components/adminComponents/simpleHeader";
import SwitchTabs from "../../_components/adminComponents/trocarAbas";
import BotoesTabela from "~/app/_components/adminComponents/bot_Tabl_Func";
import "../../../styles/table.css"
import Popup from "../../_components/popUp";
import { useState,useEffect } from "react";
import "../../../styles/popup.css"
import { Success_Cases } from "@prisma/client";

const POPUP_TYPES = {
  ADD : 'ADD',
  DELETE : 'DELETE',
  SEARCH : 'SEARCH',
  EDIT : 'EDIT',
  ABOUT : 'ABOUT',
};

const TabelaFuncPag: React.FC = () => {
  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);
  const [cases, setCases] = useState<Success_Cases[]>([]);
  const [selectedCasesId, setSelectedCasesId] = useState<number | null>(null);
  const [selectedEditCasesId, setSelectedEditCasesId] = useState<number | null>(null);
  const [newCaseData, setNewCaseData] = useState({
    titulo: "",
    descricao: "",
    foto: "",
  });

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("/api/SuccessCases");
        if (!response.ok) {
          throw new Error("Erro ao buscar cases");
        }
        const data = await response.json();
        setCases(data);
      } catch (error) {
        console.error("Erro ao carregar cases:", error);
      }
    };
    fetchCases();
  }, []);

  const handleOpenPopup = (popupType: string) => {
    setVisiblePopup(popupType);
  };

  const handleClosePopup = () => {
    setVisiblePopup(null);
  };

  const handleCreateCase = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/SuccessCases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCaseData),
      });

      if (response.ok) {
        const createdCase = await response.json();
        setCases((prevCases) => [...prevCases, createdCase]);
        alert("Case criado com sucesso!");
        handleClosePopup();
      } else {
        alert("Erro ao criar o case");
      }
    } catch (error) {
      console.error("Erro ao criar case:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen w-max">
      <HeaderComponent title={"Área do Administrador"} />
      <div className="flex gap-6">
        <section className="flex gap-6">
          <table className="h-50px border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100 h-40px">
                <th className="border-b px-4 py-2 text-center" colSpan={4}>
                  Tabela de Cases
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border-b px-4 py-2">Id</th>
                <th className="border-b px-4 py-2">Título</th>
                <th className="border-b px-4 py-2">Descrição</th>
                <th className="border-b px-4 py-2">Foto</th>
              </tr>
            </thead>
            <tbody>
              {cases.length > 0 ? (
                cases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2">{c.id}</td>
                    <td className="border-b px-4 py-2">{c.titulo}</td>
                    <td className="border-b px-4 py-2">{c.descricao}</td>
                    <td className="border-b px-4 py-2">{c.foto}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border-b px-4 py-2 text-center">Nenhum case encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
            <div className="flex flex-col w-max">
              {/* Adicionar Novo Button */}
              <button 
              onClick={() => handleOpenPopup(POPUP_TYPES.ADD)}
              className="
                bg-VerdeEscuro text-white font-semibold 
                py-2 px-4 rounded-md 
                hover:bg-green-700 transition duration-300 
                shadow-md hover:shadow-lg
                mt-20
              ">
                Adicionar Novo
              </button>

              {/* Excluir Item Button */}
              <button
              onClick={() => handleOpenPopup(POPUP_TYPES.DELETE)}
              className="
                bg-Laranja text-white font-semibold 
                py-2 px-4 rounded-md 
                hover:bg-orange-600 transition duration-300 
                shadow-md hover:shadow-lg
              ">
                Excluir Item
              </button>

              {/* Pesquisar Button */}
              <button 
              onClick={() => handleOpenPopup(POPUP_TYPES.SEARCH)}
              className="
                bg-Azul text-white font-semibold 
                py-2 px-4 rounded-md 
                hover:bg-blue-600 transition duration-300 
                shadow-md hover:shadow-lg
              ">
                Pesquisar
              </button>

              {/* Editar Button */}
              <button 
                onClick={() => handleOpenPopup(POPUP_TYPES.EDIT)}              className="
                bg-Amarelo text-white font-semibold 
                py-2 px-4 rounded-md 
                hover:bg-yellow-500 transition duration-300 
                shadow-md hover:shadow-lg
              ">
                Editar
              </button>

              {/* Salvar Button */}
              <button
              onClick={() => handleOpenPopup(POPUP_TYPES.ABOUT)}
              className="
                bg-Menta text-white font-semibold 
                py-2 px-4 rounded-md 
                hover:bg-teal-500 transition duration-300 
                shadow-md hover:shadow-lg
              ">
                Sobre
              </button>
              {visiblePopup === POPUP_TYPES.ADD && (
                <Popup onClose={handleClosePopup}>
                  <form className="text-center" onSubmit={handleCreateCase}>
                    <h2 className="text-x1 font-bold mb-4">Adicionar Novo Case</h2>
                    <h3>Título</h3>
                    <input
                      placeholder="Insira o título do case"
                      required
                      value={newCaseData.titulo}
                      onChange={(e) => setNewCaseData({ ...newCaseData, titulo: e.target.value })}
                    />
                    <h3>Descrição</h3>
                    <input
                      placeholder="Insira a descrição do case"
                      required
                      value={newCaseData.descricao}
                      onChange={(e) => setNewCaseData({ ...newCaseData, descricao: e.target.value })}
                    />
                    <h3>Foto</h3>
                    <input
                      placeholder="Insira o link da foto do case"
                      required
                      value={newCaseData.foto}
                      onChange={(e) => setNewCaseData({ ...newCaseData, foto: e.target.value })}
                    />
                    <div className="flex flex-row border-t-8">
                      <button className="bg-green-600 hover:bg-green-900" type="submit">Criar novo item</button>
                      <button className="bg-red-600 hover:bg-red-900" onClick={handleClosePopup}>Cancelar operação</button>
                    </div>
                  </form>
                </Popup>
              )}
              {visiblePopup === POPUP_TYPES.DELETE && (
                <Popup onClose={handleClosePopup}>
                  <div className="text-center">
                    <h2 className="text-x1 font-bold mb-4">
                      Excluir item
                    </h2>
                    <h3>Deseja excluir o item?</h3>
                    <div className="flex flex-row">
                      <button className="bg-red-600 hover:bg-red-900" type="submit">Sim</button>
                      <button className="bg-gray-500 hover:bg-gray-700" onClick={handleClosePopup}>Não</button>
                    </div>
                  </div>
                </Popup>
              )}
              {visiblePopup === POPUP_TYPES.EDIT && (
                <Popup onClose={handleClosePopup}>
                  <form className="text-center items-center">
                    <h2 className="text-x1 font-bold mb-4">
                      Editar dados de funcionário do sistema
                    </h2>
                    <h3>Titulo</h3>
                    <input placeholder="Alterar o título do case"></input>
                    <h3>Descrição</h3>
                    <input placeholder="Alterar a descrição do case"></input>
                    <h3>Foto</h3>
                    <input placeholder="Alterar o link da foto do case"></input>
                    <div className="flex justify-center mt-4">
                      <button className="bg-green-600 hover:bg-green-900">Salvar</button>
                      <button className="bg-red-600 hover:bg-red-900" onClick={handleClosePopup}>Cancelar</button>
                    </div>
                  </form>
                </Popup>
              )}
              {visiblePopup === POPUP_TYPES.ABOUT && (
                <Popup onClose={handleClosePopup}>
                  <div className="text-center">
                    <h2 className="text-x1 font-bold mb-4">
                      Informações detalhadas do item
                    </h2>
                    <p>Aqui estão as informações do funcionário mais detalhadamente:</p>
                    <form className="text-center">
                    <h3>Título</h3>
                    <input placeholder="insira o Título do case" required></input>
                    <h3>Descrição</h3>
                    <input placeholder="insira a descrição do case" required></input>
                    <h3>Insira o link da foto do case</h3>
                    <input placeholder="insira o link da foto do case" required></input>
                    <div className="flex justify-center mt-4">
                      <button className="bg-red-600 hover:bg-red-900" onClick={handleClosePopup}>Fechar</button>
                    </div>
                  </form>
                  </div>
                </Popup>
              )}
              {visiblePopup === POPUP_TYPES.SEARCH && (
                <Popup onClose={handleClosePopup}>
                  <div className="text-center">
                    <h2 className="text-x1 font-bold mb-4">
                      Pesquisar item
                    </h2>
                    <p>Pesquisar case no banco de dados</p>
                    <div className="dropdown">
                      <button className="dropbtn">Filtro</button>
                      <div className="dropdown-content">
                        <a href="#">Id</a>
                        <a href="#">Título</a>
                      </div>
                    </div>
                    <input placeholder="Insira o nome da pessoa"></input>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300">
                      Pesquisar
                    </button>
                  </div>

                </Popup>
              )}

            </div>
          </section>
        </div>
      </div>
  );
}
export default TabelaFuncPag;
