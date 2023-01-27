import express from 'express';
import fileUpload from 'express-fileupload';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import fruitShopRouter from './fruitShopRouter.js';

const app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

app.use(fileUpload());

app.use('/', fruitShopRouter);

app.listen(3000, () => console.log('Listening on port 3000!'));