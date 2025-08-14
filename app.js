// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import auth from './src/middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';

// Importar rutas
import productRoutes from './src/routes/products.js';
import movementRoutes from './src/routes/movements.js';
import categoryRoutes from './src/routes/categories.js';
import authRoutes from './src/routes/auth.js';
import usersRoutes from './src/routes/users.js';
import suppliersRouter from './src/routes/suppliers.js';
import tasksRoutes from './src/routes/tasks.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Rutas básicas de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Stocky API is running ✅',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check para Render.com
app.get('/', (req, res) => {
  res.json({ 
    message: 'Stocky API is running',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/products', auth, productRoutes);
app.use('/api/movements', auth, movementRoutes);
app.use('/api/categories', auth, categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/tasks', tasksRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!', error: err.message });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📊 API disponible en /api`);
  console.log(`🔗 MongoDB conectado correctamente`);
});