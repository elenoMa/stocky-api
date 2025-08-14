import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Función para probar la conexión
const testConnection = async () => {
  try {
    console.log('🔍 Intentando conectar a MongoDB...');
    console.log('📡 URI:', process.env.MONGO_URI || 'No configurada');
    
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ Conectado exitosamente a MongoDB Atlas');
    console.log(`🏠 Host: ${conn.connection.host}`);
    console.log(`🗄️ Base de datos: ${conn.connection.name}`);
    console.log(`🔌 Puerto: ${conn.connection.port}`);
    
    // Verificar el estado de la conexión
    console.log(`📊 Estado de la conexión: ${mongoose.connection.readyState}`);
    
    // Cerrar la conexión después de la prueba
    await mongoose.connection.close();
    console.log('👋 Conexión cerrada exitosamente');
    
    // Salir del proceso
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.log('💡 Sugerencia: Verifica que la URI de MongoDB sea correcta y que el servidor esté accesible');
    } else if (error.name === 'MongoParseError') {
      console.log('💡 Sugerencia: Verifica el formato de la URI de MongoDB');
    }
    
    // Salir del proceso con error
    process.exit(1);
  }
};

// Ejecutar la prueba
testConnection();
