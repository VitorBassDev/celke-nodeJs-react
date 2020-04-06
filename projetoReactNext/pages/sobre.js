//ESTA PÁGINA SEGUE O MODELO DE CRIAÇÃO DA PÁGINA 'INDEX.JS'
// IMPOTAR O REACT DO COMPONENTE REACT
import React from 'react';
//IMPORTAR O AXIOS DO COMPORNENTE AXIOS
import axios from 'axios';
// IMPORTAR O HEAD DO COMPONENTE NEXT/HEAD
import Head from 'next/head';

const Sobre = (data) => (
  <div>
    <Head>
      <title> Sobre - Celke </title>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
      <meta name='robots' content='index, fallow'/>
      <meta name='decription' content='Site de Estudos'/>
    </Head>
    <h1> Sobre a Empresa </h1>
    Titulo: {data.response.titulo} <br/>
    Descrição: {data.response.descricao} <br/> <hr/>
  </div>
);

// CONFIGURAR A CONEXÃO COM A API (BACKEND)
Sobre.getInitialProps = async () =>{
  const response = await axios.get(
    'http://localhost:8081/sobre'
  );
  // TESTAR OS DADOS QUE ESTÃO SENDO ENVIADOS
  //console.log(response.data);
  return {response: response.data}
};

export default Sobre;