"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const livrosLocalStorage = JSON.parse(localStorage.getItem("livros")) || [];
    // Guarda a lista no estado livros
    setLivros(livrosLocalStorage);
    console.log(livrosLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(livro) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o livro ${livro.nome}?`)) {
      // Filtra a lista antiga removendo o livro recebido
      const novaLista = livros.filter((item) => item.id !== livro.id);
      // Grava no localStorage a nova lista
      localStorage.setItem("livros", JSON.stringify(novaLista));
      // Grava a nova lista no estado para renderizar na tela
      setLivros(novaLista);
      alert("Livro excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Livros"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/livros/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os Livros */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Autor</th>
            <th>Ano de Lançamento</th>
            <th>Nota</th>
            <th>Editora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => {
            return (
              <tr key={livro.id}>
                <td>{livro.nome}</td>
                <td>{livro.autor}</td>
                <td>{livro.anoLancamento}</td>
                <td>{livro.nota}</td>
                <td>{livro.editora}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button className="me-2" href={`/livros/form?id=${livro.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(livro)}>
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
