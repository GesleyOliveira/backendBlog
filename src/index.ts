// src/index.ts
import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import userRoutes from './routes/user.routes';
import articleRoutes from './routes/article.routes';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conectado ao banco de dados');
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando em http://localhost:3000');
    });
  })
  .catch((error) => console.error('Erro ao conectar com o banco:', error));

// ATENÇÃO: isso deve vir depois do `express.json()`
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
