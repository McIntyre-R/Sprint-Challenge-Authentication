module.exports = {
    jwtSecret: process.env.JWT_SECRET || "keep it secret, keep it safe!",
    PORT: process.env.PORT || 5000
}