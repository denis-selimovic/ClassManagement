const mongoose = require('mongoose');
const { getDatabaseUri } = require('./common/config')

mongoose.connect(getDatabaseUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch(e => console.log(e));

module.exports = mongoose.connection;
