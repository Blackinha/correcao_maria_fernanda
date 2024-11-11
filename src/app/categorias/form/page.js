"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function CategoriaFormPage(props) {
  const router = useRouter();
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  const id = props.searchParams.id;
  const categoriaEditada = categorias.find((item) => item.id === id);

  function salvar(dados) {
    if (categoriaEditada) {
      Object.assign(categoriaEditada, dados);
      localStorage.setItem("categorias", JSON.stringify(categorias));
    } else {
      dados.id = v4();
      categorias.push(dados);
      localStorage.setItem("categorias", JSON.stringify(categorias));
    }

    alert("Categoria salva com sucesso!");
    router.push("/categorias");
  }

  const initialValues = {
    nome: "",
    descricao: "",
    status: "",
    autor: "",
    dataCriacao: "",
    imagemCapa: "",
    tipoLivro: "",
    quantidadeLivros: 0,
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    autor: Yup.string().required("Campo obrigatório"),
    dataCriacao: Yup.date().required("Campo obrigatório"),
    imagemCapa: Yup.string()
      .url("Deve ser uma URL válida")
      .required("Campo obrigatório"),
    tipoLivro: Yup.string().required("Campo obrigatório"),
    quantidadeLivros: Yup.number()
      .required("Campo obrigatório")
      .min(0, "Deve ser um número positivo"),
  });

  return (
    <Pagina titulo={"Cadastro de Categoria"}>
      <Formik
        initialValues={categoriaEditada || initialValues}
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
                <Form.Label>Nome da Categoria:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name="descricao"
                  type="text"
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

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Status:</Form.Label>
                <Form.Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.status && !errors.status}
                  isInvalid={touched.status && errors.status}
                >
                  <option value="">Selecione</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
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
                <Form.Label>Data de Criação:</Form.Label>
                <Form.Control
                  name="dataCriacao"
                  type="date"
                  value={values.dataCriacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataCriacao && !errors.dataCriacao}
                  isInvalid={touched.dataCriacao && errors.dataCriacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataCriacao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Imagem da Capa:</Form.Label>
                <Form.Control
                  name="imagemCapa"
                  type="url"
                  value={values.imagemCapa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.imagemCapa && !errors.imagemCapa}
                  isInvalid={touched.imagemCapa && errors.imagemCapa}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imagemCapa}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Tipo de Livro:</Form.Label>
                <Form.Control
                  name="tipoLivro"
                  type="text"
                  value={values.tipoLivro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tipoLivro && !errors.tipoLivro}
                  isInvalid={touched.tipoLivro && errors.tipoLivro}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tipoLivro}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Quantidade de Livros:</Form.Label>
                <Form.Control
                  name="quantidadeLivros"
                  type="number"
                  value={values.quantidadeLivros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quantidadeLivros && !errors.quantidadeLivros}
                  isInvalid={
                    touched.quantidadeLivros && errors.quantidadeLivros
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantidadeLivros}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/categorias">
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
