"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const appConfig = () => ({
    app: {
        port: parseInt(process.env.PORT || "3000")
    }
});
exports.appConfig = appConfig;
//# sourceMappingURL=app.config.js.map