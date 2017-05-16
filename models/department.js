/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var departmentSchema = new Schema({
    name: String,
    description: String,
    picture: String,
});

module.exports = mongo.model('Department', departmentSchema);
