// ===============================
// ===== RSA MATH FUNCTIONS =====
// ===============================

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function modInverse(e, phi) {
  let [old_r, r] = [phi, e];
  let [old_t, t] = [0, 1];

  while (r !== 0) {
    let quotient = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - quotient * r];
    [old_t, t] = [t, old_t - quotient * t];
  }

  if (old_r !== 1) return null;

  if (old_t < 0) old_t += phi;
  return old_t;
}

function modPow(base, exponent, modulus) {
  let result = 1;
  base = base % modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }

  return result;
}

// ===============================
// ===== RSA LOGIC =====
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const pInput = document.querySelector(".rsa-p");
  const qInput = document.querySelector(".rsa-q");

  const generateBtn = document.querySelector(".rsa-generate");
  const encryptBtn = document.querySelector(".rsa-encrypt");
  const decryptBtn = document.querySelector(".rsa-decrypt");

  const plaintextInput = document.querySelector(".rsa-plaintext");
  const cipherInput = document.querySelector(".rsa-ciphertext-input");

  const nDisplay = document.querySelector(".rsa-n");
  const phiDisplay = document.querySelector(".rsa-phi");
  const eDisplay = document.querySelector(".rsa-e-display");
  const dDisplay = document.querySelector(".rsa-d-display");
  const cipherDisplay = document.querySelector(".rsa-ciphertext");
  const decryptedDisplay = document.querySelector(".rsa-decrypted");

  let n, phi, e, d;

  // ===============================
  // GENERATE KEYS
  // ===============================
  generateBtn.addEventListener("click", () => {
    const p = parseInt(pInput.value);
    const q = parseInt(qInput.value);

    if (!isPrime(p) || !isPrime(q)) {
      alert("p and q must be prime numbers.");
      return;
    }

    n = p * q;
    phi = (p - 1) * (q - 1);

    // Finding e such that 1 < e < phi and gcd(e, phi) = 1
    let foundE = false;
    for (let i = 2; i < phi; i++) {
      if (gcd(i, phi) === 1) {
        e = i;
        foundE = true;
        break;
      }
    }

    if (!foundE) {
      alert("Could not find a valid 'e'. Try different primes.");
      return;
    }

    d = modInverse(e, phi);

    nDisplay.textContent = n;
    phiDisplay.textContent = phi;
    eDisplay.textContent = e;
    dDisplay.textContent = d;

    cipherDisplay.textContent = "-";
    decryptedDisplay.textContent = "-";
  });

  // ===============================
  // ENCRYPT TEXT (Mapping A=0, B=1 for Small Modulus)
  // ===============================
  encryptBtn.addEventListener("click", () => {
    if (!n || !e) {
      alert("Generate keys first.");
      return;
    }

    const text = plaintextInput.value.toUpperCase();
    let encryptedArray = [];

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let valToEncrypt;

      // Map A-Z to 0-25 so it stays smaller than n (modulus)
      if (charCode >= 65 && charCode <= 90) {
        valToEncrypt = charCode - 65;
      } else {
        valToEncrypt = charCode; // Keep other chars as is (though they may break if > n)
      }

      let encryptedChar = modPow(valToEncrypt, e, n);
      encryptedArray.push(encryptedChar);
    }

    cipherDisplay.textContent = encryptedArray.join(" ");
    cipherInput.value = encryptedArray.join(" ");
  });

  // ===============================
  // DECRYPT TEXT
  // ===============================
  decryptBtn.addEventListener("click", () => {
    if (!n || !d) {
      alert("Generate keys first.");
      return;
    }

    // Split by space and filter out any empty strings
    const cipherNumbers = cipherInput.value.trim().split(/\s+/).filter(Boolean);
    let decryptedText = "";

    cipherNumbers.forEach((num) => {
      let decryptedVal = modPow(parseInt(num), d, n);

      // Convert back from 0-25 range to A-Z
      if (decryptedVal >= 0 && decryptedVal <= 25) {
        decryptedText += String.fromCharCode(decryptedVal + 65);
      } else {
        decryptedText += String.fromCharCode(decryptedVal);
      }
    });

    decryptedDisplay.textContent = decryptedText;
  });
});
