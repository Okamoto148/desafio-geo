import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css'; // Importa o estilo padrão do OpenLayers
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import BarraComponent from './Barra';
import Informacoes from './Informacoes';

const MapComponent = () => {
  const mapRef = useRef(null); // Cria uma referência para o elemento DOM do mapa
  const [cidade, setCidade] = useState('');
  const [cidadeGravada, setCidadeGravada] = useState('');
  const [listaCidades, setListaCidades] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'cbaf0652b9824fc312e10fa742f1bcd9';

  const fetchWeatherData = async () => {
    const novaCidade = cidade ? cidade : 'Campinas';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${novaCidade}&appid=${apiKey}&units=metric&lang=pt`);


    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };

    getWeatherData();
  }, [listaCidades, cidadeGravada]); 

  useEffect(() => {
    if (!weatherData) return;

    let novasCoordenadas = [-45.9009, -23.2237];

    if (weatherData.coord && weatherData.coord.lat !== undefined && weatherData.coord.lon !== undefined) {
      novasCoordenadas = [weatherData.coord.lon, weatherData.coord.lat];
    }

    const coordenadas = fromLonLat(novasCoordenadas);

    const marker = new Feature({
      geometry: new Point(coordenadas),
    });

    const vectorSource = new VectorSource({
      features: [marker],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: coordenadas,
        zoom: 12,
      }),
    });

    return () => map.setTarget(undefined);
  }, [weatherData]); 

  const handleCidades = () => {
    const lista = [...listaCidades, cidade];
    setListaCidades(lista);
  };

  const handleCidadeGravada = (e) => {
    setCidadeGravada(e);
    setCidade(e)
  };

  return (
    <>
      <div ref={mapRef} className="mapa">
        <div className="informacoes">
          <Informacoes cidade={cidade} weatherData={weatherData} listaCidades={listaCidades}/>
        </div>
      </div>
      <BarraComponent onChangeCidade={setCidade} cidade={cidade} handleCidades={handleCidades} listaCidades={listaCidades} onChangeCidadeGravada={handleCidadeGravada}/>
    </>
  );
};

export default MapComponent;
