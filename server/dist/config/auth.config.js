"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const authConfig = () => ({
    authConfig: {},
    jwt: {
        secret: "my-ultra-sensitive-ultra-strong-secret-hack-it-if-you-can",
        sessionExpiresIn: "24h",
        emailVerificationTokenExpiresIn: "24h"
    }
});
exports.authConfig = authConfig;
//# sourceMappingURL=auth.config.js.map