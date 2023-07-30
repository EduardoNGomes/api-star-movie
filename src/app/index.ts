import express from 'express';
import { router } from './Utils/routeAnnotation.js'
import { env } from '../env/index.js';


const app = express();
const port = 4002;
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server Film Fans is running on port ${env.PORT}`);
})


app.get('/v1/film-fans/check-live', (req, res) => {
    res.send("I'm live and breathing");
})