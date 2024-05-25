import React, {  useState } from 'react';



const Barra = ({ onChangeCidade, cidade, listaCidades, handleCidades, onChangeCidadeGravada }) => {

  const handleCidade = (e) => {
    onChangeCidade(e.currentTarget.value)
  }

  function handleCidadeGravada(e) {
    onChangeCidadeGravada(e.currentTarget.value)
  }

  return (
    <section className="barra">
      <div className="barra__input">
        <input 
          value={cidade} 
          onChange={handleCidade} 
          placeholder="Digite a cidade" 
          id='cidade'
        />
        <button onClick={handleCidades} id='consultar'>Consultar</button>
        <select onChange={handleCidadeGravada}>
          <option value="escolha">Cidades Consultadas</option>
          {listaCidades ? listaCidades.map((item, index) => (
            <option value={item} key={index}>{item}</option>
          )) : null}
        </select>
      </div>
    </section>
  );
};

export default Barra;
