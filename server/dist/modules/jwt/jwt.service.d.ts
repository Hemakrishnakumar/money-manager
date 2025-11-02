import { JwtService } from '@nestjs/jwt';
export declare class JwtServiceCustom {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    sign(payload: Record<string, any>, expiresIn?: string | number): string;
    verify(token: string): any;
    decode(token: string): any;
}
