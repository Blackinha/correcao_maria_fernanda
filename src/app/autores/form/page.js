"use client";

import Pagina from "@/components/Pagina";
import apiLocalidades from "@/services/apiLocalidades";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function AutorFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Criar estados(react) para armazenar os dados dos selects
  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  // Buscar a lista de autores no localStorage, se não existir, inicializa uma lista vazia
  const autores = JSON.parse(localStorage.getItem("autores")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista o autor com o ID recebido no parametro
  const autorEditado = autores.find((item) => item.id == id);
  console.log(autorEditado);

  // carregar os dados na inicialização da página
  useEffect(() => {
    // buscar os paises da api, imprimi no log e guarda no armazenamento
    apiLocalidades.get("/paises").then((response) => {
      console.log("paises >>> ", response.data);
      setPaises(response.data);
    });

    apiLocalidades.get("estados?orderBy=nome").then((response) => {
      console.log("estados >>> ", response.data);
      setEstados(response.data);
    });
  }, []);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se autorEditado existe, mudar os dados e gravar no localStorage
    if (autorEditado) {
      Object.assign(autorEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("autores", JSON.stringify(autores));
    } else {
      // se autorEditado não existe, é criação de um novo
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona o novo autor na lista de autores
      autores.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("autores", JSON.stringify(autores));
    }

    alert("Autor salvo com sucesso!");
    router.push("/autores");
  }

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    pais: "Brasil",
    estado: "",
    cidade: "",
    biografia: "",
    dataNascimento: "",
    email: "",
    genero: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string(),
    cidade: Yup.string(),
    biografia: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório").nullable(),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    genero: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Autor"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados do autorEditado
        // Se for novo, colocar o initialValues com os valores vazios
        initialValues={autorEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            useEffect(() => {
              console.log("Mexeu no estado >>>");
              if (values.estado !== "") {
                apiLocalidades
                  .get(`/estados/${values.estado}/municipios`)
                  .then((response) => {
                    console.log("cidades >>>", response.data);
                    setCidades(response.data);
                  });
              }
            }, [values.estado]);

            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
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
                    <Form.Label>Biografia:</Form.Label>
                    <Form.Control
                      name="biografia"
                      as="textarea"
                      rows={4}
                      value={values.biografia}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.biografia && !errors.biografia}
                      isInvalid={touched.biografia && errors.biografia}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.biografia}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                      name="dataNascimento"
                      type="date"
                      value={values.dataNascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataNascimento && !errors.dataNascimento}
                      isInvalid={
                        touched.dataNascimento && errors.dataNascimento
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataNascimento}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Gênero:</Form.Label>
                    <Form.Select
                      name="genero"
                      value={values.genero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.genero && !errors.genero}
                      isInvalid={touched.genero && errors.genero}
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.genero}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Pais:</Form.Label>
                    <Form.Select
                      name="pais"
                      value={values.pais}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.pais && !errors.pais}
                      isInvalid={touched.pais && errors.pais}
                    >
                      <option value="">Selecione</option>
                      {paises.map((pais) => (
                        <option value={pais.nome}>{pais.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.pais}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Estado:</Form.Label>
                    <Form.Select
                      name="estado"
                      value={values.estado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.pais !== "Brasil"}
                      isValid={touched.estado && !errors.estado}
                      isInvalid={touched.estado && errors.estado}
                    >
                      <option value="">Selecione</option>
                      {estados.map((estado) => (
                        <option value={estado.sigla}>{estado.sigla}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.estado}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Select
                      name="cidade"
                      value={values.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.pais !== "Brasil"}
                      isValid={touched.cidade && !errors.cidade}
                      isInvalid={touched.cidade && errors.cidade}
                    >
                      <option value="">Selecione</option>
                      {cidades.map((cidade) => (
                        <option value={cidade.nome}>{cidade.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.cidade}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/autores">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}
