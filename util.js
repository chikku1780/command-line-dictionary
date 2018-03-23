const util = {};

util.OUTPUT_FORMAT = {
    yWOrd: '\n Your Word is - ',
    tWord: '\n Today\'s Word is - ',
};

util.consoleTheWord = function (pre, word) {
    console.log('==========================================');
    console.log(pre + word + '\n');
};

util.consoleTheEND = function () {
    console.log('==========================================');
};

util.consoleTheWord_Definition = function (definitions) {
    if (!util.isEmptyArray(definitions)) {
        console.log('-------- Definitions : START --------');
        definitions.forEach(function (definition) {
            // let seq = definition.sequence;
            let pos = definition.partOfSpeech;
            let text = definition.text;
            // let sourceDictionary = definition.text;
            // console.log(seq + '.');
            console.log('Type : ' + pos);
            console.log('Def : ' + text);
            console.log('----------')
        });
        console.log('-------- Definitions : END --------');
    }
};

util.consoleTheWord_RelatedWords = function (type, relatedWords) {
    if (!util.isEmptyArray(relatedWords)) {
        console.log('-------- ' + util.capitalize(type) + ' : START --------');
        console.log(relatedWords.join());
        console.log('-------- ' + util.capitalize(type) + ' : END --------');
    }
};

util.consoleTheWord_Example = function (example) {
    if (!util.isEmptyObject(example)) {
        console.log('-------- Example : START --------');
        console.log(example.text);
        console.log('-------- Example : END --------');
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