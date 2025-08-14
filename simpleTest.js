import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Prueba simple de conexión
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    console.log(`🏠 Host: ${mongoose.connection.host}`);
    console.log(`🗄️ Base de datos: ${mongoose.connection.name}`);
    
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('👋 Conexión cerrada');
    
    // Salir del proceso
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err.message);
    process.exit(1);
  });
