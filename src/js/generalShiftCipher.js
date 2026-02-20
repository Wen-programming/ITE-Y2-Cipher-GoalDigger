// ===============================
// GENERAL SHIFT CIPHER LOGIC
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.querySelector(".input-general-shift-text");
  const keyInput = document.querySelector(".input-general-shift-key");
  const encryptBtn = document.querySelector(".encrypt-general-shift");
  const decryptBtn = document.querySelector(".decrypt-general-shift");
  const result = document.querySelector(".result-general-shift");

  function generalShift(text, shift) {
    let output = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      // Uppercase letters
      if (char >= "A" && char <= "Z") {
        let code = char.charCodeAt(0);
        let newCode = ((((code - 65 + shift) % 26) + 26) % 26) + 65;
        output += String.fromCharCode(newCode);
      }

      // Lowercase letters
      else if (char >= "a" && char <= "z") {
        let code = char.charCodeAt(0);
        let newCode = ((((code - 97 + shift) % 26) + 26) % 26) + 97;
        output += String.fromCharCode(newCode);
      }

      // Other characters
      else {
        output += char;
      }
    }

    return output;
  }

  encryptBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const text = textInput.value;
    const key = parseInt(keyInput.value);

    if (text.trim() === "") {
      result.textContent = "Please enter text!";
      return;
    }

    if (isNaN(key) || key < 1 || key > 25) {
      result.textContent = "Key must be between 1 and 25!";
      return;
    }

    result.textContent = generalShift(text, key);
  });

  decryptBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const text = textInput.value;
    const key = parseInt(keyInput.value);

    if (text.trim() === "") {
      result.textContent = "Please enter text!";
      return;
    }

    if (isNaN(key) || key < 1 || key > 25) {
      result.textContent = "Key must be between 1 and 25!";
      return;
    }

    result.textContent = generalShift(text, -key);
  });
});
