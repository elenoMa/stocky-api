import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Cargar variables de entorno
dotenv.config();

// Importar modelos
import './src/models/User.js';
import './src/models/Category.js';
import './src/models/Supplier.js';
import './src/models/Product.js';
import './src/models/Movement.js';

const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Supplier = mongoose.model('Supplier');
const Product = mongoose.model('Product');
const Movement = mongoose.model('Movement');

// Datos de usuarios
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    role: 'user'
  }
];

// Datos de categorías
const sampleCategories = [
  { name: 'Electrónicos', description: 'Productos electrónicos y tecnología', color: '#3B82F6' },
  { name: 'Ropa', description: 'Vestimenta y accesorios', color: '#EF4444' },
  { name: 'Hogar', description: 'Artículos para el hogar', color: '#10B981' },
  { name: 'Deportes', description: 'Equipamiento deportivo', color: '#F59E0B' },
  { name: 'Libros', description: 'Libros y material educativo', color: '#8B5CF6' }
];

// Datos de proveedores
const sampleSuppliers = [
  {
    name: 'HP Inc.',
    email: 'contacto@hp.com',
    phone: '+1 800-123-4567',
    address: '1501 Page Mill Rd, Palo Alto, CA',
    contactPerson: 'Ana Martínez',
    notes: 'Proveedor principal de laptops',
    active: true
  },
  {
    name: 'Samsung Electronics',
    email: 'ventas@samsung.com',
    phone: '+82 2-2255-0114',
    address: '129 Samsung-ro, Suwon-si, Corea',
    contactPerson: 'Jin Park',
    notes: 'Proveedor de smartphones',
    active: true
  },
  {
    name: 'TextilCorp',
    email: 'info@textilcorp.com',
    phone: '+54 11 5555-1234',
    address: 'Av. Siempre Viva 123, Buenos Aires',
    contactPerson: 'Lucía Gómez',
    notes: '',
    active: true
  },
  {
    name: 'MueblesPro',
    email: 'ventas@mueblespro.com',
    phone: '+34 91 123 4567',
    address: 'Calle Falsa 456, Madrid',
    contactPerson: 'Carlos Ruiz',
    notes: 'Proveedor de muebles',
    active: false
  },
  {
    name: 'DeportesMax',
    email: 'contacto@deportesmax.com',
    phone: '+34 93 987 6543',
    address: 'Carrer Esport 10, Barcelona',
    contactPerson: 'Marta Serra',
    notes: '',
    active: true
  },
  {
    name: 'EditorialTech',
    email: 'editorial@tech.com',
    phone: '+34 91 222 3333',
    address: 'Calle Libros 789, Madrid',
    contactPerson: 'Pedro López',
    notes: 'Editorial de libros técnicos',
    active: true
  }
];

// Datos de productos
const sampleProducts = [
  {
    name: 'Laptop HP Pavilion',
    category: 'Electrónicos',
    stock: 15,
    price: 899.99,
    minStock: 5,
    maxStock: 50,
    supplier: 'HP Inc.',
    sku: 'LAP-HP-001',
    description: 'Laptop de 15 pulgadas con procesador Intel i5'
  },
  {
    name: 'Smartphone Samsung Galaxy',
    category: 'Electrónicos',
    stock: 25,
    price: 699.99,
    minStock: 10,
    maxStock: 100,
    supplier: 'Samsung Electronics',
    sku: 'PHN-SAM-001',
    description: 'Smartphone Android con cámara de 48MP'
  },
  {
    name: 'Camiseta Básica',
    category: 'Ropa',
    stock: 50,
    price: 19.99,
    minStock: 20,
    maxStock: 200,
    supplier: 'TextilCorp',
    sku: 'CAM-BAS-001',
    description: 'Camiseta de algodón 100%'
  },
  {
    name: 'Sofá 3 Plazas',
    category: 'Hogar',
    stock: 8,
    price: 599.99,
    minStock: 2,
    maxStock: 15,
    supplier: 'MueblesPro',
    sku: 'SOF-3PL-001',
    description: 'Sofá moderno de 3 plazas'
  },
  {
    name: 'Balón de Fútbol',
    category: 'Deportes',
    stock: 30,
    price: 29.99,
    minStock: 10,
    maxStock: 100,
    supplier: 'DeportesMax',
    sku: 'BAL-FUT-001',
    description: 'Balón oficial de competición'
  },
  {
    name: 'Libro de Programación',
    category: 'Libros',
    stock: 20,
    price: 49.99,
    minStock: 5,
    maxStock: 50,
    supplier: 'EditorialTech',
    sku: 'LIB-PROG-001',
    description: 'Guía completa de programación web'
  }
];

async function runAllSeeds() {
  try {
    console.log('🚀 Iniciando proceso de seed completo...');
    console.log('📡 Conectando a MongoDB Atlas...');
    
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas');
    
    // 1. CREAR USUARIOS
    console.log('\n👥 Creando usuarios...');
    for (const u of users) {
      const exists = await User.findOne({ username: u.username });
      if (exists) {
        console.log(`   ⏭️  Usuario ${u.username} ya existe, omitiendo.`);
        continue;
      }
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashed });
      console.log(`   ✅ Usuario ${u.username} creado.`);
    }
    
    // 2. CREAR CATEGORÍAS
    console.log('\n📦 Creando categorías...');
    const createdCategories = await Category.insertMany(sampleCategories);
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });
    console.log(`   ✅ ${createdCategories.length} categorías creadas`);
    
    // 3. CREAR PROVEEDORES
    console.log('\n🏢 Creando proveedores...');
    const createdSuppliers = await Supplier.insertMany(sampleSuppliers);
    const supplierMap = {};
    createdSuppliers.forEach(sup => {
      supplierMap[sup.name] = sup._id;
    });
    console.log(`   ✅ ${createdSuppliers.length} proveedores creados`);
    
    // 4. CREAR PRODUCTOS
    console.log('\n📱 Creando productos...');
    const productsToInsert = sampleProducts.map(prod => ({
      ...prod,
      category: categoryMap[prod.category],
      supplier: supplierMap[prod.supplier] || undefined
    }));
    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`   ✅ ${createdProducts.length} productos creados`);
    
    // 5. CREAR MOVIMIENTOS
    console.log('\n🔄 Creando movimientos...');
    const sampleMovements = [
      {
        productId: createdProducts[0]._id,
        productName: createdProducts[0].name,
        category: createdProducts[0].category,
        type: 'entrada',
        quantity: 20,
        previousStock: 0,
        newStock: 20,
        reason: 'Compra inicial',
        user: 'Admin',
        cost: 800.00
      },
      {
        productId: createdProducts[1]._id,
        productName: createdProducts[1].name,
        category: createdProducts[1].category,
        type: 'entrada',
        quantity: 30,
        previousStock: 0,
        newStock: 30,
        reason: 'Compra inicial',
        user: 'Admin',
        cost: 650.00
      },
      {
        productId: createdProducts[0]._id,
        productName: createdProducts[0].name,
        category: createdProducts[0].category,
        type: 'salida',
        quantity: 5,
        previousStock: 20,
        newStock: 15,
        reason: 'Venta',
        user: 'Vendedor1'
      }
    ];
    
    await Movement.insertMany(sampleMovements);
    console.log(`   ✅ ${sampleMovements.length} movimientos creados`);
    
    // RESUMEN FINAL
    console.log('\n🎉 ¡Seed completo ejecutado exitosamente!');
    console.log('\n📊 Resumen final:');
    console.log(`   👥 Usuarios: ${users.length}`);
    console.log(`   📦 Categorías: ${createdCategories.length}`);
    console.log(`   🏢 Proveedores: ${createdSuppliers.length}`);
    console.log(`   📱 Productos: ${createdProducts.length}`);
    console.log(`   🔄 Movimientos: ${sampleMovements.length}`);
    
    console.log('\n🔑 Credenciales de acceso:');
    console.log('   Admin: admin / admin123');
    console.log('   User: user / user123');
    
  } catch (error) {
    console.error('❌ Error durante el proceso de seed:', error);
    if (error && error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Conexión cerrada');
    process.exit(0);
  }
}

// Ejecutar el seed completo
runAllSeeds();
