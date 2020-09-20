const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cm-api-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports = mongoose.connection;
