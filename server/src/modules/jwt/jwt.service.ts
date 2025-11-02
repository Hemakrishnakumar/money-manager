// src/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtServiceCustom {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Record<string, any>, expiresIn?: string | number) {
    return this.jwtService.sign(payload, {
        expiresIn: (expiresIn || '1d') as JwtSignOptions['expiresIn']
    });
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }
}
