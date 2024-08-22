import { EventEmitter } from 'events';
import { ValidateEndpoint } from './validate/Validate'
import express from 'express';
import { Config } from '../../lib/Config';
import { RouterPath } from '../../types/RouterPath';
import { RegisterEndpoint } from './Register';
import { LoginEndpoint } from './Login';

export const createAuthEndpoints = (config: Config, emitter: EventEmitter): RouterPath => {
  const endpoints = [
    new ValidateEndpoint(emitter),
    new RegisterEndpoint(emitter),
    new LoginEndpoint(emitter),
  ];
  const router = express.Router();
  endpoints.forEach(endpoint => endpoint.setupEndpoint(router, config));
  return {
    router,
    path: '/auth'
  };
}
