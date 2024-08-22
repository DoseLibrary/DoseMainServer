import { Router } from "express";
import { RouterPath } from "../../types/RouterPath";
import { ListContentServersEndpoint } from "./ListContentServersEndpoint";

export const createContentServerEndpoints = (): RouterPath => {
  const router = Router();
  const endpoints = [
    new ListContentServersEndpoint(),
  ];
  endpoints.forEach(endpoint => endpoint.setupEndpoint(router));
  return {
    router,
    path: '/content-servers'
  };
}