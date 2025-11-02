"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerConfig = void 0;
const mailerConfig = () => ({
    mail: {
        host: "smtp.gmail.com",
        port: 587,
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
        from: process.env.MAIL_FROM,
    }
});
exports.mailerConfig = mailerConfig;
//# sourceMappingURL=mail.config.js.map