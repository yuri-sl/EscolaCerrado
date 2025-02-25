"use client"
import HeaderComponent from "../../_components/adminComponents/simpleHeader";
import SwitchTabs from "../../_components/adminComponents/trocarAbas";
import BotoesTabela from "~/app/_components/adminComponents/bot_Tabl_Func";
import "../../../styles/table.css"
import Popup from "../../_components/popUp";
import { useState,useEffect } from "react";
import "../../../styles/popup.css"
import UsuarioTable from "~/app/_components/adminComponents/usuarioTable";

const POPUP_TYPES = {
  ADD : 'ADD',
  DELETE : 'DELETE',
  SEARCH : 'SEARCH',
  EDIT : 'EDIT',
  ABOUT : 'ABOUT',
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
  const [selectedEditUserId, setSelectedEditUserId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Usuario>({
    id: 0,
    nome: "",
    cargo: "",
    email: "",
    senha: "",
    foto: "",
  });

  
    useEffect(() => {
      fetch("/api/usuarios")
        .then((res) => res.json())
        .then((data) => setUsuarios(data));
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
        setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.id !== id));
  
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
            user.id === selectedEditUserId ? data : user
          )
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
            <table className="h-50px border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-100 h-40px">
                  <th className="border-b px-4 py-2 text-center" colSpan="5">
                    Tabela de Funcionários
                  </th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-b px-4 py-2">Id</th>
                  <th className="border-b px-4 py-2">Nome</th>
                  <th className="border-b px-4 py-2">Cargo</th>
                  <th className="border-b px-4 py-2">Email</th>
                  <th className="border-b px-4 py-2">Senha</th>
                </tr>
              </thead>
              <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">{usuario.id}</td>
                  <td className="border-b px-4 py-2">{usuario.nome}</td>
                  <td className="border-b px-4 py-2">{usuario.cargo}</td>
                  <td className="border-b px-4 py-2">{usuario.email}</td>
                  <td className="border-b px-4 py-2">{usuario.senha}</td>
                  <td className="border-b px-4 py-2">{usuario.foto}</td>
                </tr>
              ))}
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
                <form
                  className="text-center"
                  onSubmit={async (event) => {
                    event.preventDefault(); // Impede o comportamento padrão do formulário

                    // Captura os dados do formulário
                    const formData = {
                      nome: event.target.nome.value,
                      cargo: event.target.cargo.value,
                      email: event.target.email.value,
                      senha: event.target.senha.value || "senha_padrao", // Valor padrão se não for fornecido
                      foto: "default.jpg", // Pode ser atualizado conforme necessário
                    };

                    try {
                      // Envia os dados para o endpoint da API
                      const response = await fetch('/api/usuarios', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                      });

                      const data = await response.json();

                      // Exibe uma mensagem de sucesso ou erro
                      if (response.ok) {
                        alert('Usuário cadastrado com sucesso!');

                        // Atualiza a lista de usuários
                        setUsuarios((prevUsuarios) => [...prevUsuarios, data]);

                        handleClosePopup(); // Fecha o popup após o sucesso
                      } else {
                        alert(`Erro: ${data.error || 'Falha ao cadastrar usuário'}`);
                      }
                    } catch (error) {
                      alert(`Erro: ${error.message}`);
                    }
                  }}
                >
                    <h2 className="text-xl font-bold mb-4">
                      Adicionar novo funcionário ao sistema
                    </h2>
                    <div className="mb-4">
                      <h3>Id</h3>
                      <input
                        name="id"
                        placeholder="Insira o id do funcionário"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <h3>Nome</h3>
                      <input
                        name="nome"
                        placeholder="Insira o nome do funcionário"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <h3>Cargo</h3>
                      <input
                        name="cargo"
                        placeholder="Insira a função do funcionário"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <h3>Email</h3>
                      <input
                        name="email"
                        type="email"
                        placeholder="Insira o email do funcionário"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="mb-4">
                      <h3>Senha</h3>
                      <input
                        name="senha"
                        type="password"
                        placeholder="Insira a senha do funcionário"
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div className="flex flex-row justify-between border-t-8 pt-4">
                      <button
                        className="bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded"
                        type="submit"
                      >
                        Criar novo item
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded"
                        onClick={handleClosePopup}
                        type="button" // Evita que o botão de cancelar envie o formulário
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
                    <h2 className="text-xl font-bold mb-4">Excluir Usuário</h2>
                    <p>Selecione o ID do usuário a ser excluído:</p>
                    <select
                      className="w-full p-2 border rounded my-2"
                      onChange={(e) => setSelectedUserId(Number(e.target.value))}
                      value={selectedUserId || ""}
                    >
                      <option value="">Selecione um usuário</option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                          {usuario.nome} (ID: {usuario.id})
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-center mt-4">
                      <button
                        className="bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded"
                        onClick={() => selectedUserId && handleDeleteUsuario(selectedUserId)}
                        disabled={!selectedUserId} // Desativa o botão se nenhum usuário for selecionado
                      >
                        Confirmar Exclusão
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded ml-4"
                        onClick={handleClosePopup}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </Popup>
              )}

              {visiblePopup === POPUP_TYPES.EDIT && (
                <Popup onClose={handleClosePopup}>
                  <form className="text-center" onSubmit={handleEditUsuario}>
                    <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>

                    <p>Selecione um ID para editar:</p>
                    <select
                      className="w-full p-2 border rounded my-2"
                      onChange={(e) => handleSelectEditUser(Number(e.target.value))}
                      value={selectedEditUserId || ""}
                    >
                      <option value="">Selecione um usuário</option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                          {usuario.nome} (ID: {usuario.id})
                        </option>
                      ))}
                    </select>

                    {selectedEditUserId && (
                      <>
                        <div className="mb-4">
                          <h3>Nome</h3>
                          <input
                            className="w-full p-2 border rounded"
                            name="nome"
                            value={editFormData.nome}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, nome: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <h3>Cargo</h3>
                          <input
                            className="w-full p-2 border rounded"
                            name="cargo"
                            value={editFormData.cargo}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, cargo: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <h3>Email</h3>
                          <input
                            className="w-full p-2 border rounded"
                            name="email"
                            type="email"
                            value={editFormData.email}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, email: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <h3>Senha</h3>
                          <input
                            className="w-full p-2 border rounded"
                            name="senha"
                            type="password"
                            placeholder="Deixe em branco para manter a mesma senha"
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, senha: e.target.value })
                            }
                          />
                        </div>

                        <div className="flex justify-center mt-4">
                          <button
                            className="bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded"
                            type="submit"
                          >
                            Salvar Alterações
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded ml-4"
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
                    <h2 className="text-x1 font-bold mb-4">
                      Informações detalhadas do item
                    </h2>
                    <p>Aqui estão as informações do funcionário mais detalhadamente:</p>
                    <form className="text-center">
                    <h3>Nome</h3>
                    <input placeholder="insira o nome do funcionário" required></input>
                    <h3>Cargo</h3>
                    <input placeholder="insira a função do funcionário" required></input>
                    <h3>Email</h3>
                    <input placeholder="insira o email do funcionário" required></input>
                    <h3>Senha</h3>
                    <input placeholder="insira a senha do funcionário" required></input>
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
