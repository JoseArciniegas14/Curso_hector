const mongoose = require('mongoose');
const app = require('./app');
const { DB_USER, DB_PASSWORD, DB_HOST, IP_SERVER, API_VERSION } = require('./constants');

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`);
        console.log('Conexión a la base de datos establecida con éxito');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }

    app.listen(PORT, () => {
        console.log('#######################');
        console.log('####### API REST ######');
        console.log('#######################');
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
}

connectDB();
