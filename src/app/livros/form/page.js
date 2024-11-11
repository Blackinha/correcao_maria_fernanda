"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function LivroFormPage(props) {
  const router = useRouter();
  const livros = JSON.parse(localStorage.getItem("livros")) || [];
  const id = props.searchParams.id;
  const livroEditado = livros.find((item) => item.id === id);

  function salvar(dados) {
    if (livroEditado) {
      Object.assign(livroEditado, dados);
      localStorage.setItem("livros", JSON.stringify(livros));
    } else {
      dados.id = v4();
      livros.push(dados);
      localStorage.setItem("livros", JSON.stringify(livros));
    }

    alert("Livro salvo com sucesso!");
    router.push("/livros");
  }

  const initialValues = {
    titulo: "",
    autor: "",
    anoPublicacao: "",
    genero: "",
    preco: 0,
    editora: "",
    quantidadeEstoque: 0,
    descricao: "",
  };

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório"),
    autor: Yup.string().required("Campo obrigatório"),
    anoPublicacao: Yup.number()
      .typeError("Deve ser um ano válido")
      .required("Campo obrigatório"),
    genero: Yup.string().required("Campo obrigatório"),
    preco: Yup.number()
      .min(0, "Deve ser um valor positivo")
      .required("Campo obrigatório"),
    editora: Yup.string().required("Campo obrigatório"),
    quantidadeEstoque: Yup.number()
      .min(0, "Deve ser um número positivo")
      .required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
  });

  // Função para calcular as estatísticas
  const calcularEstatisticas = () => {
    const totalLivros = livros.length;
    const totalEstoque = livros.reduce(
      (acc, livro) => acc + livro.quantidadeEstoque,
      0
    );
    const mediaPreco =
      totalLivros > 0
        ? livros.reduce((acc, livro) => acc + livro.preco, 0) / totalLivros
        : 0;

    return {
      totalLivros,
      totalEstoque,
      mediaPreco: mediaPreco.toFixed(2),
    };
  };

  const { totalLivros, totalEstoque, mediaPreco } = calcularEstatisticas();

  return (
    <Pagina titulo={"Cadastro de Livro"}>
      {/* Dashboard */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Dashboard de Estatísticas</Card.Title>
          <Row>
            <Col>
              <Card.Text>
                <strong>Total de Livros:</strong> {totalLivros}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <strong>Total em Estoque:</strong> {totalEstoque}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <strong>Média de Preço:</strong> R$ {mediaPreco}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Formik
        initialValues={livroEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Título:</Form.Label>
                <Form.Control
                  name="titulo"
                  type="text"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.titulo && !errors.titulo}
                  isInvalid={touched.titulo && errors.titulo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.titulo}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Autor:</Form.Label>
                <Form.Control
                  name="autor"
                  type="text"
                  value={values.autor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.autor && !errors.autor}
                  isInvalid={touched.autor && errors.autor}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.autor}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Ano de Publicação:</Form.Label>
                <Form.Control
                  name="anoPublicacao"
                  type="number"
                  value={values.anoPublicacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.anoPublicacao && !errors.anoPublicacao}
                  isInvalid={touched.anoPublicacao && errors.anoPublicacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.anoPublicacao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Gênero:</Form.Label>
                <Form.Control
                  name="genero"
                  type="text"
                  value={values.genero}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.genero && !errors.genero}
                  isInvalid={touched.genero && errors.genero}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.genero}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  name="preco"
                  type="number"
                  value={values.preco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.preco && !errors.preco}
                  isInvalid={touched.preco && errors.preco}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.preco}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Editora:</Form.Label>
                <Form.Control
                  name="editora"
                  type="text"
                  value={values.editora}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.editora && !errors.editora}
                  isInvalid={touched.editora && errors.editora}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.editora}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Quantidade em Estoque:</Form.Label>
                <Form.Control
                  name="quantidadeEstoque"
                  type="number"
                  value={values.quantidadeEstoque}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.quantidadeEstoque && !errors.quantidadeEstoque
                  }
                  isInvalid={
                    touched.quantidadeEstoque && errors.quantidadeEstoque
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantidadeEstoque}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name="descricao"
                  as="textarea"
                  rows={3}
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricao && !errors.descricao}
                  isInvalid={touched.descricao && errors.descricao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descricao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/livros">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
