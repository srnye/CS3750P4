const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    stocks: [{
        symbol: { type: String },
        name: { type: String },
        percentage: { type: Number }
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.addStock = function(id, stock, callback)
{
    User.findOne(
    {'_id':id, 
     'stocks': {$elemMatch: {'name':stock.name}}}, function(err, doc)
     {
         if(doc)
         {
             //found
         }
         else
         {
             //not found
             User.findByIdAndUpdate(
                id,
                {$addToSet: {stocks: stock}},
                {safe: true, upsert: true},
                function(err, model) {
                    console.log(err);
                }
            );
         }
     });   
}

module.exports.updateStocks = function(id, s, callback)
{   
    User.findByIdAndUpdate(
    id,
    {$set: {stocks: s}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
    );       
}

module.exports.removeStock = function(id, sym, callback)
{

    User.findByIdAndUpdate(
        id,
        {$pull: {stocks: {'symbol': sym}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
    );
         
 
}