import React, {  useEffect, useState } from 'react';

const Informacoes = ({cidade, weatherData,listaCidades}) => {
  const [novoClima, setNovoClima] = useState(false)


  if(weatherData){
    if(weatherData.cod =='400'){
      setNovoClima(true);
    }

  }


  return (
    <div style={{margin: '20px'}}>
      <p>Nome da cidade: {cidade}</p>

      {(weatherData && listaCidades.length>0 && weatherData.cod!='404') ? (
        <>
          <p>Data: {new Date(weatherData.dt * 1000).toLocaleDateString()} </p>
          <p>Tipo de clima: {weatherData.weather.map((item, index) => (
            <span key={index}>{item.description}</span>
          ))} </p>
          <p>Temperatura mínima: {weatherData.main.temp_min} ºC </p>
          <p>Temperatura máxima: {weatherData.main.temp_max} ºC</p>
        </>
      ) : (
        <p style={{color:'red'}}>Dados meteorológicos não disponíveis. Verifique a cidade digitada.</p>
      )}

    </div>
  );
};

export default Informacoes;
