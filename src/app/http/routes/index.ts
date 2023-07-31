import { Router } from "express";
import { movieRouter } from "../Movie/router";


const routes = Router()


routes.use('/movie',movieRouter)

export {routes} 