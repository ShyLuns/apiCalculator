const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

app.use(bodyParser.json());

const operations = {
    suma: (a, b) => a + b,
    resta: (a, b) => a - b,
    multiplicacion: (a, b) => a * b,
    division: (a, b) => (b === 0 ? 
    'No se puede dividir por 0' : a / b), 
}

app.post('/calculadora', (req, res) => {
    const { operation, number1, number2 } = req.body;

    if (typeof number1 !== 'number' || typeof number2 !== 'number') {
        return  res.status(400).json({
                status: 400,
                message: 'numero invalido'
        });
    }

    const operacionSeleccionada = operations[operation];

    if(!operacionSeleccionada) {
        return res.status(400).json({
            status: 400,
            message: 'Solo operaciones validas'
        });
    }

    const resultado = operacionSeleccionada(number1, number2);

    res.json({ status: 200, resultado, message: 'Operacion exitosa'});
});

app.listen(port, () => {
    console.log(`servidor ejecutado con exito en el puerto ${port}`);
})
