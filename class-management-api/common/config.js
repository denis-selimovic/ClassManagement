const getDatabaseUri = () => {
    return process.env.MONGODB_LOCALHOST;
}

module.exports = {
    getDatabaseUri
}
