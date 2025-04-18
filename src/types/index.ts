import { JwtPayload } from 'src/modules/auth/jwt.strategy';

export interface ResponseError {
  statusCode: number;
  message: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export class BooleanResponseType {
  result: Boolean = true;
}
