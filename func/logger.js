// Imports
const Colors = require('colors');
const Config = require('../config.json');
const Color = require('./color');

// Vars
let BgColor = "black";
let LogColor = "white";




/**
 * Logs Default Log to Console
 * @param {String} text - Text to Output
 * @param {Boolean} [bool=True] - Sets weather to add Pre-Text info or not
 * @param {String} [fg=LogColor] - Can set FG Color for this line only
 * @param {String} [bg=BgColor] - Can set BG Color for this line only
 * @function
 */
function log (text, bool, fg, bg) {
    let ret = text;
    let oFG, oBG;
    if (bool === undefined) bool = true;
    if (bool) ret = `${curDate()} - [ LOG ]  - ${text}`;
    if (fg) { oFG = LogColor; FG(fg); }
    if (bg) { oBG = BgColor;  BG(bg); }
    console.log(addFG(addBG(ret)));
    if (fg) LogColor = oFG;
    if (bg) BgColor = oBG;
}


/**
 * Logs Info to Console
 * @param {String} text - Text to Output
 * @function
 */
function info (text) {
    text = `${curDate()} - [ WARN ] - ${text}`;
    let tc = Colors.yellow(text);
    if (BgColor === "yellow")
        tc = Colors.magenta(text);
    tc = addBG(tc);
    console.log(tc);
}


/**
 * Logs Error to Console
 * @param {String, Error} input - Text or Error Object
 * @function
 */
function error (input) {

}


/**
 * Clears Screen
 * @function
 */
function clear () {
    console.clear()
}

/**
 * Sets Console Background Color
 * @param {String} name - Color Name
 * @function
 */
function BG (name) {
    BgColor = colorSwitch(name, 0);
}


/**
 * Sets Console Text Color
 * @param {String} name - Color Name
 * @function
 */
function FG (name) {
    LogColor = colorSwitch(name, 1);
}


/**
 * Sets entire terminal color
 * @param {String} [color=null] - Standard HTML Color Name
 * @param {Number} [r=null] - Red
 * @param {Number} [g=null] - Green
 * @param {Number} [b=null] - Blue
 * @function
 */
function CBG (color, r, g, b) {
    let hex;
    if(color !== undefined) hex = Color.colorNameToHex(color);
    else if ((r&&g&&b)!==undefined) hex = Color.RGBtoHEX(r,g,b);
    else hex = Color.colorNameToHex(BgColor);
    let child_process = require('child_process');
    let cmd = `printf %b '\\e]11;${hex}\\a'`
    console.log(cmd);
    try {
        child_process.execSync(cmd);
    } catch (error) {
        console.log(error.message);
    }
}


/**
 * Check if passed color name was valid
 * @param {String} name - Input
 * @param {Number} mode - Foreground or Background
 * @returns {String}
 * @function
 */
function colorSwitch (name, mode) {
    try {

        name = name.toLowerCase();

        switch (name) {
            case "blue":
                return name;
            case "cyan":
                return name;
            case "green":
                return name;
            case "magenta":
                return name;
            case "red":
                return name;
            case "black":
                return name;
            case "white":
                return name;
            case "yellow":
                return name;
            case ("gray" || "grey"):
                if (mode === 1)
                    return name;
                else
                    return "black";
            default:
                return "black";
        }

    } catch (err) {
        Error(err);
    }

}


/**
 * Returns Current time as HH:MM:SS
 * @returns {String}
 * @function
 */
function curDate() {
    function addZero (i) {
        if (i < 10) {
            i = "0" + i
        }
        return i;
    }

    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());
    return `${h}:${m}:${s}`;
}


/**
 * Adds Background Color to Text
 * @param {String} text
 * @returns {String}
 * @function
 */
function addBG (text) {
    try {
        name = BgColor;
        switch (name) {
            case "blue":
                return Colors.bgBlue(text);
            case "cyan":
                return Colors.bgCyan(text);
            case "green":
                return Colors.bgGreen(text);
            case "magenta":
                return Colors.bgMagenta(text);
            case "red":
                return Colors.bgRed(text);
            case "black":
                return Colors.bgBlack(text);
            case "white":
                return Colors.bgWhite(text);
            case "yellow":
                return Colors.bgYellow(text);
            default:
                return Colors.bgBlack(text);
        }
    } catch (err) {
        error(err);
    }
}


/**
 * Adds Foreground Color to Text
 * @param {String} text
 * @returns {String}
 * @function
 */
function addFG (text) {
    try {
        name = LogColor;
        switch (name) {
            case "blue":
                return Colors.blue(text);
            case "cyan":
                return Colors.cyan(text);
            case "green":
                return Colors.green(text);
            case "magenta":
                return Colors.magenta(text);
            case "red":
                return Colors.red(text);
            case "black":
                return Colors.black(text);
            case "white":
                return Colors.white(text);
            case "yellow":
                return Colors.yellow(text);
            case ("gray" || "grey"):
                return Colors.grey(text);
            default:
                return Colors.black(text);
        }
    } catch (err) {
        error(err);
    }
}




// Export Functions
module.exports = { log, info, error, clear, BG, FG, CBG };