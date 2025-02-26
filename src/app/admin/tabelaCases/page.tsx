"use client";
import HeaderComponent from "../../_components/adminComponents/simpleHeader";
import SwitchTabs from "../../_components/adminComponents/trocarAbas";
import BotoesTabela from "~/app/_components/adminComponents/bot_Tabl_Func";
import "../../../styles/table.css";
import Popup from "../../_components/popUp";
import { useState, useEffect } from "react";
import "../../../styles/popup.css";
import { Success_Cases } from "@prisma/client";

const POPUP_TYPES = {
  ADD: "ADD",
  DELETE: "DELETE",
  SEARCH: "SEARCH",
  EDIT: "EDIT",
  ABOUT: "ABOUT",
};

const TabelaFuncPag: React.FC = () => {
  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);
  const [cases, setCases] = useState<Success_Cases[]>([]);
  const [selectedCasesId, setSelectedCasesId] = useState<number | null>(null);
  const [selectedEditCasesId, setSelectedEditCasesId] = useState<number | null>(
    null,
  );
  const [newCaseData, setNewCaseData] = useState({
    titulo: "",
    descricao: "",
    foto: "",
  });
  const [editFormData, setEditFormData] = useState<Success_Cases>({
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
  const handleDeleteCase = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este case?")) return;

    try {
      const response = await fetch("/api/SuccessCases", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Case deletado com sucesso!");

        // Atualizar a lista de usuários removendo o usuário deletado
        setCases((prevCases) => prevCases.filter((c) => c.id !== id));

        handleClosePopup(); // Fechar o popup após a exclusão
      } else {
        alert(`Erro: ${data.error || "Falha ao deletar usuário"}`);
      }
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };
  const handleEditCase = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/SuccessCases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const updatedCase = await response.json();
        setCases((prevCases) =>
          prevCases.map((c) => (c.id === updatedCase.id ? updatedCase : c)),
        );
        alert("Case atualizado com sucesso!");
        handleClosePopup();
      } else {
        alert("Erro ao atualizar o case");
      }
    } catch (error) {
      console.error("Erro ao atualizar case:", error);
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
              <tr className="h-40px bg-gray-100">
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
                  <td colSpan={4} className="border-b px-4 py-2 text-center">
                    Nenhum case encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex w-max flex-col">
            {/* Adicionar Novo Button */}
            <button
              onClick={() => handleOpenPopup(POPUP_TYPES.ADD)}
              className="mt-20 rounded-md bg-VerdeEscuro px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-green-700 hover:shadow-lg"
            >
              Adicionar Novo
            </button>

            {/* Excluir Item Button */}
            <button
              onClick={() => handleOpenPopup(POPUP_TYPES.DELETE)}
              className="rounded-md bg-Laranja px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-orange-600 hover:shadow-lg"
            >
              Excluir Item
            </button>

            {/* Pesquisar Button */}
            <button
              onClick={() => handleOpenPopup(POPUP_TYPES.SEARCH)}
              className="rounded-md bg-Azul px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-600 hover:shadow-lg"
            >
              Pesquisar
            </button>

            {/* Editar Button */}
            <button
              onClick={() => handleOpenPopup(POPUP_TYPES.EDIT)}
              className="rounded-md bg-Amarelo px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-yellow-500 hover:shadow-lg"
            >
              Editar
            </button>

            {/* Salvar Button */}
            <button
              onClick={() => handleOpenPopup(POPUP_TYPES.ABOUT)}
              className="rounded-md bg-Menta px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-teal-500 hover:shadow-lg"
            >
              Sobre
            </button>
            {visiblePopup === POPUP_TYPES.ADD && (
              <Popup onClose={handleClosePopup}>
                <form className="text-center" onSubmit={handleCreateCase}>
                  <h2 className="text-x1 mb-4 font-bold">
                    Adicionar Novo Case
                  </h2>
                  <h3>Título</h3>
                  <input
                    placeholder="Insira o título do case"
                    required
                    value={newCaseData.titulo}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, titulo: e.target.value })
                    }
                  />
                  <h3>Descrição</h3>
                  <input
                    placeholder="Insira a descrição do case"
                    required
                    value={newCaseData.descricao}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        descricao: e.target.value,
                      })
                    }
                  />
                  <h3>Foto</h3>
                  <input
                    placeholder="Insira o link da foto do case"
                    required
                    value={newCaseData.foto}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, foto: e.target.value })
                    }
                  />
                  <div className="flex flex-row border-t-8">
                    <button
                      className="bg-green-600 hover:bg-green-900"
                      type="submit"
                    >
                      Criar novo item
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-900"
                      onClick={handleClosePopup}
                    >
                      Cancelar operação
                    </button>
                  </div>
                </form>
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.DELETE && (
              <Popup onClose={handleClosePopup}>
                <div className="text-center">
                  <h2 className="text-x1 mb-4 font-bold">Excluir item</h2>
                  <p>Selecione o Id do case a ser excluido</p>
                  <select
                    className="my-2 w-full rounded border p-2"
                    onChange={(e) => setSelectedCasesId(Number(e.target.value))}
                    value={selectedCasesId || ""}
                  >
                    <option value="">Selecione um usuário</option>
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.titulo} (ID: {c.id})
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 flex justify-center">
                    <button
                      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-900"
                      onClick={() =>
                        selectedCasesId && handleDeleteCase(selectedCasesId)
                      }
                      disabled={!selectedCasesId} // Desativa o botão se nenhum usuário for selecionado
                    >
                      Confirmar Exclusão
                    </button>
                    <button
                      className="ml-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
                      onClick={handleClosePopup}
                    >
                      Cancelar
                    </button>
                  </div>
                  <h3>Deseja excluir o item?</h3>
                </div>
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.EDIT && (
              <Popup onClose={handleClosePopup}>
                <form className="text-center" onSubmit={handleEditCase}>
                  <h2 className="mb-4 text-xl font-bold">Editar Case</h2>
                  <p>Selecione um ID para editar:</p>
                  <select
                    className="my-2 w-full rounded border p-2"
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      const selectedCase = cases.find(
                        (c) => c.id === selectedId,
                      );
                      if (selectedCase) setEditFormData(selectedCase);
                    }}
                    value={editFormData.id || ""}
                  >
                    <option value="">Selecione um case</option>
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.titulo} (ID: {c.id})
                      </option>
                    ))}
                  </select>
                  {editFormData.id !== 0 && (
                    <>
                      <h3>Título</h3>
                      <input
                        className="w-full rounded border p-2"
                        value={editFormData.titulo}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            titulo: e.target.value,
                          })
                        }
                      />
                      <h3>Descrição</h3>
                      <input
                        className="w-full rounded border p-2"
                        value={editFormData.descricao}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            descricao: e.target.value,
                          })
                        }
                      />
                      <h3>Foto</h3>
                      <input
                        className="w-full rounded border p-2"
                        value={editFormData.foto}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            foto: e.target.value,
                          })
                        }
                      />
                      <div className="mt-4 flex justify-center">
                        <button
                          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-900"
                          type="submit"
                        >
                          Salvar Alterações
                        </button>
                        <button
                          className="ml-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
                          onClick={handleClosePopup}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.ABOUT && (
              <Popup onClose={handleClosePopup}>
                <div className="text-center">
                  <h2 className="text-x1 mb-4 font-bold">
                    Informações detalhadas do item
                  </h2>
                  <p>
                    Aqui estão as informações do funcionário mais
                    detalhadamente:
                  </p>
                  <form className="text-center">
                    <h3>Título</h3>
                    <input
                      placeholder="insira o Título do case"
                      required
                    ></input>
                    <h3>Descrição</h3>
                    <input
                      placeholder="insira a descrição do case"
                      required
                    ></input>
                    <h3>Insira o link da foto do case</h3>
                    <input
                      placeholder="insira o link da foto do case"
                      required
                    ></input>
                    <div className="mt-4 flex justify-center">
                      <button
                        className="bg-red-600 hover:bg-red-900"
                        onClick={handleClosePopup}
                      >
                        Fechar
                      </button>
                    </div>
                  </form>
                </div>
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.SEARCH && (
              <Popup onClose={handleClosePopup}>
                <div className="text-center">
                  <h2 className="text-x1 mb-4 font-bold">Pesquisar item</h2>
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
                <div className="mt-4 flex justify-center">
                  <button className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-900">
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
};
export default TabelaFuncPag;
