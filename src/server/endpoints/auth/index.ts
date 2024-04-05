import { Router } from "express";
import { RouterPath } from "../../types/RouterPath";
import { RegisterEndpoint } from "./RegisterEndpoint";
import { LoginEndpoint } from "./LoginEndpoint";

export const createAuthEndpoints = (): RouterPath => {
  const router = Router();
  const endpoints = [
    new RegisterEndpoint(),
    new LoginEndpoint(),
  ];
  endpoints.forEach(endpoint => endpoint.setupEndpoint(router));
  return {
    router,
    path: '/auth'
  };
}