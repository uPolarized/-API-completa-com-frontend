import React, { useState } from "react";
import api from "./service/api";
import ProdutoForm from "./components/ProdutoForm";
import ProdutoList from "./components/ProdutoList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  const atualizarLista = () => {
    setRefresh(prev => !prev);
    setProdutoParaEditar(null);
  };

  const handleEditar = produto => {
    setProdutoParaEditar(produto);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`produtos/${id}/`);
      atualizarLista();
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      {/* Sem título duplicado: ProdutoList exibe o header */}
      <ProdutoForm
        produto={produtoParaEditar}
        onProdutoAdicionado={atualizarLista}
        setProdutoParaEditar={setProdutoParaEditar}
      />
      <ProdutoList
        refresh={refresh}
        onEditar={handleEditar}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
