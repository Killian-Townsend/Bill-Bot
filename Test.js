const logger = require('./func/logger');
const sleep = require('./func/sleep').sleep;
const color = require('./func/color');


logger.BG('red');
logger.FG('white');
logger.log('Banana');
logger.BG('yellow');
logger.FG('black');
logger.log('Banana', false);
logger.log('Banana', false, "red", "cyan");
logger.log('Banana', false);
sleep(1000);
logger.CBG("red");
console.log('red');
sleep(1000);
logger.CBG("green");
console.log('green');
sleep(1000);
logger.CBG("blue");
console.log('blue');
sleep(1000);

console.log(color.colorNameToHex("navy"));
console.log(color.HEXtoRGB("#4400ff"));
console.log(color.RGBtoHEX(68, 0, 255));

console.log('Terminal size: ' + process.stdout.columns + 'x' + process.stdout.rows);
