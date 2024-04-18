import { createConnection } from 'mysql';

// Configurações da conexão
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vinielivia1',
  database: 'OnCarDb'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado como ID ' + connection.threadId);
});

// Exportar a conexão para uso em outros arquivos
export default connection;
