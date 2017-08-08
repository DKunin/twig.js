'use strict';

const twig = require('./src');

module.exports = function(data) {
    return twig.exports.twig({ data }).tokens;
};
