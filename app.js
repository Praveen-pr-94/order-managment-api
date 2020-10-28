const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path :  path.resolve(__dirname, '.env')});    

const MongoConnect = require('./drivers/Db');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false  , limit : '200 kb'}))
app.use(bodyParser.json({limit : '200 kb'}))
app.use('/api/',require('./routes'))
const startserver = async()=>{
    try {
        await MongoConnect();
        const port = process.env.APP_PORT || 4500;
        app.listen(port, () => console.log( `server listening on port : ${port}`));
      }
    catch (error){
      console.error('\x1b[31m',error);
      process.exit(0)
    }
}
startserver()

