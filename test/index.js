'use strict';

import test from 'ava';
import twig from '../';

test('Test basic logic parse', t => {
    t.deepEqual(twig(`{% set variable = true %}`), [
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
    t.deepEqual(twig(`something raw`), [
        { type: 'raw', value: 'something raw' }
    ]);
});

test('Test comment parse', t => {
    console.log(JSON.stringify(twig(`asd \n{# @param {int} category_id #}
{# @param {boolean} search_delivery показывает включена ли галочка "с доставкой" при поиске #}`)));
    t.deepEqual(twig(`{# a simple comment #}`), [
        { type: 'comment', value: 'a simple comment' }
    ]);
});