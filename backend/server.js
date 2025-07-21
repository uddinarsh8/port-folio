const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();

// MongoDB URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/portfolio';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Only one view engine setup with allowInsecurePrototypeAccess
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: false,
    handlebars: allowInsecurePrototypeAccess(handlebars)
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../frontend'));

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));
// app.use('/images', express.static(path.join(__dirname, '../frontend/images')));
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));
app.use('/cv', express.static(path.join(__dirname, '../public')));

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Render homepage
const Achievement = require('./models/Achievement');

app.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find({}).lean(); // ✅ use lean to make plain objects
    res.render('index', { achievements });
   
  } catch (err) {
    res.status(500).send('Error loading homepage');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  
});
