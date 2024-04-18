import db from '../Db.js';
import Simulacao from '../models/simulacaoModel.mjs';

const simulacaoController = {
  getAll: (req, res) => {
    db.query('SELECT * FROM Simulacao', (err, rows) => {
      if (err) {
        console.error('Erro ao buscar simulações:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      res.json(rows);
    });
  },

  deleteSimulation: (req, res) => {
    const { id_sim } = req.params;
    db.query('DELETE FROM Simulacao WHERE id_sim = ?', id_sim, (err, result) => {
      if (err) {
        console.error('Erro ao excluir simulação:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Simulação não encontrada.' });
      }
      res.json({ message: 'Simulação excluída com sucesso.' });
    });
  },

  insertSimulation: (req, res) => {
    const { cliente_nome, cliente_email, cliente_cpf , veiculoId } = req.body;
  
    // Verificar se todos os campos necessários estão presentes
    if (!cliente_nome || !cliente_email || !cliente_cpf || !veiculoId) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }
  
    // Verificar se o veículo existe no banco de dados
    db.query('SELECT * FROM Veiculos WHERE id = ?', [veiculoId], (err, rows) => {
      if (err) {
        console.error('Erro ao buscar veículo:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
  
      // Verificar se o veículo foi encontrado
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Veículo não encontrado.' });
      }
  
      // Veículo encontrado, podemos prosseguir com a inserção da simulação
      const veiculoEncontrado = rows[0];
  
      // Calcular a pontuação de crédito, status de aprovação e limite de crédito
      const creditScore = generateCreditScore();
      const { approvalStatus, creditLimit } = analyzeSimulation(creditScore);
  
      // Salvar os resultados da simulação no banco de dados
      db.query('INSERT INTO Simulacao (cliente_nome, cliente_email, cliente_cpf, selected_car, creditScore, approvalStatus, creditLimit) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [cliente_nome, cliente_email, cliente_cpf, veiculoEncontrado.modelo, creditScore, approvalStatus, creditLimit],
        (err, result) => {
          if (err) {
            console.error('Erro ao inserir simulação:', err);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
          }
          const newSimulation = {
            id: result.insertId,
            cliente_nome,
            cliente_email,
            cliente_cpf,
            selected_car: veiculoEncontrado.modelo,
            creditScore,
            approvalStatus,
            creditLimit
          };
          res.status(201).json(newSimulation);
        });
    });
  }
}



// Função para gerar uma pontuação de crédito aleatória
const generateCreditScore = () => {
  return Math.floor(Math.random() * 999) + 1; // Gera um número aleatório de 1 a 999
};

// Função para analisar a simulação com base na pontuação de crédito
const analyzeSimulation = (creditScore) => {
  let approvalStatus;
  let creditLimit;

  if (creditScore >= 1 && creditScore <= 299) {
    approvalStatus = 'Reprovado';
    creditLimit = 0;
  } else if (creditScore >= 300 && creditScore <= 599) {
    approvalStatus = 'Aprovado';
    creditLimit = 0.3; // 70% de entrada, 30% do comprometimento da renda
  } else if (creditScore >= 600 && creditScore <= 799) {
    approvalStatus = 'Aprovado';
    creditLimit = 0.5; // 50% de entrada, 25% do comprometimento da renda
  } else if (creditScore >= 800 && creditScore <= 950) {
    approvalStatus = 'Aprovado';
    creditLimit = 0.7; // 30% de entrada, 20% do comprometimento da renda
  } else if (creditScore >= 951 && creditScore <= 999) {
    approvalStatus = 'Aprovado';
    creditLimit = 1; // 100% de financiamento, taxa zero
  }

  return { approvalStatus, creditLimit };
};

export default simulacaoController;
