import { ValidationError } from "express-validator";
import HttpException from "./HttpException";

interface Options {
  message?: string;
  validationErrors?: ValidationError[];
}

export class BadRequestException extends HttpException {
  constructor(options: Options) {
    super(400, options.message || '', options.validationErrors || []);
  }
}