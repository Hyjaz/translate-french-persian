import express from 'express'
import favicon from 'static-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes/index'
import cors from 'cors'
import models from './models'

const PORT = 3001;
const app = express();

app.use(cors('*'));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', routes);

models.sequelize.sync().then(() => app.listen(PORT));
console.log('Listening on port:', PORT);

export default app;
