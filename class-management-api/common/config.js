const getDatabaseUri = () => {
    return process.env.MONGODB_LOCALHOST;
}

const getJwtSecret = () => {
    return process.env.JWT_SECRET;
}

module.exports = {
    getDatabaseUri,
    getJwtSecret
}
