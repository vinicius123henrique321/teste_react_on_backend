import express from 'express';
import veiculoRoutes from './router/veiculosRoutes.mjs';
import simulacaoRoutes from './router/simulacaoRoutes.mjs';
import cors from 'cors';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*', // Permitir solicitações de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos HTTP especificados
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos especificados
}));

app.use(express.json());

// Rotas
app.use('/veiculos', veiculoRoutes);
app.use('/simulacao', simulacaoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
