'use strict';

import test from 'ava';
import twig from '../';

const parseTwig = (data) => twig.twig({data}).tokens;

test('Test basic logic parse', t => {
    t.deepEqual(parseTwig(`{% set variable = true %}`), [
        {
            type: 'logic',
            token: {
                type: 'Twig.logic.type.set',
                key: 'variable',
                expression: [{ type: 'Twig.expression.type.bool', value: true }]
            }
        }
    ]);
});

test('Test raw parse', t => {
    t.deepEqual(parseTwig(`something raw`), [
        { type: 'raw', value: 'something raw' }
    ]);
});

test('Test comment parse', t => {
    t.deepEqual(parseTwig(`{# a simple comment #}`), [
        { type: 'comment', value: 'a simple comment' }
    ]);
});

test('Include parse with only', t => {
    t.deepEqual(
        parseTwig(
            `{% include "abuses/filters/_prolong.html" with { type: 'ips' } only %}`
        ),
        [
            {
                type: 'logic',
                token: {
                    type: 'Twig.logic.type.include',
                    only: 4,
                    ignoreMissing: false,
                    stack: [
                        {
                            type: 'Twig.expression.type.string',
                            value: 'abuses/filters/_prolong.html'
                        }
                    ],
                    withStack: [
                        {
                            type: 'Twig.expression.type.object.start',
                            value: '{',
                            match: ['{']
                        },
                        {
                            type: 'Twig.expression.type.operator.binary',
                            value: ':',
                            precidence: 16,
                            associativity: 'rightToLeft',
                            operator: ':',
                            key: 'type'
                        },
                        { type: 'Twig.expression.type.string', value: 'ips' },
                        {
                            type: 'Twig.expression.type.object.end',
                            value: '}',
                            match: ['}']
                        }
                    ]
                }
            }
        ]
    );
});

test('Include parse without only', t => {
    t.deepEqual(
        parseTwig(
            `{% include "abuses/filters/_prolong.html" with { type: 'ips' } %}`
        ),
        [
            {
                type: 'logic',
                token: {
                    type: 'Twig.logic.type.include',
                    only: false,
                    ignoreMissing: false,
                    stack: [
                        {
                            type: 'Twig.expression.type.string',
                            value: 'abuses/filters/_prolong.html'
                        }
                    ],
                    withStack: [
                        {
                            type: 'Twig.expression.type.object.start',
                            value: '{',
                            match: ['{']
                        },
                        {
                            type: 'Twig.expression.type.operator.binary',
                            value: ':',
                            precidence: 16,
                            associativity: 'rightToLeft',
                            operator: ':',
                            key: 'type'
                        },
                        { type: 'Twig.expression.type.string', value: 'ips' },
                        {
                            type: 'Twig.expression.type.object.end',
                            value: '}',
                            match: ['}']
                        }
                    ]
                }
            }
        ]
    );
});

test('Escaping backslashe parse', t => {
    t.deepEqual(
        parseTwig(
            `{% include "abuses/filters/_prolong.html" with { type: '\\\\' } %}`
        ),
        [
            {
                type: 'logic',
                token: {
                    type: 'Twig.logic.type.include',
                    only: false,
                    ignoreMissing: false,
                    stack: [
                        {
                            type: 'Twig.expression.type.string',
                            value: 'abuses/filters/_prolong.html'
                        }
                    ],
                    withStack: [
                        {
                            type: 'Twig.expression.type.object.start',
                            value: '{',
                            match: ['{']
                        },
                        {
                            type: 'Twig.expression.type.operator.binary',
                            value: ':',
                            precidence: 16,
                            associativity: 'rightToLeft',
                            operator: ':',
                            key: 'type'
                        },
                        { type: 'Twig.expression.type.string', value: '\\' },
                        {
                            type: 'Twig.expression.type.object.end',
                            value: '}',
                            match: ['}']
                        }
                    ]
                }
            }
        ]
    );
});
