import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importando o estilo da biblioteca

const Form = styled.form`
  background: rgb(90, 90, 90);
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 8px rgba(0, 112, 243, 0.3);
    outline: none;
  }
`;

const Submit = styled.button`
  width: 100%;
  padding: 14px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #005bd1;
    transform: scale(1.05);
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
        // Editar produto
        await api.put(`produtos/${produto.id}/`, dados);
        setProdutoParaEditar(null);
        toast.success("Produto atualizado com sucesso!");  // Notificação de sucesso
      } else {
        // Adicionar produto
        await api.post("produtos/", dados);
        toast.success("Produto adicionado com sucesso!");  // Notificação de sucesso
      }
      onProdutoAdicionado();
      setNome("");
      setPreco("");
      setEstoque("");
    } catch (err) {
      console.error("Erro ao salvar produto", err);
      toast.error("Erro ao salvar o produto!");  // Notificação de erro
    }
  };

  return (
    <>
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

      <ToastContainer />  {/* Adiciona o container de notificações */}
    </>
  );
}

export default ProdutoForm;
