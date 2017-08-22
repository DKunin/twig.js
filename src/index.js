/**
 * Twig.js
 *
 * @copyright 2011-2016 John Roepke and the Twig.js Contributors
 * @license   Available under the BSD 2-Clause License
 * @link      https://github.com/twigjs/twig.js
 */

var Twig = { VERSION: '1.10.6'};

require('./twig.core')(Twig);
require('./twig.expression')(Twig);
require('./twig.filters')(Twig);
require('./twig.functions')(Twig);
require('./twig.lib')(Twig);
require('./twig.logic')(Twig);
require('./twig.parser.source')(Twig);
require('./twig.parser.twig')(Twig);
require('./twig.exports')(Twig);

module.exports = Twig;
