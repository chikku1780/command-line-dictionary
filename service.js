const request = require('request');
const async = require('async');

const util = require('./util');

const urls = {
    wordOfDay: function () {
        return 'http://api.wordnik.com:80/v4/words.json/wordOfTheDay/'
    },
    definition: function (word) {
        return 'http://api.wordnik.com:80/v4/word.json/' + word + '/definitions/'
    },
    relatedWords: function (word) {
        return 'http://api.wordnik.com:80/v4/word.json/' + word + '/relatedWords/'
    },
    example: function (word) {
        return 'http://api.wordnik.com:80/v4/word.json/' + word + '/topExample/'
    },
};
const token = 'api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

const service = {};

service.relatedTypes = {
    EQ: 'equivalent',
    SYN: 'synonym',
    ANT: 'antonym'
};

service.getWordOfTheDay = function (cb) {
    let url = this.prepareURL(urls.wordOfDay());
    return makeRequest(url, function (err, resp) {
        cb(resp);
    });
};

service.getWordDefinition = function (word, cb) {
    let params = {};
    params.limit = 10;
    params.includeRelated = true;
    params.useCanonical = false;
    params.includeTags = false;
    let url = this.prepareURL(urls.definition(word), word, params);
    return makeRequest(url, function (err, resp) {
        cb(resp);
    });
};

service.getWordSynonyms = function (word, cb) {
    let params = {};
    params.relationshipTypes = 'synonym';
    params.useCanonical = false;
    params.limitPerRelationshipType = 10;
    let url = this.prepareURL(urls.relatedWords(word), word, params);
    return makeRequest(url, function (err, resp) {
        cb(resp);
    });
};

service.getWordAntonyms = function (word, cb) {
    let params = {};
    params.relationshipTypes = 'antonym';
    params.useCanonical = false;
    params.limitPerRelationshipType = 10;
    let url = this.prepareURL(urls.relatedWords(word), word, params);
    return makeRequest(url, function (err, resp) {
        cb(resp);
    });
};

service.getWordExample = function (word, cb) {
    let params = {};
    params.useCanonical = false;
    let url = this.prepareURL(urls.example(word), word, params);
    return makeRequest(url, function (err, resp) {
        cb(resp);
    });
};

service.prepareURL = function (url, word, params) {
    let paramString = '?';
    if (util.isObject(params)) {
        Object.keys(params).forEach(function (param) {
            paramString += param + '=' + params[param] + '&';
        });
    }
    return url + paramString + token;
};

function makeRequest(apiURL, cb) {
    request(apiURL, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        cb(error, JSON.parse(body));
    });
}

module.exports = service;