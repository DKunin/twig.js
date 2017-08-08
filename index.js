'use strict';

const twig = require('./src');

module.exports = function(data) {
    console.log(data);
    return twig.exports.twig({ data }).tokens;
};
