// INCLUIR OU IMPORTAR OS ARQUIVOS E DEPENDÊNCIAS DO EXPRESS
const express = require ('express');
//INCLUIR REQUISISÃO PARA O BANCO DE DADOS
const mongoose = require ('mongoose');

//IMPORTAR O ARQUIVO DO BANCO DE DADOS 'USUÁRIOS', NA PASTA 'MODELS' - FAZ PARTE DO CADASTRO
require('./models/Usuarios');
const Usuarios = mongoose.model('usuarios');

// USAR O ARQUIVO EXPRESS
const app = express();
app.use(express.json());

// CRIANDO CONEXÃO COM O BANCO DE DADOS - celke (nome do banco de dados) e validando a conexão
mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexão realizada com sucesso');
}).catch((erro) => {
  console.log('Conexão Não Realizada' + erro);
});

// FUNÇÃO CADASTRAR
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
})

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


// FUNÇÃO LISTAR USUÁRIO USANDO ALGUM PARAMETRO, NESTE CASO SERÁ O ID 
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


// EXECUTAR O SERVIDOR/INICIAR/FAZER O SERVIDOR 'ESCUTAR' TODAS AS ALTERAÇÕES NA PORTA 8081
app.listen(8081, () =>{
  console.log('Servidor Executando na porta 8081: http://localhost:8081');
});




