function verdoppeln(zahl, callback) {
  let result = zahl * 2;
  callback(result);
}
verdoppeln(process.argv[2], function (ergebnis) {
  console.log("Ergebnis: " + ergebnis);
});
