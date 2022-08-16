require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');



app.use(cors())
app.use(express.json())


app.use("/amazon", require('./routes/amazon'));





app.listen(process.env.PORT, () => {
    console.log('Servidor en el puerto 8080')
})


