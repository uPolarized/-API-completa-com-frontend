import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  font-size: 2rem;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background: #f0f0f0;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #fafafa;
  }
  &:hover {
    background: #f5f5f5;
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  background: ${props => props.variant === "edit" ? "#0070f3" : "#d0021b"};

  &:hover {
    background: ${props => props.variant === "edit" ? "#005bd1" : "#a00119"};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.variant === "confirm" ? "#28a745" : "#dc3545"};
  color: white;

  &:hover {
    background: ${props => props.variant === "confirm" ? "#218838" : "#c82333"};
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

      // Atualizar a lista de produtos após a exclusão
      const { data } = await api.get("produtos/");
      setProdutos(data);

      setProdutoExcluir(null); // Fechar modal após exclusão
    } catch (err) {
      toast.error("Erro ao excluir produto!");
      setProdutoExcluir(null); // Fechar modal se ocorrer erro
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
          {produtos.map(p => (
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
                  onClick={() => setProdutoExcluir(p)} // Abre o modal para confirmação
                >
                  Excluir
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de confirmação de exclusão */}
      {produtoExcluir && (
        <ModalOverlay>
          <Modal>
            <h3>Tem certeza que deseja excluir o produto?</h3>
            <ModalButton variant="confirm" onClick={handleExcluir}>
              Sim, Excluir
            </ModalButton>
            <ModalButton variant="cancel" onClick={() => setProdutoExcluir(null)}>
              Cancelar
            </ModalButton>
          </Modal>
        </ModalOverlay>
      )}

      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      /> 
    </Container>
  );
}

export default ProdutoList;
