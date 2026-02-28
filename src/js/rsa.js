// ===============================
// ===== RSA MATH FUNCTIONS =====
// ===============================

// 1. Greatest Common Divisor
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 2. Check if number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// 3. Modular Inverse (Extended Euclidean Algorithm)
function modInverse(e, phi) {
  let [old_r, r] = [phi, e];
  let [old_t, t] = [0, 1];

  while (r !== 0) {
    let quotient = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - quotient * r];
    [old_t, t] = [t, old_t - quotient * t];
  }

  if (old_r !== 1) return null; // No inverse exists

  if (old_t < 0) old_t += phi;
  return old_t;
}

// 4. Fast Modular Exponentiation
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
// ===== UI LOGIC =====
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // Inputs
  const pInput = document.querySelector(".rsa-p");
  const qInput = document.querySelector(".rsa-q");
  const eInput = document.querySelector(".rsa-e");
  const messageInput = document.querySelector(".rsa-message");

  // Buttons
  const encryptBtn = document.querySelector(".rsa-encrypt");
  const decryptBtn = document.querySelector(".rsa-decrypt");

  // Outputs
  const nDisplay = document.querySelector(".rsa-n");
  const phiDisplay = document.querySelector(".rsa-phi");
  const dDisplay = document.querySelector(".rsa-d");
  const encryptedDisplay = document.querySelector(".rsa-encrypted");
  const decryptedDisplay = document.querySelector(".rsa-decrypted");

  let currentD = null;
  let currentN = null;

  // ===============================
  // ENCRYPT
  // ===============================
  encryptBtn.addEventListener("click", () => {
    const p = parseInt(pInput.value);
    const q = parseInt(qInput.value);
    const e = parseInt(eInput.value);
    const m = parseInt(messageInput.value);

    // Basic validation
    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m)) {
      alert("Please enter all values.");
      return;
    }

    if (!isPrime(p) || !isPrime(q)) {
      alert("Both p and q must be prime numbers.");
      return;
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
      alert("Public key 'e' must be coprime with φ(n).");
      return;
    }

    if (m >= n) {
      alert("Message must be smaller than n (p × q).");
      return;
    }

    const d = modInverse(e, phi);

    if (d === null) {
      alert("Could not compute modular inverse. Try different 'e'.");
      return;
    }

    const encrypted = modPow(m, e, n);

    // Save for decryption
    currentD = d;
    currentN = n;

    // Display results
    nDisplay.textContent = n;
    phiDisplay.textContent = phi;
    dDisplay.textContent = d;
    encryptedDisplay.textContent = encrypted;
    decryptedDisplay.textContent = "-";
  });

  // ===============================
  // DECRYPT
  // ===============================
  decryptBtn.addEventListener("click", () => {
    if (currentD === null || currentN === null) {
      alert("Please encrypt a message first.");
      return;
    }

    const cipherText = parseInt(encryptedDisplay.textContent);

    if (isNaN(cipherText)) {
      alert("Nothing to decrypt.");
      return;
    }

    const decrypted = modPow(cipherText, currentD, currentN);
    decryptedDisplay.textContent = decrypted;
  });
});
