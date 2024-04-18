// veiculosController.mjs
import db from '../Db.js';
import Veiculo from '../models/veiculosModel.mjs';

const veiculosController = {
  getAll: (req, res) => {
    db.query('SELECT * FROM Veiculos', (err, rows) => {
      if (err) {
        console.error('Erro ao buscar veículos:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      res.json(rows);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Veiculos WHERE id = ?', id, (err, rows) => {
      if (err) {
        console.error('Erro ao buscar veículo por ID:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Veículo não encontrado.' });
      }
      res.json(rows[0]);
    });
  },

  create: (req, res) => {
    const { marca, modelo, ano, cor } = req.body;
    const veiculo = new Veiculo(null, marca, modelo, ano, cor); // O ID será gerado automaticamente no banco de dados
    db.query('INSERT INTO Veiculos SET ?', veiculo, (err, result) => {
      if (err) {
        console.error('Erro ao inserir veículo:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      veiculo.id = result.insertId;
      res.status(201).json(veiculo);
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, cor } = req.body;
    db.query('UPDATE Veiculos SET marca = ?, modelo = ?, ano = ?, cor = ? WHERE id = ?', [marca, modelo, ano, cor ,id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar veículo:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Veículo não encontrado.' });
      }
      res.json({ message: 'Veículo atualizado com sucesso.' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Veiculos WHERE id = ?', id, (err, result) => {
      if (err) {
        console.error('Erro ao excluir veículo:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Veículo não encontrado.' });
      }
      res.json({ message: 'Veículo excluído com sucesso.' });
    });
  }
};

export default veiculosController;
