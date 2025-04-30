import fastify from "fastify";
import { appRoutes } from "./http/routes";

export const app = fastify();

appRoutes(app);
