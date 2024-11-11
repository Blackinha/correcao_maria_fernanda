"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const categoriasLocalStorage =
      JSON.parse(localStorage.getItem("categorias")) || [];
    // guarda a lista no estado
    setCategorias(categoriasLocalStorage);
    console.log(categoriasLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(categoria) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir a categoria ${categoria.nome}?`)
    ) {
      // filtra a lista antiga removando a categoria recebida
      const novaLista = categorias.filter((item) => item.id !== categoria.id);
      // grava no localStorage a nova lista
      localStorage.setItem("categorias", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setCategorias(novaLista);
      alert("Categoria excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Categorias"}>
      <div className="text-end mb-2">
        <Button className="bg-success"cd href="/categorias/form">
          <FaPlusCircle /> Nova Categoria
        </Button>
      </div>

      {/* Tabela com as Categorias */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => {
            return (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td>{categoria.descricao}</td>
                <td>{categoria.status}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/categorias/form?id=${categoria.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(categoria)}>
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
