var Session = require('../db/sessions');

module.exports = function(app) {
    app.get('/api/session/:sessionId/members', function(req, res) {
        var sessionId = req.params.sessionId;
        
        if(!sessionId) {
            return res.status(404).send('No session selected.');
        }
        
        Session(sessionId).then(function(s) {
            res.json(s.getMembers()); 
        });
    });
    
    app.get('/api/session/:sessionId/messages', function(req, res) {
        var sessionId = req.params.sessionId;
        
        if(!sessionId) {
            return res.status(404).send('No session selected.');
        }
        
        Session(sessionId).then(function(s) {
            res.json(s.getMessages());
        });
    });
    
    app.post('/api/session/:sessionId/messages', function(req, res) {
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
    });
    
    app.post('/api/create', function(req, res) {
        Session().then(function(s) {
            res.json({
                _id: s._id,
                messages: s.getMessages(),
                members: s.getMembers()
            });
        });
    });
    
    app.post('/api/join/:sessionId', function(req, res) {
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
    });
};