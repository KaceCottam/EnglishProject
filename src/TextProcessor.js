var TextFlags;
(function (TextFlags) {
    TextFlags[TextFlags["Error"] = 1] = "Error";
    TextFlags[TextFlags["Replace"] = 2] = "Replace";
    TextFlags[TextFlags["Block"] = 4] = "Block";
    TextFlags[TextFlags["Big"] = 8] = "Big";
})(TextFlags || (TextFlags = {}));
;
function hasFlag(input, flag) {
    return (input & flag) === flag;
}
var TextProcessor = /** @class */ (function () {
    function TextProcessor() {
        this.flag = 0x00;
    }
    TextProcessor.prototype.process = function (text) {
        var output = "";
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var i = text_1[_i];
            switch (i) {
                case "-":
                    this.flag ^= TextFlags.Error;
                    break;
                case "/":
                    this.flag ^= TextFlags.Replace;
                    break;
                case ":":
                    this.flag ^= TextFlags.Block;
                    break;
                case "^":
                    this.flag ^= TextFlags.Big;
                    break;
                case "\n":
                    output += "</br>";
                    break;
                default:
                    output += '<span class="text';
                    if (hasFlag(this.flag, TextFlags.Error)) {
                        output += " error";
                    }
                    if (hasFlag(this.flag, TextFlags.Replace)) {
                        output += " replace";
                    }
                    if (hasFlag(this.flag, TextFlags.Block)) {
                        output += " block";
                    }
                    if (hasFlag(this.flag, TextFlags.Big)) {
                        output += " big";
                    }
                    output += "\">" + i + "</span>";
                    break;
            }
        }
        return output;
    };
    TextProcessor.prototype.clearDiv = function (target) {
        target.innerHTML = "";
    };
    TextProcessor.prototype.processToDiv = function (target, text) {
        target.innerHTML += this.process(text);
    };
    return TextProcessor;
}());
//# sourceMappingURL=TextProcessor.js.map