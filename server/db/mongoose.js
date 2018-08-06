var mongoose = require('mongoose');


mongoose.Promise = global.Promise
// sets mongoose up to use promises

mongoose.connect(process.env.MONGODB_URI);
// sets up the connection to the database
//This will either connect to the uri given to use through our heroku addon config, or use the local
//database instead

module.exports = {
    mongoose
}