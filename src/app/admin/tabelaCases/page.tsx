"use client";
import HeaderComponent from "../../_components/adminComponents/simpleHeader";
import SwitchTabs from "../../_components/adminComponents/trocarAbas";
import BotoesTabela from "~/app/_components/adminComponents/bot_Tabl_Func";
import "../../../styles/table.css";
import Popup from "../../_components/popUp";
import { useState, useEffect } from "react";
import "../../../styles/popup.css";
import { Success_Cases } from "@prisma/client";
import AddCaseForm from "~/app/_components/adminAddCaseForm";
import TabelaCases from "~/app/_components/tabelaCases";
import RemoverCases from "~/app/_components/adminRemoveCase";

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
          <TabelaCases />
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
                <AddCaseForm />
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.DELETE && (
              <Popup onClose={handleClosePopup}>
                <RemoverCases />
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.EDIT && (
              <Popup onClose={handleClosePopup}>
                <form className="text-center" onSubmit={handleEditCase}>
                  <h2 className="mb-4 text-xl font-bold text-MarromEscuro">
                    Editar Case
                  </h2>

                  <label className="block text-[18px] font-bold text-MarromEscuro">
                    Selecione um ID para editar:
                  </label>
                  <select
                    className="my-2 w-full rounded-[20px] bg-Creme p-2 text-[16px]"
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

                  {editFormData.id && (
                    <>
                      <label className="block text-[18px] font-bold text-MarromEscuro">
                        Título:
                      </label>
                      <input
                        className="w-full rounded-[20px] bg-Creme p-2 text-[16px]"
                        value={editFormData.titulo}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            titulo: e.target.value,
                          })
                        }
                      />

                      <label className="block text-[18px] font-bold text-MarromEscuro">
                        Descrição:
                      </label>
                      <input
                        className="w-full rounded-[20px] bg-Creme p-2 text-[16px]"
                        value={editFormData.descricao}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            descricao: e.target.value,
                          })
                        }
                      />

                      <label className="block text-[18px] font-bold text-MarromEscuro">
                        Foto (URL):
                      </label>
                      <input
                        className="w-full rounded-[20px] bg-Creme p-2 text-[16px]"
                        value={editFormData.foto}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            foto: e.target.value,
                          })
                        }
                      />

                      {/* Exibição de erro */}
                      {erro && <p className="font-bold text-red-600">{erro}</p>}

                      <div className="mt-4 flex flex-row gap-4">
                        <button
                          className="h-10 w-32 rounded-[20px] bg-green-600 px-4 py-2 text-[18px] font-bold text-white hover:bg-green-900"
                          type="submit"
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          onClick={handleClosePopup}
                          className="h-10 w-32 rounded-[20px] bg-gray-500 px-4 py-2 text-[18px] font-bold text-white hover:bg-gray-700"
                        >
                          Cancelar
                        </button>
                      </div>

                      {/* Mensagem de sucesso */}
                      {sucesso && (
                        <div className="mt-4 rounded bg-Verde px-4 py-2 text-[16px] font-bold text-white">
                          Case atualizado com sucesso!
                        </div>
                      )}
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
