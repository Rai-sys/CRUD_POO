// Importações
const { pool } = require("../config/database");
const { Aluno } = require("../models/Aluno");
const { Curso } = require("../models/Curso"); // <== Adicione esta linha

class AlunoController {
    async adicionarAluno(nome, email, telefone, matricula, curso) {
        try {
            const consulta = ` INSERT INTO aluno (nome, email, telefone, matricula, curso)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const valores = [nome, email, telefone, matricula, curso];
            const res = await pool.query(consulta, valores);
            console.log('Dados criados com sucesso!');
            console.table(res.rows[0]);
        } catch (error) {
            console.error("Erro ao criar aluno:", error.message);
        }
    }

    async editarAluno(matricula, novoNome, novoEmail, novoTelefone, novoCurso) {
        try {
            const consulta = `select * from aluno
            where matricula = $1 `
            const valores = [matricula];
            const resposta = await pool.query(consulta, valores);
            if (resposta.rows.length === 0) {
                return console.error("Aluno não encontrado!")
            };
            const consultaEditar = `update aluno set
                            nome = coalesce ($2, nome),   
                            email = coalesce ($3, email),
                            telefone = coalesce ($4, telefone),
                            curso = coalesce ($5, curso)
                                where matricula = $1 returning *`; // coalesce para editar apenas um ou mais dados 
            const dadosEditados = [matricula, novoNome, novoEmail, novoTelefone, novoCurso];
            const resEditar = await pool.query(consultaEditar, dadosEditados);    // <-- para chamar as const
            console.log('Dados editados com sucesso');
            console.table(resEditar.rows[0]);    // <-- imprimir apenas o dado que foi editado
        } catch (error) {
            console.error("Erro ao editar aluno:", error.message);
        }
    }

    async excluirAluno(matricula) {
        try {
            const consulta = `SELECT * FROM aluno WHERE matricula = $1`
            const valores = [matricula];
            const res = await pool.query(consulta, valores);
            if(res.rows.length === 0) {
                return console.error('Aluno não encontrado!')
            };
            const consultaDeletar = `DELETE FROM aluno WHERE matricula = $1`
            const resposta = await pool.query(consultaDeletar, valores);
            console.log('Aluno excluido com sucesso');
            console.table(resposta.rows[0]);
            }
         catch (error) {
            console.error("Erro ao excluir aluno:", error.message);
        }
    }

    async listarAluno() {
        try {
            const consulta = `select aluno.nome, aluno.email, aluno.telefone, aluno.matricula, aluno.curso from aluno`
            const dados = await pool.query(consulta);
            console.table(dados.rows);
        } catch (error) {
            console.error('Erro ao listar alunos!')
        }
    }
}

module.exports = { AlunoController };
