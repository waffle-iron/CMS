/**
 * Created by sghaida on 5/11/2017.
 */

var mongo   = require('mongoose'),
    Schema  = mongo.Schema;

var category = ['company','public'];

var announcementSchema = new Schema({
    title: String,
    body: String,
    category: {type: String, enum:category},
    imageUrl: {type: String, default: ''},
    creationDate: {type: Date, default: Date.now},
    archiveAfter: {type: Number, default: 30},
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    },
    tags : [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    transaction: {
        reason: String,
        isApproved: {type: Boolean, default: false},
        transactionDate: {type: Date, default: Date.now},
        validatedBy: {type: String}gg
    },
    status: {type: String, default: 'Pending'},
    exposedToCountry: {type: Boolean, default: false},
    exposedGlobally: {type: Boolean, default: false}
});

module.exports = mongo.model('Announcement', announcementSchema);
