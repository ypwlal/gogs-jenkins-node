var express = require('express');
var router = express.Router();
var path = require('path');
var requstJenkins = require('./sendJenkins');

var BRANCH = 'refs/heads/release';

const defaultJson = {
    "status": 200,
    "code": 0,
    "message": "success"
}

console.log(456)

console.log(123)

router.post('/gogs-jenkins/*', function(req, res) {

    if (!req.body.payload) {
        return res.json({
                success: false,
                message: 'body is empty.'
            })
    }

    var job = req.query.job;
    var payload = JSON.parse(req.body.payload);
    var headers = req.headers;

    console.log(job);
    console.log(payload.ref)

    if (payload && payload.ref == BRANCH) {

        requstJenkins({job, payload, headers});

        return res.json({
                success: true,
                message: 'job ' + job + ' is executed.'
            })
       
    } else {

        console.log('push to ' + payload.ref)

        return res.json({
            success: true,
            message: "job won't be executed."
        })
    }

    
})
module.exports = router;
