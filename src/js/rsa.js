// ===============================
// ===== RSA MATH FUNCTIONS (BigInt) =====
// ===============================

function gcd(a, b) {
  while (b !== 0n) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function isPrime(num) {
  if (num <= 1n) return false;
  if (num <= 3n) return true;
  if (num % 2n === 0n || num % 3n === 0n) return false;
  for (let i = 5n; i * i <= num; i += 6n) {
    if (num % i === 0n || num % (i + 2n) === 0n) return false;
  }
  return true;
}

function modInverse(e, phi) {
  let [old_r, r] = [phi, e];
  let [old_t, t] = [0n, 1n];

  while (r !== 0n) {
    let quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_t, t] = [t, old_t - quotient * t];
  }

  if (old_r !== 1n) return null;
  if (old_t < 0n) old_t += phi;
  return old_t;
}

function modPow(base, exponent, modulus) {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent = exponent / 2n;
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
  const pValidation = document.getElementById("p-validation");
  const qValidation = document.getElementById("q-validation");

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

  // --- LIVE VALIDATION ---
  const updateStatus = (input, displayEl) => {
    if (!input.value) {
      displayEl.textContent = "";
      return;
    }
    try {
      const val = BigInt(input.value);
      if (isPrime(val)) {
        displayEl.textContent = "✓ Prime Number";
        displayEl.style.color = "#10b981";
      } else {
        displayEl.textContent = "✗ Not a Prime Number";
        displayEl.style.color = "#dc2626";
      }
    } catch (e) {
      displayEl.textContent = "✗ Invalid Number";
      displayEl.style.color = "#dc2626";
    }
  };

  pInput.addEventListener("input", () => updateStatus(pInput, pValidation));
  qInput.addEventListener("input", () => updateStatus(qInput, qValidation));

  // --- GENERATE KEYS ---
  generateBtn.addEventListener("click", () => {
    try {
      const p = BigInt(pInput.value);
      const q = BigInt(qInput.value);

      if (!isPrime(p) || !isPrime(q)) {
        alert("Both p and q must be prime numbers!");
        return;
      }

      n = p * q;
      phi = (p - 1n) * (q - 1n);

      let foundE = false;
      // Common RSA public exponents
      let candidates = [3n, 17n, 65537n];
      for (let cand of candidates) {
        if (cand < phi && gcd(cand, phi) === 1n) {
          e = cand;
          foundE = true;
          break;
        }
      }

      if (!foundE) {
        for (let i = 2n; i < phi; i++) {
          if (gcd(i, phi) === 1n) {
            e = i;
            foundE = true;
            break;
          }
        }
      }

      d = modInverse(e, phi);

      if (d === null) {
        alert("Failed to calculate d. Try different primes.");
        return;
      }

      nDisplay.textContent = n.toString();
      phiDisplay.textContent = phi.toString();
      eDisplay.textContent = e.toString();
      dDisplay.textContent = d.toString();
    } catch (err) {
      alert("Error: Please enter valid large integers.");
    }
  });

  // --- ENCRYPT ---
  encryptBtn.addEventListener("click", () => {
    if (!n || !e) {
      alert("Generate keys first.");
      return;
    }

    const text = plaintextInput.value.toUpperCase();
    let encryptedArray = [];

    for (let i = 0; i < text.length; i++) {
      let charCode = BigInt(text.charCodeAt(i));
      // Keep mapping A=0 for consistency with your previous request
      let val = charCode >= 65n && charCode <= 90n ? charCode - 65n : charCode;
      encryptedArray.push(modPow(val, e, n).toString());
    }

    cipherDisplay.textContent = encryptedArray.join(" ");
    cipherInput.value = encryptedArray.join(" ");
  });

  // --- DECRYPT ---
  decryptBtn.addEventListener("click", () => {
    if (!n || !d) {
      alert("Generate keys first.");
      return;
    }

    const cipherNumbers = cipherInput.value.trim().split(/\s+/).filter(Boolean);
    let decryptedText = "";

    cipherNumbers.forEach((num) => {
      let decryptedVal = modPow(BigInt(num), d, n);
      // Map back to A-Z
      if (decryptedVal >= 0n && decryptedVal <= 25n) {
        decryptedText += String.fromCharCode(Number(decryptedVal) + 65);
      } else {
        decryptedText += String.fromCharCode(Number(decryptedVal));
      }
    });

    decryptedDisplay.textContent = decryptedText;
  });
});
