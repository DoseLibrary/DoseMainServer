import { NextFunction, Response, Request } from "express";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";
import { Security } from "../lib/security";

const getToken = (req: Request) => {
  if (req.query.token !== undefined) {
    return decodeURIComponent(req.query.token.toString());
  }

  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    throw new NotAuthorizedException();
  }
  const authHeadersSplitted = authHeaders.split(' ');
  if (authHeadersSplitted[0] !== 'Bearer') {
    throw new NotAuthorizedException();
  }
  return decodeURIComponent(authHeadersSplitted[1]);
}

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);
    const decoded = Security.verifyJwt(token);
    res.locals.userId = decoded.userId;
    return next();
  } catch (error) {
    return next(new NotAuthorizedException());
  }
}