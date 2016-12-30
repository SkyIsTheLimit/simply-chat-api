var Session = require('../db/sessions');

module.exports = function(app) {
    var getMembers = function(req, res) {
        var sessionId = req.params.sessionId;
        
        if(!sessionId) {
            return res.status(404).send('No session selected.');
        }
        
        Session(sessionId).then(function(s) {
            res.json(s.getMembers()); 
        });
    };
    
    var getMessages = function(req, res) {
        var sessionId = req.params.sessionId;
        
        if(!sessionId) {
            return res.status(404).send('No session selected.');
        }
        
        Session(sessionId).then(function(s) {
            res.json(s.getMessages());
        });
    };
    
    var postMessage = function(req, res) {
        var sessionId = req.params.sessionId;
        
        if(!sessionId) {
            return res.status(404).send('No session selected.');
        }
        
        Session(sessionId).then(function(s) {
            s.postMessage(req.body);
            
            s.save(function() {
                res.json({
                    _id: s._id,
                    messages: s.getMessages(),
                    members: s.getMembers()
                })
            })
        });
    };
    
    var createSession = function(req, res) {
        Session().then(function(s) {
            res.json({
                _id: s._id,
                messages: s.getMessages(),
                members: s.getMembers()
            });
        });
    };
    
    var joinSession = function(req, res) {
        var sessionId = req.params.sessionId;
        
        if(!sessionId) {
            return res.status(404).send('No session selected.');
        }
        
        Session(sessionId).then(function(s) {
            s.addMember(req.body);
        
            s.save(function() {
                res.json({
                    _id: s._id,
                    messages: s.getMessages(),
                    members: s.getMembers()
                });
            });
        });
    };
    
    app.get('/api/sessions/:sessionId/members', getMembers);
    app.get('/api/sessions/:sessionId/messages', getMessages);
    app.post('/api/sessions/:sessionId/messages', postMessage);
    app.post('/api/sessions', createSession);
    app.post('/api/sessions/:sessionId/join', joinSession);
};