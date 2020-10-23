const getDatabaseUri = () => {
    return process.env.NODE_ENV ? process.env.MONGODB_HOST : process.env.MONGODB_LOCALHOST;
}

const getJwtSecret = () => {
    return process.env.JWT_SECRET;
}

module.exports = {
    getDatabaseUri,
    getJwtSecret
}
