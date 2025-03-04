"use client";
import HeaderComponent from "../../_components/adminComponents/simpleHeader";
import "../../../styles/table.css";
import Popup from "../../_components/popUp";
import { useState, useEffect } from "react";
import "../../../styles/popup.css";
import { Success_Cases } from "@prisma/client";
import AddCaseForm from "~/app/_components/adminAddCaseForm";
import TabelaCases from "~/app/_components/tabelaCases";
import EditarCase from "~/app/_components/adminUpdateCase";
import DeleteCasePage from "~/app/_components/adminRemoveCase";

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

            {/* Editar Button */}
            <button
              onClick={() => handleOpenPopup(POPUP_TYPES.EDIT)}
              className="rounded-md bg-Amarelo px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-yellow-500 hover:shadow-lg"
            >
              Editar
            </button>

            {visiblePopup === POPUP_TYPES.ADD && (
              <Popup onClose={handleClosePopup}>
                <AddCaseForm />
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.DELETE && (
              <Popup onClose={handleClosePopup}>
                <DeleteCasePage />
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.EDIT && (
              <Popup onClose={handleClosePopup}>
                <EditarCase />
              </Popup>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
export default TabelaFuncPag;
