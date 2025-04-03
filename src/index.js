// Como si fuera un import
const app = require('./app');

// Se ejecuta el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});