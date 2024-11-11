"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function EditorasPage() {
  const [editoras, setEditoras] = useState([]);

  // Carrega as editoras quando a tela é acessada
  useEffect(() => {
    // Busca a lista de editoras do localStorage, se não existir, inicia uma vazia
    const editorasLocalStorage =
      JSON.parse(localStorage.getItem("editoras")) || [];
    // Guarda a lista no estado
    setEditoras(editorasLocalStorage);
    console.log(editorasLocalStorage);
  }, []);

  // Função para exclusão de uma editora
  function excluir(editora) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir a editora ${editora.nome}?`)) {
      // Filtra a lista antiga, removendo a editora recebida
      const novaLista = editoras.filter((item) => item.id !== editora.id);
      // Grava no localStorage a nova lista
      localStorage.setItem("editoras", JSON.stringify(novaLista));
      // Atualiza a nova lista no estado para renderizar na tela
      setEditoras(novaLista);
      alert("Editora excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Editoras"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/editoras/form">
          <FaPlusCircle /> Nova Editora
        </Button>
      </div>

      {/* Tabela com as Editoras */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            <th>Ano de Fundação</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editoras.map((editora) => {
            return (
              <tr key={editora.id}>
                <td>{editora.nome}</td>
                <td>{editora.localizacao}</td>
                <td>{editora.anoFundacao}</td>
                <td>{editora.status}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/editoras/form?id=${editora.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(editora)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
