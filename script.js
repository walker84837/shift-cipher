function encryptText() {
    function encrypt(text, shift) {
        let encryptedText = "";
        for (let i = 0; i < text.length; i++) {
            let ch = text[i];
            if (isAlpha(ch)) {
                let base = isUpperCase(ch) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
                let encryptedChar = String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
                encryptedText += encryptedChar;
            }
            else {
                encryptedText += ch;
            }
        }
        return encryptedText;
    }
    function isAlpha(ch) {
        return /^[A-Za-z]+$/.test(ch);
    }
    function isUpperCase(ch) {
        return ch === ch.toUpperCase();
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        let form = event.target;
        let textInput = form.elements.namedItem("text");
        let shiftInput = form.elements.namedItem("shift");
        let directionInput = form.elements.namedItem("direction");
        let text = textInput.value;
        let shift = Number(shiftInput.value);
        let direction = directionInput.value;
        let shiftAmount = Math.abs(shift);
        let encryptedText = encrypt(text, direction === "forward" ? shiftAmount : -shiftAmount);
        let resultOutput = document.getElementById("result");
        if (!resultOutput) {
            resultOutput = document.createElement("div");
            resultOutput.id = "result";
            form.appendChild(resultOutput);
        }
        resultOutput.textContent = encryptedText;
    }
    let form = document.getElementById("encrypt-form");
    form.addEventListener("submit", handleFormSubmit);
}
window.addEventListener("DOMContentLoaded", encryptText);
