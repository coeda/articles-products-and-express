const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const articles = require('./routes/articles.js');
const products = require('./routes/products.js');
const analytics = require('./middleware/analytics.js');
const app = express();
const PORT = 3000;
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'pug');
app.set('views', './templates');
app.use(analytics);
app.use('/articles', articles);
app.use('/products', products);



app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to my Articles and Products',
    items: [{title: 'Articles', urlTitle: 'articles'}, {title: 'Products', urlTitle: 'products'}],
    type: '',
    edit: '',
  });
});

const server = app.listen(PORT, ()=>{
  console.log('server listening on ' + PORT);
});