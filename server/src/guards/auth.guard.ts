// src/auth/guards/jwt.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtServiceCustom } from '../modules/jwt/jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtServiceCustom) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader =
      request.headers['authorization'] || request.headers['cookie'];
    if (!authHeader) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }
    let token;
    console.log(authHeader);
    if (authHeader.includes('bearer') || authHeader.includes('Bearer'))
      token = authHeader.split(' ')[1];
    else if (authHeader.includes('token')) token = authHeader.split('=')[1];
    else throw new UnauthorizedException('Invalid or expired token');
    try {
      const payload = this.jwtService.verify(token);
      request.currentUser = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
