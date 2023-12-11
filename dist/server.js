import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import Joi from 'joi';
import { getAll, getOneById, createPlanet, updateById, deleteById } from './controllers/planetsController.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const planetSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
});
const validatePlanet = (req, res, next) => {
    const { error } = planetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', validatePlanet, createPlanet);
app.put('/api/planets/:id', validatePlanet, updateById);
app.delete('/api/planets/:id', deleteById);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error!');
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
