var loki = require('lokijs');
var q = require('q');

// var onDbLoadedListeners = [];

// var dbLoaded = function(db) {
//     return function() {
        
//         console.log('DB Loaded', db);
        
//         var messages = db.getCollection('messages');
//         if(!messages) {
//             db.addCollection('messages');
//         }
        
//         var members = db.getCollection('members');
//         if(!members) {
//             db.addCollection('members');
//         }
//     };
// };

var _Session = function(db, identifier) {
    // Get the collection to store the messages.
    var messages = db.getCollection('messages');
    
    // Get the collection to store the members.
    var members = db.getCollection('members');
    
    var addMember = function(member) {
        members.insert(member);
    };
    
    var getMembers = function() {
        return members.find();
    };
    
    var postMessage = function(message) {
        messages.insert(message);
    };
    
    var getMessages = function() {
        return messages.find();
    };
    
    var save = function(callback) {
        db.saveDatabase(callback);
    };
    
    return {
        _id: identifier,
        addMember: addMember,
        getMembers: getMembers,
        postMessage: postMessage,
        getMessages: getMessages,
        save: save
    };
};

var Session = function(sessionId) {
    // Create a deferred object.
    var deferred = q.defer();
    
    // Create a unique identifier.
    var identifier = sessionId || new Date().getTime();
    
    // Create a DB with the unique identifier.
    var db = new loki(identifier + '-simply-chat.db', {
        autoload: true,
        autoloadCallback: function() {
            // Load the messages collection.
            var messages = db.getCollection('messages');
            
            if(!messages) {
                // Create a collection to store the messages.
                db.addCollection('messages');
            }
            
            // Load the members collection.
            var members = db.getCollection('members');
            
            if(!members) {
                // Create a collection to store the members.
                db.addCollection('members');
            }
            
            // Return something useful.
            deferred.resolve(_Session(db, identifier));
        }
    });
    
    // Return a promise.
    return deferred.promise;
};

module.exports = Session;