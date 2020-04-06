// INCLUIR OU IMPORTAR OS ARQUIVOS E DEPENDÊNCIAS DO EXPRESS
const express = require ('express');
//INCLUIR REQUISISÃO PARA O BANCO DE DADOS
const mongoose = require ('mongoose');
// INCLUIR O CORS PARA A COMUNICAÇÃO DESSA API COM OUTRAS 
const cors = require ('cors');


//IMPORTAR O ARQUIVO DO BANCO DE DADOS 'USUÁRIOS', NA PASTA 'MODELS' - FAZ PARTE DO CADASTRO
require('./models/Usuarios');
const Usuarios = mongoose.model('usuarios');

//IMPORTAR O ARQUIVO DO BANCO DE DADOS 'SOBRE', NA PASTA 'MODELS' - FAZ PARTE DO CADASTRO
require('./models/Sobre');
const Sobre = mongoose.model('sobre');

// USAR O ARQUIVO EXPRESS
const app = express();
app.use(express.json());

// USAR O CORS - INSTRUÇÃO DO CORS
app.use( (req, res , next) => {
  // CONFIGURAR URL QUE TERÁ PERMISÃO DE ACESSO - O * INFORMA QUE QUALQUER SISTEMA PODERÁ REALIZAR A CONEXÃO COM ESSA APIS
  res.header("Access-Control-Allow-Origin", "*");
  // CONFIGURAR QUAIS MÉTODOS POSSÚEM PERMISSÃO DE ACESSO
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});
// CRIANDO CONEXÃO COM O BANCO DE DADOS - celke (nome do banco de dados) e validando a conexão
mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexão realizada com sucesso');
}).catch((erro) => {
  console.log('Conexão Não Realizada' + erro);
});

// FUNÇÃO CADASTRAR USUARIO
// ENVIAR DADOS - MÉTODO POST
app.post("/usuarios", (req, res) => {
  Usuarios.create(req.body, (err) =>  {
    // RESPOSTA EM FORMATO JSON    
    if(err) return res.status(400).json({
      error: true,
      message: "Não cadastrado !!"
    })

    return res.json({
      error: false,
      message: "Cadastrado com Sucesso"
    }) 
  });
});

// FUNÇÃO LISTAR
// CRIAR ROTA PARA SERVIDOR - médodo get para enviar, req = Requisição, res = Resposta
app.get("/usuarios", (req, res) => {
  Usuarios.find({}).then((usuarios) =>{
    return res.json(usuarios);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum Usuário Encontrado"
    });   
  });
});


// FUNÇÃO LISTAR USUÁRIO USANDO ALGUM PARAMETRO, NESTE CASO SERÁ O ID - USUÁRIO
// CRIAR ROTA PARA SERVIDOR - médodo get para enviar, req = Requisição, res = Resposta
app.get("/usuarios/:id", (req, res) => {
  Usuarios.findOne({_id: req.params.id}).then((usuario) =>{
    return res.json(usuario);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum Usuário Encontrado"
    });   
  });
});

// FUNÇÃO EDITAR USUÁRIO USANDO ALGUMA PARAMETRO, NESTE CASO SERÁ O ID
// CRIAR ROTA PARA SERVIDOR - médodo get para enviar, req = Requisição, res = Resposta
app.put("/usuarios/:id", (req, res) =>{
  Usuarios.updateOne({_id: req.params.id}, req.body, (err) => {
    if(err) return res.status(400).json({
      error : true, 
      message: "Não Foi possível Editar o Usuário"
    });
    return res.json({
      error: false,
      message: "Usuário Editado com SUCESSO"
    });
  });
});

// FUNÇÃO EXCLUIR USUÁRIO USANDO ALGUMA PARAMETRO, NESTE CASO SERÁ O ID
// CRIAR ROTA PARA SERVIDOR - médodo get para enviar, req = Requisição, res = Resposta
app.delete("/usuarios/:id", (req, res) =>{
  Usuarios.deleteOne({_id: req.params.id}, req.body, (err) => {
    if(err) return res.status(400).json({
      error : true, 
      message: "Não Foi possível EXCLUIR o Usuário"
    });
    return res.json({
      error: false,
      message: "Usuário EXCLUIDO com SUCESSO"
    });
  });
});


// CRUD - SOBRE
// FUNÇÃO CADASTRAR USUARIO
app.post("/sobre", (req, res) => {
  Sobre.create(req.body, (err) =>  {
    // RESPOSTA EM FORMATO JSON    
    if(err) return res.status(400).json({
      error: true,
      message: "Conteúdo não Cadastrado!!"
    })
    return res.json({
      error: false,
      message: "Conteúdo cadastrado com Sucesso"
    }) 
  });
});
// FUNÇÃO LISTAR USUÁRIO USANDO ALGUM PARAMETRO, NESTE CASO SERÁ O ID - USUÁRIO
// CRIAR ROTA PARA SERVIDOR - médodo get para enviar, req = Requisição, res = Resposta
app.get("/sobre", (req, res) => {
  Sobre.findOne({}).then((sobre) =>{
    return res.json(sobre);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum Registro 'Sobre'Encontrado"
    });   
  });
});

// EXECUTAR O SERVIDOR/INICIAR/FAZER O SERVIDOR 'ESCUTAR' TODAS AS ALTERAÇÕES NA PORTA 8081
app.listen(8081, () =>{
  console.log('Servidor Executando na porta 8081: http://localhost:8081');
});




