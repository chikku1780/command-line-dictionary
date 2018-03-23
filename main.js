const service = require('./service');
const util = require('./util');

const keywords = {
    DEF: 'def',
    SYN: 'syn',
    ANT: 'ant',
    EX: 'ex',
    DICT: 'dict',
    PLAY: 'play'
};


init();


function init() {
    startProcess();
}

function startProcess() {
    let args = getInformationFromCommandLine();
    if (args.length === 0) {
        getWordOfTheDayInfo(function (result) {
            formatWordOfDayResult(result);
        });
    }
    else {
        if (args.length === 2) {
            let key = args[0];
            let word = args[1];

            switch (key) {
                case keywords.DEF:
                    getWordDefinitions(word, function (definitions) {
                        if (!util.isEmptyArray(definitions)) {
                            util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
                            util.consoleTheWord_Definition(definitions);
                        }
                    });
                    break;
                case keywords.SYN:
                    getWordSynonyms(word, function (data) {
                        if (!util.isEmptyArray(data) && !util.isEmptyArray(data[0].words)) {
                            let synonyms = data[0].words;
                            util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
                            util.consoleTheWord_RelatedWords(service.relatedTypes.SYN, synonyms);
                        }
                    });
                    break;
                case keywords.ANT:
                    getWordSynonyms(word, function (data) {
                        if (!util.isEmptyArray(data) && !util.isEmptyArray(data[0].words)) {
                            let antonyms = data[0].words;
                            util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
                            util.consoleTheWord_RelatedWords(service.relatedTypes.ANT, antonyms);
                        }
                    });
                    break;
                case keywords.EX:
                    getWordExample(word, function (example) {
                        if (!util.isEmptyObject(example)) {
                            util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
                            util.consoleTheWord_Example(example);
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    }
}

function getInformationFromCommandLine() {
    return process.argv.slice(2);
}

function getWordOfTheDayInfo(cb) {
    service.getWordOfTheDay(cb);
}

function formatWordOfDayResult(data) {
    let word = data.word;
    let definitions = data.definitions;
    util.consoleTheWord(util.OUTPUT_FORMAT.tWord, word);
    util.consoleTheWord_Definition(definitions);
}

function formatResult(word) {

}

function getWordDefinitions(word, cb) {
    service.getWordDefinition(word, cb);
}

function getWordSynonyms(word, cb) {
    service.getWordSynonyms(word, cb);
}

function getWordAntonyms(word, cb) {
    service.getWordAntonyms(word, cb);
}

function getWordExample(word, cb) {
    service.getWordExample(word, cb);
}