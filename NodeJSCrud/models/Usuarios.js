const mongoose = require ('mongoose');

const Usuarios = new mongoose.Schema({
  // CRIAR POSIÇÕES/ ATRIBUSTOS
  nome: {
    type: String,
    required: true
  },
  
  email:{
    type: String,
    required: true
  },   
},
{
  timestamps: true,
});

mongoose.model('usuarios', Usuarios);