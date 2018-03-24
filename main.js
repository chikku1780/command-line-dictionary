const readlineSync = require('readline-sync');

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
const controlWords = {
    quit: 'quit',
    QUIT: 'QUIT'
}


init();


function init() {
    startProcess();
}

function startProcess() {
    let args = getInformationFromCommandLine();
    if (args.length === 0) {
        getWordOfTheDayInfo(function (resp) {
            if (!util.isUndefinedNullEmptyString(resp)) {
                let word = resp.word;
                util.consoleTheWord(util.OUTPUT_FORMAT.tWord, word);
                gerWordCompleteInformation(word, function (data) {
                    formatResult(data);
                });
            }
        });
    }
    else if (args.length === 1) {
        let word = args[0];
        if (word === keywords.PLAY) {
            playWordGame();
        }
        else {
            util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
            gerWordCompleteInformation(word, function (data) {
                formatResult(data);
            });
        }
    }
    else if (args.length === 2) {
        let key = args[0];
        let word = args[1];
        util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
        switch (key) {
            case keywords.DEF:
                getWordDefinitions(word, function (definitions) {
                    util.consoleTheWord_Definition(definitions);
                    util.consoleTheEND();
                });
                break;
            case keywords.SYN:
                getWordSynonyms(word, function (synonyms) {
                    util.consoleTheWord_RelatedWords(service.relatedTypes.SYN, synonyms);
                    util.consoleTheEND();
                });
                break;
            case keywords.ANT:
                getWordAntonyms(word, function (antonyms) {
                    util.consoleTheWord_RelatedWords(service.relatedTypes.ANT, antonyms);
                    util.consoleTheEND();
                });
                break;
            case keywords.EX:
                getWordExamples(word, function (example) {
                    util.consoleTheWord_Example(example);
                    util.consoleTheEND();
                });
                break;
            case keywords.DICT:
                gerWordCompleteInformation(word, function (data) {
                    formatResult(data);
                });
                break;
            default:
                console.log('Wrong Input !!!');
                break;
        }
    }
    else {
        console.log('Wrong Input !!!');
    }
}

function playWordGame() {
    let word = getInformationFromConsole();
    util.consoleTheWord(util.OUTPUT_FORMAT.yWOrd, word);
    gerWordCompleteInformation(word, function (data) {
        formatResult(data);
        playWordGame();
    });
}

function getInformationFromConsole() {
    let input = readlineSync.question('\nEnter word to search - ');
    if (!util.isUndefinedNullEmptyString(input)) {
        if (input === controlWords.quit) {
            exit();
        }
        else {
            return input;
        }
    }
    else {
        console.log('Wrong Input');
        getInformationFromConsole();
    }
}

function getInformationFromCommandLine() {
    return process.argv.slice(2);
}

function formatResult(data) {
    let definitions = data.definitions;
    let synonyms = data.synonyms;
    let antonyms = data.antonyms;
    let examples = data.examples;
    util.consoleTheWord_Definition(definitions);
    util.consoleTheWord_RelatedWords(service.relatedTypes.SYN, synonyms);
    util.consoleTheWord_RelatedWords(service.relatedTypes.ANT, antonyms);
    util.consoleTheWord_Example(examples);
    util.consoleTheEND();
}

function gerWordCompleteInformation(word, cb) {
    let result = {};
    getWordDefinitions(word, function (definitions) {
        result.definitions = definitions;
        getWordRelatedWords(word, function (relatedWords) {
            result.synonyms = relatedWords.synonyms ? relatedWords.synonyms : [];
            result.antonyms = relatedWords.antonyms ? relatedWords.antonyms : [];
            getWordExamples(word, function (examples) {
                result.examples = examples;
                cb(result);
            });
        });
    });
}

function getWordOfTheDayInfo(cb) {
    service.getWordOfTheDay(cb);
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

function getWordRelatedWords(word, cb) {
    service.getWordRelatedWords(word, cb);
}

function getWordExamples(word, cb) {
    service.getWordExamples(word, cb);
}

function formatWordOfDayResult(data) {
    let word = data.word;
    let definitions = data.definitions;
    util.consoleTheWord(util.OUTPUT_FORMAT.tWord, word);
    util.consoleTheWord_Definition(definitions);
    util.consoleTheEND();
}

function exit() {
    console.log('\nThanks for using this tool - Have a good day! \n');
    process.exit(0);
}