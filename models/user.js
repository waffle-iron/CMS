/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var userSchema = new Schema({
    employeeid: String,
    name: String,
    mail: String,
    title: String,
    department: String,
    office: String,
    country: String,
    listOfApps: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
    roles : [{
        type: Schema.Types.ObjectId,
    }]
});

module.exports = mongo.model('User', userSchema);
