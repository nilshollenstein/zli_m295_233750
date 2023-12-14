function simuliereVerzoegerung(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function addiereNachVerzoegerung(a, b, ms) {
  await simuliereVerzoegerung(ms);
  let result = a + b;
  console.log("Das Ergebnis ist: " + result);
}

// Beispielaufruf:
addiereNachVerzoegerung(3, 7, 2000);
