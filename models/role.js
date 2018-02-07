/**
 * Created by sghaida on 5/17/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var roleSchema = new Schema({
    name: String,
    description: String,
    creationDate: {type: Date, default: Date.now},
});

module.exports = mongo.model('Role', roleSchema);
