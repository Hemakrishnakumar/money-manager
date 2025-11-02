"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const jwt_service_1 = require("../../jwt/jwt.service");
const mail_service_1 = require("../../mail/mail.service");
let AuthService = class AuthService {
    userRepo;
    configService;
    jwtService;
    mailService;
    constructor(userRepo, configService, jwtService, mailService) {
        this.userRepo = userRepo;
        this.configService = configService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(dto) {
        const { name, email, password } = dto;
        const skipEmailVerification = this.configService.get('SKIP_EMAIL_VERIFICATION') === "true";
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing)
            throw new common_1.ConflictException('Email already exists');
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ email, name, password: hashed, isVerified: skipEmailVerification });
        await this.userRepo.save(user);
        const token = this.jwtService.sign({ id: user.id, email: user.email }, "48h");
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
        const verificationLink = `${frontendUrl}/auth/verify-email?token=${token}`;
        await this.mailService.sendVerificationEmail(user.email, user.name, verificationLink);
        return { message: 'User registered successfully', user: { email: user.email, id: user.id } };
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.userRepo.findOne({ where: { email }, select: ['id', 'email', 'password'] });
        if (!user || !(await bcrypt.compare(password, user.password)))
            throw new common_1.UnauthorizedException("Invalid Credentials");
        return { user: { id: user.id, email: user.email } };
    }
    async verifyEmail(token) {
        if (!token)
            throw new common_1.BadRequestException('please provide the token for verification');
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid or expired verification token');
        }
        const user = await this.userRepo.findOne({ where: { email: payload.email } });
        if (!user)
            throw new common_1.NotFoundException('user is no longer available in the system');
        if (user.isVerified)
            return { message: "user was already verified" };
        user.isVerified = true;
        this.userRepo.save(user);
        return { message: "user verified successfully" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, config_1.ConfigService, jwt_service_1.JwtServiceCustom, mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map