'use strict';

import test from 'ava';
import twig from '../';

test(t => {
    t.deepEqual(twig(`{% set smth = true %}`), [
        {
            type: 'logic',
            token: {
                type: 'Twig.logic.type.set',
                key: 'smth',
                expression: [{ type: 'Twig.expression.type.bool', value: true }]
            }
        }
    ]);
});
