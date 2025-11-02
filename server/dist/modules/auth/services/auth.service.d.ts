import { User } from "../../user/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { JwtServiceCustom } from "src/modules/jwt/jwt.service";
import { MailService } from "src/modules/mail/mail.service";
export declare class AuthService {
    private userRepo;
    private configService;
    private jwtService;
    private mailService;
    constructor(userRepo: Repository<User>, configService: ConfigService, jwtService: JwtServiceCustom, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            email: string;
            id: number;
        };
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
}
