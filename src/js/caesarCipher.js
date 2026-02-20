// Select elements
const inputField = document.querySelector(".input-caesar-cipher");
const encryptBtn = document.querySelector(".encrypt-caesar-cipher");
const decryptBtn = document.querySelector(".decrypt-caesar-cipher");
const resultSpan = document.querySelector(".result-caesar-cipher");

// Default shift key (you can change this to input later)
const SHIFT = 3;

/*
  Caesar Cipher Function
  text: string to encrypt/decrypt
  shift: number
*/
function caesarCipher(text, shift) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    // Check if uppercase letter
    if (char >= "A" && char <= "Z") {
      let code = char.charCodeAt(0);
      let newCode = ((((code - 65 + shift) % 26) + 26) % 26) + 65;
      result += String.fromCharCode(newCode);
    }

    // Check if lowercase letter
    else if (char >= "a" && char <= "z") {
      let code = char.charCodeAt(0);
      let newCode = ((((code - 97 + shift) % 26) + 26) % 26) + 97;
      result += String.fromCharCode(newCode);
    }

    // If not letter (space, number, symbol)
    else {
      result += char;
    }
  }

  return result;
}

// Encrypt Button
encryptBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent form reload

  let text = inputField.value;

  if (text.trim() === "") {
    resultSpan.textContent = "Please enter text!";
    return;
  }

  let encrypted = caesarCipher(text, SHIFT);
  resultSpan.textContent = encrypted;
});

// Decrypt Button
decryptBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent form reload

  let text = inputField.value;

  if (text.trim() === "") {
    resultSpan.textContent = "Please enter text!";
    return;
  }

  let decrypted = caesarCipher(text, -SHIFT);
  resultSpan.textContent = decrypted;
});
