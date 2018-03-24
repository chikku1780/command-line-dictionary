const util = {};

util.OUTPUT_FORMAT = {
    yWOrd: 'Your Word is - ',
    tWord: 'Today\'s Word is - ',
};

util.consoleTheWord = function (pre, word) {
    console.log('\n==========================================\n');
    console.log(pre + word + '\n');
};

util.consoleTheEND = function () {
    console.log('\n==========================================\n');
};

util.consoleTheWord_Definition = function (definitions) {
    console.log('Definitions :: ');
    if (!util.isEmptyArray(definitions)) {
        definitions.forEach(function (definition) {
            let pos = definition.partOfSpeech;
            let text = definition.text;
            console.log('\t\t (' + pos + ') - ' + text);
        });
    }
    else {
        console.log('\t\t - ');
    }
};

util.consoleTheWord_RelatedWords = function (type, relatedWords) {
    console.log(util.capitalize(type) + 's :: ');
    if (!util.isEmptyArray(relatedWords)) {
        console.log('\t\t - ' + relatedWords.join());
    }
    else {
        console.log('\t\t - ');
    }
};

util.consoleTheWord_Example = function (example) {
    console.log('Examples :: ');
    if (!util.isEmptyObject(example) && !util.isUndefinedNullEmptyString(example.text)) {
        console.log('\t\t - ' + example.text);
    }
    else {
        console.log('\t\t - ');
    }
};

util.isUndefinedNullEmptyString = function (obj) {
    return obj === undefined || obj === null || obj === '';
};

util.isArray = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !!(typeof obj === 'object' && obj && Object.prototype.toString.call(obj) === '[object Array]');
    }
    return false;
};

util.isObject = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !!(typeof obj === 'object' && obj && Object.prototype.toString.call(obj) === '[object Object]');
    }
    return false;
};

util.isString = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !!(typeof obj === 'string' && obj);
    }
    return false;
};

util.isEmptyArray = function (obj) {
    return util.isArray(obj) && obj.length === 0;
};

util.isEmptyObject = function (obj) {
    return util.isObject(obj) && Object.keys(obj).length === 0;
};

util.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = util;