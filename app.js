const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const searchRoutes = require('./routes/searchRoutes'); 
const paymetRoutes = require('./routes/PaymentRoute'); 

const cors = require('cors');
app.use(cors());

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/products', searchRoutes);
app.use('/api/payment', paymetRoutes);




db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
