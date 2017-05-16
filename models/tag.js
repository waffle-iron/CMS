/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var tagSchema = new Schema({
    name: String,
    description: String,
    color: String
});

module.exports = mongo.model('Tag', tagSchema);