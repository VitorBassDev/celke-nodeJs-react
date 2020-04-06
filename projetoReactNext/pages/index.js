// IMPOTAR O REACT DO COMPONENTE REACT
import React from 'react';
//IMPORTAR O AXIOS DO COMPORNENTE AXIOS
import axios from 'axios';
// IMPORTAR O HEAD DO COMPONENTE NEXT/HEAD
import Head from 'next/head';

// FUNÇAO QUER IRÁ RETORNAR A PÁGINA - REINDERIZAR - COM OS DADOS DO USUÁRIOS JÁ CRIADOS
const Home = (data) => (
  <div>
    <Head>
      <title>Home - Celke </title>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
      <meta name='robots' content='index, fallow'/>
      <meta name='decription' content='Site de Estudos'/>
    </Head>
      <h1>Listar Usuários: </h1>
      <ul>
        {data.response.map(usuario =>(
          <li key={usuario._id}>
            Nome: {usuario.nome} <br/>
            E-mail: {usuario.nome} <br/> <hr/>
          </li>  
        ))}
      </ul>
  </div>
);

// CONFIGURAR A CONEXÃO COM A API (BACKEND)
Home.getInitialProps = async () =>{
  var response = await axios.get(
    'http://localhost:8081/usuarios'
  );
  // TESTAR OS DADOS QUE ESTÃO SENDO ENVIADOS
  //console.log(response.data);
  return {response: response.data}
};

// EXPORTAR A FUNÇAO PARA QUE AS OUTRAS PÁGINAS POSSAM UTILIZA-LÁ
export default Home;