// ===== RSA Math Helper Functions =====

// 1. Greatest Common Divisor (to check if 'e' is valid)
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 2. Modular Inverse (Extended Euclidean Algorithm) to find 'd'
function modInverse(e, phi) {
  let [old_r, r] = [phi, e];
  let [old_t, t] = [0, 1];

  while (r !== 0) {
    let quotient = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - quotient * r];
    [old_t, t] = [t, old_t - quotient * t];
  }

  if (old_t < 0) old_t += phi;
  return old_t;
}

// 3. Modular Exponentiation (to handle large powers)
function modPow(base, exponent, modulus) {
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) result = (result * base) % modulus;
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  return result;
}

// ===== UI Logic =====

document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const pInput = document.querySelector(".rsa-p");
  const qInput = document.querySelector(".rsa-q");
  const eInput = document.querySelector(".rsa-e");
  const messageInput = document.querySelector(".rsa-message");
  const encryptBtn = document.querySelector(".rsa-encrypt");
  const decryptBtn = document.querySelector(".rsa-decrypt");

  // Result Display Selectors
  const nDisplay = document.querySelector(".rsa-n");
  const phiDisplay = document.querySelector(".rsa-phi");
  const dDisplay = document.querySelector(".rsa-d");
  const encryptedDisplay = document.querySelector(".rsa-encrypted");
  const decryptedDisplay = document.querySelector(".rsa-decrypted");

  let currentD = null;
  let currentN = null;

  // Encryption Event
  encryptBtn.addEventListener("click", () => {
    const p = parseInt(pInput.value);
    const q = parseInt(qInput.value);
    const e = parseInt(eInput.value);
    const m = parseInt(messageInput.value);

    // Validation
    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m)) {
      alert("Please enter all values.");
      return;
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
      alert("Public key 'e' must be coprime with φ(n). Try a different 'e'.");
      return;
    }

    if (m >= n) {
      alert("Message must be smaller than n (p * q).");
      return;
    }

    const d = modInverse(e, phi);
    const encrypted = modPow(m, e, n);

    // Update Global State
    currentD = d;
    currentN = n;

    // Update UI
    nDisplay.textContent = n;
    phiDisplay.textContent = phi;
    dDisplay.textContent = d;
    encryptedDisplay.textContent = encrypted;
    decryptedDisplay.textContent = "-"; // Reset decrypted field
  });

  // Decryption Event
  decryptBtn.addEventListener("click", () => {
    const cipherText = parseInt(encryptedDisplay.textContent);

    if (isNaN(cipherText)) {
      alert("Nothing to decrypt! Please encrypt a message first.");
      return;
    }

    const decrypted = modPow(cipherText, currentD, currentN);
    decryptedDisplay.textContent = decrypted;
  });
});
