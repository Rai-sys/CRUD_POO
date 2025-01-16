// index.js
const { AlunoController } = require("./src/controllers/ControllerAluno");
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController()

//alunos.adicionarAluno('Fulano', 'fulando1@gmail.com', '4002-8922', '1234', 'Moda')
//alunos.adicionarAluno('Bianca Vitoria', 'bianca03@gmail.com', '8776-5421', '111214', 'Engenharia')
alunos.editarAluno('111214', 'Bianca Vivienne', null, null, null)  // null para preservar o dado que nao quero que seja editado

alunos.excluirAluno('20250101');

alunos.listarAluno();