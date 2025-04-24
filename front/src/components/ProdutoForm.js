import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import api from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definindo o fundo da página
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #1e1e2f, #21224d);  /* Alterar a cor do fundo aqui */
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #e0e0e0;
  }
`;

const Form = styled.form`
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-width: 520px;
  margin: 60px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e0e0e0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2rem;
  font-weight: 700;
  color: #00ffd5;
  text-shadow: 0 0 5px rgba(0, 255, 213, 0.6);
`;

const Field = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #d1d1d1;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  color: #1e1e1e;
  background: #f2f2f2;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 8px #00ffd5;
    background: #ffffff;
  }
`;

const Submit = styled.button`
  width: 100%;
  padding: 16px;
  background: #00ffd5;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00ccaa;
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function ProdutoForm({ produto, onProdutoAdicionado, setProdutoParaEditar }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setPreco(produto.preco);
      setEstoque(produto.estoque);
    } else {
      setNome("");
      setPreco("");
      setEstoque("");
    }
  }, [produto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = { nome, preco, estoque };

    try {
      if (produto) {
        await api.put(`produtos/${produto.id}/`, dados);
        setProdutoParaEditar(null);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await api.post("produtos/", dados);
        toast.success("Produto adicionado com sucesso!");
      }
      onProdutoAdicionado();
      setNome("");
      setPreco("");
      setEstoque("");
    } catch (err) {
      console.error("Erro ao salvar produto", err);
      toast.error("Erro ao salvar o produto!");
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Adiciona o estilo global para o background */}
      <Form onSubmit={handleSubmit}>
        <Title>{produto ? "Editar Produto" : "Adicionar Produto"}</Title>

        <Field>
          <Label>Nome do produto</Label>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Field>

        <Field>
          <Label>Preço</Label>
          <Input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </Field>

        <Field>
          <Label>Estoque</Label>
          <Input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            required
          />
        </Field>

        <Submit type="submit">
          {produto ? "Atualizar" : "Adicionar"}
        </Submit>
      </Form>

      <ToastContainer />
    </>
  );
}

export default ProdutoForm;
