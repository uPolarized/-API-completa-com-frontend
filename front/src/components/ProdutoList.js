import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 24px;
  background: linear-gradient(145deg, #1c1f26, #20242c);
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2rem;
  font-weight: 700;
  color: #c3ffb0;
  text-shadow: 0 0 8px rgba(0, 255, 150, 0.2);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: #f0f0f0;
  background: #292e38;
  border-radius: 12px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background-color: #374151;
`;

const Th = styled.th`
  padding: 16px;
  font-weight: 600;
  text-align: left;
  color: #93c5fd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #2d333d;
  }
  &:hover {
    background: #3b3f49;
  }
`;

const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #444c56;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  background: ${({ variant }) =>
    variant === "edit" ? "#7c3aed" : "#ef4444"};

  &:hover {
    background: ${({ variant }) =>
      variant === "edit" ? "#6b21a8" : "#dc2626"};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #1e293b;
  padding: 30px 20px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  color: #fff;
`;

const ModalButton = styled.button`
  padding: 10px 18px;
  margin: 10px 8px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background: ${({ variant }) =>
    variant === "confirm" ? "#10b981" : "#ef4444"};
  color: #fff;

  &:hover {
    background: ${({ variant }) =>
      variant === "confirm" ? "#059669" : "#dc2626"};
  }
`;

function ProdutoList({ refresh, onEditar }) {
  const [produtos, setProdutos] = useState([]);
  const [produtoExcluir, setProdutoExcluir] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("produtos/");
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao carregar produtos", err);
      }
    })();
  }, [refresh]);

  const handleExcluir = async () => {
    try {
      await api.delete(`produtos/${produtoExcluir.id}/`);
      toast.success("Produto excluído com sucesso!");

      const { data } = await api.get("produtos/");
      setProdutos(data);
      setProdutoExcluir(null);
    } catch (err) {
      toast.error("Erro ao excluir produto!");
      setProdutoExcluir(null);
    }
  };

  return (
    <Container>
      <Title>Lista de Produtos</Title>
      <Table>
        <Thead>
          <Tr>
            <Th>Produto</Th>
            <Th>Preço</Th>
            <Th>Estoque</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <tbody>
          {produtos.map((p) => (
            <Tr key={p.id}>
              <Td>{p.nome}</Td>
              <Td>R$ {p.preco}</Td>
              <Td>{p.estoque}</Td>
              <Td>
                <ActionButton variant="edit" onClick={() => onEditar(p)}>
                  Editar
                </ActionButton>
                <ActionButton
                  variant="delete"
                  onClick={() => setProdutoExcluir(p)}
                >
                  Excluir
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {produtoExcluir && (
        <ModalOverlay>
          <Modal>
            <h3>Confirmar exclusão?</h3>
            <ModalButton variant="confirm" onClick={handleExcluir}>
              Sim
            </ModalButton>
            <ModalButton variant="cancel" onClick={() => setProdutoExcluir(null)}>
              Cancelar
            </ModalButton>
          </Modal>
        </ModalOverlay>
      )}

      <ToastContainer position="top-right" autoClose={4000} />
    </Container>
  );
}

export default ProdutoList;
