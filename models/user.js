/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var userSchema = new Schema({
    groupNumber: String,
    fullName: String,
    emailAddress: String,
    department: String,
    listOfApps: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }]
});

module.exports = mongo.model('User', userSchema);
