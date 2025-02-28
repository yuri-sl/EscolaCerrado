"use client";
import HeaderComponent from "../../_components/adminComponents/simpleHeader";
import SwitchTabs from "../../_components/adminComponents/trocarAbas";
import BotoesTabela from "~/app/_components/adminComponents/bot_Tabl_Func";
import "../../../styles/table.css";
import Popup from "../../_components/popUp";
import { useState, useEffect } from "react";
import "../../../styles/popup.css";
import UsuarioTable from "~/app/_components/adminComponents/usuarioTable";
import AdminCriarConta from "~/app/_components/adminCriarConta";
import AdminDeletarConta from "~/app/_components/adminRemoveConta";
import { api } from "~/utils/api";
import TabelaFuncionarios from "~/app/_components/tabelaFuncionarios";
import EditarUsuario from "~/app/_components/adminUpdateConta";
import RemoverCases from "~/app/_components/adminRemoveCase";
import DeleteUserComponent from "~/app/_components/adminRemoveConta";

const POPUP_TYPES = {
  ADD: "ADD",
  DELETE: "DELETE",
  SEARCH: "SEARCH",
  EDIT: "EDIT",
  ABOUT: "ABOUT",
};

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
  email: string;
  foto: string;
  senha: string;
}

const TabelaFuncPag: React.FC = () => {
  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedEditUserId, setSelectedEditUserId] = useState<number | null>(
    null,
  );
  const [editFormData, setEditFormData] = useState<Usuario>({
    id: 0,
    nome: "",
    cargo: "",
    email: "",
    senha: "",
    foto: "",
  });
  // Usa o tRPC para buscar funcionários
  const { data: funcionarios, isLoading } = api.funcionario.getAll.useQuery();

  useEffect(() => {
    fetch("/api/auth/getFuncionarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error());
  }, []);

  // Handle opening a popup
  const handleOpenPopup = (popupType: string) => {
    setVisiblePopup(popupType);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setVisiblePopup(null);
  };
  const handleDeleteUsuario = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch("/api/usuarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuário deletado com sucesso!");

        // Atualizar a lista de usuários removendo o usuário deletado
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((user) => user.id !== id),
        );

        handleClosePopup(); // Fechar o popup após a exclusão
      } else {
        alert(`Erro: ${data.error || "Falha ao deletar usuário"}`);
      }
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };
  const handleSelectEditUser = (id: number) => {
    const user = usuarios.find((usuario) => usuario.id === id);
    if (user) {
      setSelectedEditUserId(id);
      setEditFormData(user); // Preenche o formulário com os dados atuais do usuário
    }
  };
  const handleEditUsuario = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedEditUserId) return alert("Selecione um usuário para editar");

    try {
      const response = await fetch("/api/usuarios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuário atualizado com sucesso!");

        // Atualiza a lista de usuários
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((user) =>
            user.id === selectedEditUserId ? data : user,
          ),
        );

        handleClosePopup();
      } else {
        alert(`Erro: ${data.error || "Falha ao atualizar usuário"}`);
      }
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen w-max">
      <HeaderComponent title={"Área do Administrador"} />
      <div className="flex gap-6">
        <section className="flex gap-6">
          <TabelaFuncionarios />
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
                <AdminCriarConta />
              </Popup>
            )}
            {visiblePopup === POPUP_TYPES.DELETE && (
              <Popup onClose={handleClosePopup}>
                <DeleteUserComponent />
              </Popup>
            )}

            {visiblePopup === POPUP_TYPES.EDIT && (
              <Popup onClose={handleClosePopup}>
                <EditarUsuario />
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
                    <h3>Nome</h3>
                    <input
                      placeholder="insira o nome do funcionário"
                      required
                    ></input>
                    <h3>Cargo</h3>
                    <input
                      placeholder="insira a função do funcionário"
                      required
                    ></input>
                    <h3>Email</h3>
                    <input
                      placeholder="insira o email do funcionário"
                      required
                    ></input>
                    <h3>Senha</h3>
                    <input
                      placeholder="insira a senha do funcionário"
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
                  <p>Pesquisar pessoa no banco de dados</p>
                  <div className="dropdown">
                    <button className="dropbtn">Filtro</button>
                    <div className="dropdown-content">
                      <a href="#">Id</a>
                      <a href="#">Nome</a>
                      <a href="#">Cargo</a>
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
