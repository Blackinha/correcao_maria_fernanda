"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function EmprestimoFormPage(props) {
  const router = useRouter();
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];
  const id = props.searchParams.id;
  const emprestimoEditado = emprestimos.find((item) => item.id === id);

  // Função para salvar os dados
  function salvar(dados) {
    if (emprestimoEditado) {
      Object.assign(emprestimoEditado, dados);
      localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
    } else {
      dados.id = v4();
      emprestimos.push(dados);
      localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
    }

    alert("Empréstimo salvo com sucesso!");
    router.push("/emprestimos");
  }

  // Valores iniciais
  const initialValues = {
    livro: "",
    emprestadoPara: "",
    dataEmprestimo: "",
    dataDevolucao: "",
    status: "",
    descricao: "",
    isbn: "", // ISBN do livro
    observacoes: "", // Observações adicionais
  };

  // Validação
  const validationSchema = Yup.object().shape({
    livro: Yup.string().required("Campo obrigatório"),
    emprestadoPara: Yup.string().required("Campo obrigatório"),
    dataEmprestimo: Yup.date().required("Campo obrigatório"),
    dataDevolucao: Yup.date()
      .min(
        Yup.ref("dataEmprestimo"),
        "A data de devolução não pode ser antes da data de empréstimo"
      )
      .required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    isbn: Yup.string().required("Campo obrigatório"), // Validação para o ISBN
    observacoes: Yup.string(), // Campo para observações
  });

  // Cálculos para o dashboard
  const totalEmprestimos = emprestimos.length;
  const emprestimosEmAndamento = emprestimos.filter(
    (e) => e.status === "Em Andamento"
  ).length;
  const emprestimosDevolvidos = emprestimos.filter(
    (e) => e.status === "Devolvido"
  ).length;

  return (
    <Pagina titulo={"Cadastro de Empréstimo de Livro"}>
      <Row>
        {/* Dashboard */}
        <Col xs={12} md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Dashboard de Empréstimos</Card.Title>
              <Card.Text>
                <strong>Total de Empréstimos:</strong> {totalEmprestimos}
              </Card.Text>
              <Card.Text>
                <strong>Empréstimos em Andamento:</strong>{" "}
                {emprestimosEmAndamento}
              </Card.Text>
              <Card.Text>
                <strong>Empréstimos Devolvidos:</strong> {emprestimosDevolvidos}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulário de Cadastro de Empréstimo */}
        <Col xs={12} md={8}>
          <Formik
            initialValues={emprestimoEditado || initialValues}
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
                    <Form.Label>Título do Livro:</Form.Label>
                    <Form.Control
                      name="livro"
                      type="text"
                      value={values.livro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.livro && !errors.livro}
                      isInvalid={touched.livro && errors.livro}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.livro}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Emprestado Para:</Form.Label>
                    <Form.Control
                      name="emprestadoPara"
                      type="text"
                      value={values.emprestadoPara}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.emprestadoPara && !errors.emprestadoPara}
                      isInvalid={
                        touched.emprestadoPara && errors.emprestadoPara
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emprestadoPara}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Data de Empréstimo:</Form.Label>
                    <Form.Control
                      name="dataEmprestimo"
                      type="date"
                      value={values.dataEmprestimo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataEmprestimo && !errors.dataEmprestimo}
                      isInvalid={
                        touched.dataEmprestimo && errors.dataEmprestimo
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataEmprestimo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Data de Devolução:</Form.Label>
                    <Form.Control
                      name="dataDevolucao"
                      type="date"
                      value={values.dataDevolucao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataDevolucao && !errors.dataDevolucao}
                      isInvalid={touched.dataDevolucao && errors.dataDevolucao}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataDevolucao}
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
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Devolvido">Devolvido</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
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

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>ISBN:</Form.Label>
                    <Form.Control
                      name="isbn"
                      type="text"
                      value={values.isbn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.isbn && !errors.isbn}
                      isInvalid={touched.isbn && errors.isbn}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.isbn}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Observações:</Form.Label>
                    <Form.Control
                      name="observacoes"
                      as="textarea"
                      rows={3}
                      value={values.observacoes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.observacoes && !errors.observacoes}
                      isInvalid={touched.observacoes && errors.observacoes}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.observacoes}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="text-end">
                  <Button className="me-2" href="/emprestimos">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Pagina>
  );
}
