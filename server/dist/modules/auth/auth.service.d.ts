import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private userRepo;
    private configService;
    constructor(userRepo: Repository<User>, configService: ConfigService);
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
}
