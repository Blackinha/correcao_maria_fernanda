"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState([]);

  // Carrega os empréstimos quando a tela é acessada
  useEffect(() => {
    // Busca a lista de empréstimos do localStorage, se não existir, inicia uma vazia
    const emprestimosLocalStorage =
      JSON.parse(localStorage.getItem("emprestimos")) || [];
    // Guarda a lista no estado
    setEmprestimos(emprestimosLocalStorage);
    console.log(emprestimosLocalStorage);
  }, []);

  // Função para exclusão de um empréstimo
  function excluir(emprestimo) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(
        `Deseja realmente excluir o empréstimo do livro ${emprestimo.livro}?`
      )
    ) {
      // Filtra a lista antiga, removendo o empréstimo recebido
      const novaLista = emprestimos.filter((item) => item.id !== emprestimo.id);
      // Grava no localStorage a nova lista
      localStorage.setItem("emprestimos", JSON.stringify(novaLista));
      // Atualiza a nova lista no estado para renderizar na tela
      setEmprestimos(novaLista);
      alert("Empréstimo excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Empréstimos"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/emprestimos/form">
          <FaPlusCircle /> Novo Empréstimo
        </Button>
      </div>

      {/* Tabela com os Empréstimos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Emprestado Para</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.livro}</td>
              <td>{emprestimo.emprestadoPara}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td>{emprestimo.dataDevolucao}</td>
              <td>{emprestimo.status}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button
                  className="me-2"
                  href={`/emprestimos/form?id=${emprestimo.id}`}
                >
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(emprestimo)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
