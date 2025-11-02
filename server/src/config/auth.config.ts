export const authConfig = ()=> ({
    authConfig: {

    },
    jwt : {
        secret: "my-ultra-sensitive-ultra-strong-secret-hack-it-if-you-can",
        sessionExpiresIn: "24h",
        emailVerificationTokenExpiresIn: "24h"
    }
})