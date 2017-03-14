var request = require('superagent');

var endpoint = 'http://192.168.31.112:9999/gogs-webhook/?job=';

function getEndPonit(job) {
    if (!job) {
        throw 'job can not be null/undefined/empty';
    }

    return endpoint + job;
}


function requstJenkins(opts) {
    var _endpoint = getEndPonit(opts.job);
    var payload = opts.payload || {};
    var headers = opts.headers || {};

    return request
            .post(_endpoint)
            .send(payload)
            .set('X-Gogs-Delivery', headers['X-Gogs-Delivery'] || headers['x-gogs-delivery'])
            .set('X-Gogs-Event', headers['X-Gogs-Event'] || headers['x-gogs-event'])
            .end(function(err){
                if (err) {
                    console.log(err)
                    console.log('node request error');
                }
            });

}


module.exports = requstJenkins;