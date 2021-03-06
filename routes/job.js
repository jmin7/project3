var express = require('express');
var router = express.Router();
var request = require('request');

var Job = require('../models/job');

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/jobs', authenticate, function(req, res) {
    Job.find({user: req.user})
        .then(function(jobs) {
            res.json(jobs);
        });
});

router.get('/jobs/:id', authenticate, function(req, res) {
    Job.findById(req.params.id)
        .then(function(job) {
            res.json(job);
        });
});

router.put('/jobs/:id', authenticate, function(req, res) {
    console.log('edit route called.');
});


router.post('/jobs', authenticate, function(req, res) {
    var thisJob = new Job({
        user: currentUser._id,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        formattedLocation: req.body.formattedLocation,
        snippet: req.body.snippet,
        date: req.body.date
    });
    console.log('this job: ', thisJob);
    Job.create(thisJob);
});



router.get('/results', authenticate, function(req, res) {
    request('https://api.indeed.com/ads/apisearch?publisher=9447015102421242&q=developer&l=atlanta&sort=date&radius=&st=&jt=&start=&limit=25&fromage=30&filter=&latlong=&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json',
    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var resultsAsJSON = JSON.parse(body);
            console.log('THIS IS HERE: ', resultsAsJSON);
            res.json(resultsAsJSON);
        }
    });
});

router.delete('/jobs/:id', authenticate, function(req, res) {
    console.log('FOUND JOB TO DELETE: ', req.params.id);

    Job.findById(req.params.id)
        .then(function(job) {
            return Job.remove(job);
    });
});

module.exports = router;