import { AuthService } from "./services/auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(dto: RegisterDto): Promise<{
        message: string;
        user: {
            email: string;
            id: number;
        };
    }>;
    loginUser(dto: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
}
