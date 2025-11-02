import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    registerUser(@Body() dto: RegisterDto) {
       return this.authService.register(dto);
    }

    @Post('login')
    loginUser(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('verify-email')
    verifyEmail(@Query('token') token: string) {
       return this.authService.verifyEmail(token);        
    }
}