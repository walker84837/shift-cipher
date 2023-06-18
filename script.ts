function encryptText(): void {
  function encrypt(text: string, shift: number): string {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (isAlpha(ch)) {
        const base = isUpperCase(ch) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        const encryptedChar = String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
        encryptedText += encryptedChar;
      } else {
        encryptedText += ch;
      }
    }
    return encryptedText;
  }

  function isAlpha(ch: string): boolean {
    return /^[A-Za-z]+$/.test(ch);
  }

  function isUpperCase(ch: string): boolean {
    return ch === ch.toUpperCase();
  }

  function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const textInput = form.elements.namedItem("text") as HTMLTextAreaElement;
    const shiftInput = form.elements.namedItem("shift") as HTMLInputElement;
    const directionInput = form.elements.namedItem("direction") as HTMLInputElement;

    const text = textInput.value;
    const shift = Number(shiftInput.value);
    const direction = directionInput.value;

    const shiftAmount = Math.abs(shift);
    const encryptedText = encrypt(text, direction === "forward" ? shiftAmount : -shiftAmount);

    let resultOutput = document.getElementById("result");
    if (!resultOutput) {
      resultOutput = document.createElement("div");
      resultOutput.id = "result";
      form.appendChild(resultOutput);
    }

    resultOutput.textContent = encryptedText;
  }

  const form = document.getElementById("encrypt-form") as HTMLFormElement;
  form.addEventListener("submit", handleFormSubmit);
}

window.addEventListener("DOMContentLoaded", encryptText);
