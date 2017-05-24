/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var applicationSchema = new Schema({
    name: String,
    description: String,
    imageUrl: {type: String, default: ''},
    url: String,
    creationDate: {type: Date, default: Date.now},
    exposedTo: {
        sites: [String],
        countries: [String]
    },
    owner: { type: Schema.Types.ObjectId, ref: 'Department'},
    author: { type: Schema.Types.ObjectId, ref: 'User'},

    tags : [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    requirePermission: {type: Boolean, default: false},
    isOnline: {type: Boolean, default: true}
});

module.exports = mongo.model('Application', applicationSchema);