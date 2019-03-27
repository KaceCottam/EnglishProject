enum TextFlags { 
    Error = 0x1,
    Replace = 0x2,
    Block = 0x4,
    Big = 0x8,
};

function hasFlag(input:any, flag:TextFlags) {
    return (input & flag) === flag;
}

class TextProcessor {
    flag = 0x00;
    process(text: string) : string {
        let output = "";
        for (let i of text) {
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
                    if (hasFlag(this.flag,TextFlags.Error)) {
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
                    output += `">${i}</span>`;
                    break;
            }
        }
        return output;
    }

    clearDiv(target: HTMLDivElement) {
        target.innerHTML = "";
    }

    processToDiv(target: HTMLDivElement, text: string) {
        target.innerHTML += this.process(text);
    }
}