/* eslint-disable import/no-unresolved */
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const camelCaseReq = require('./middlewares/camelCaseReq');
const omitReq = require('./middlewares/omitReq');
const snakeCaseRes = require('./middlewares/snakeCaseRes');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
require('./models');

const { PORT } = require('./configs');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(camelCaseReq);
app.use(omitReq);
app.use(snakeCaseRes());
app.use(express.static(path.join(__dirname, '..', 'public')));

require('./routes')(app);
// Đọc chứng chỉ SSL và khóa riêng tư
// const privateKey = fs.readFileSync(
//   '/home/ec2-user/multichoice-api/server-key.pem',
//   'utf8',
// );
// const certificate = fs.readFileSync(
//   '/home/ec2-user/multichoice-api/server-cert.pem',
//   'utf8',
// );
// const credentials = { key: privateKey, cert: certificate };

app.use(errorHandler);
// Tạo máy chủ HTTPS sử dụng Express
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
