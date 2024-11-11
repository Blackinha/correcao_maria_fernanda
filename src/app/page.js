"use client";

import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function BibliotecaPage() {
  const Livros = JSON.parse(localStorage.getItem("livros")) || [];
  const autores = JSON.parse(localStorage.getItem("autores")) || [];
  const Categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  const editoras = JSON.parse(localStorage.getItem("editoras")) || [];
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

  const lista = [
    {
      nome: "Livros",
      imagem:
        "https://blog.unis.edu.br/hubfs/Imported_Blog_Media/15-livros-incriveis-para-todo-estudante-ler.jpeg",
      quantidade: Livros.length,
      link: "/livros",
    },
    {
      nome: "Autores",
      imagem:
        "https://foconoenem.com/wp-content/uploads/2015/08/autores-mais-cobrados-no-enem.jpg",
      quantidade: autores.length,
      link: "/autores",
    },
    {
      nome: "Categorias",
      imagem:
        "https://redata.com.br/wp-content/uploads/2024/06/1.png",
      quantidade: Categorias.length,
      link: "/categorias",
    },
    {
      nome: "Editoras",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGWVmcOhk96X5L14JcK8OznjjVleFe0cysg&s",
      quantidade: editoras.length,
      link: "/editoras",
    },
    {
      nome: "Emprestimos",
      imagem:
        "https://unisalesiano.com.br/lins/wp-content/uploads/2020/09/Emprestimo-de-Livros2.png",
      quantidade: emprestimos.length,
      link: "/emprestimos",
    },
  ];

  return (
    <Pagina titulo={"Biblioteca"}>
      <Row md={3}>
        {lista.map((item, index) => (
          <Col key={index} className="py-2">
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={item.imagem}
                style={{ objectFit: "cover", height: "200px" }} // Ajuste de imagem
              />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                <p>Cadastrados: {item.quantidade}</p>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button className="bg-success" href={item.link}>
                  Ver Lista
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
