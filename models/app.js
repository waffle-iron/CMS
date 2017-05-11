/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var appSchema = new Schema({
    title: String,
    body: String,
    imageUrl: {type: String, default: ''},
    creationDate: {type: Date, default: Date.now},
    isGlobal: {type: Boolean, default: false},
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        emailAddress: String
    },
    tags : [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
});

module.exports = mongo.model('App', appSchema);