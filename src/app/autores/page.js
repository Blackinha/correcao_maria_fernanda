"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista de autores do localStorage, se não existir, inicia uma lista vazia
    const autoresLocalStorage =
      JSON.parse(localStorage.getItem("autores")) || [];
    // Guarda a lista no estado autores
    setAutores(autoresLocalStorage);
    console.log(autoresLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(autor) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o autor ${autor.nome}?`)) {
      // Filtra a lista antiga removendo o autor recebido
      const novaLista = autores.filter((item) => item.id !== autor.id);
      // Grava a nova lista no localStorage
      localStorage.setItem("autores", JSON.stringify(novaLista));
      // Atualiza o estado para renderizar a nova lista na tela
      setAutores(novaLista);
      alert("Autor excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Autores"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/autores/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os autores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Biografia</th>
            <th>País</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => {
            return (
              <tr key={autor.id}>
                <td>{autor.nome}</td>
                <td>{autor.biografia}</td>
                <td>{autor.pais}</td>
                <td>{autor.estado}</td>
                <td>{autor.cidade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/autores/form?id=${autor.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(autor)}>
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
