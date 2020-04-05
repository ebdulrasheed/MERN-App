module.exports = [
    { path: '/api/users', req: require("./user") },
    { path: '/api/auth', req: require("./auth") },
    { path: '/api/profile', req: require("./profile") },
    { path: '/api/post', req: require("./post") }
]