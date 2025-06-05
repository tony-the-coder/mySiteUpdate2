// reactland/src/main.tsx
console.log("--- MAIN.TSX HAS EXECUTED ---");

alert("MAIN.TSX SCRIPT IS RUNNING!");

document.addEventListener('DOMContentLoaded', () => {
  console.log("--- MAIN.TSX: DOMContentLoaded ---");
  alert("MAIN.TSX: DOMContentLoaded EVENT FIRED!");

  const simpleRoot = document.getElementById('simple-react-root');
  if (simpleRoot) {
    console.log("--- MAIN.TSX: Found simple-react-root ---", simpleRoot);
    simpleRoot.innerHTML = "<h1>React Target Acquired by main.tsx!</h1>";
    alert("MAIN.TSX: simple-react-root found and modified!");
  } else {
    console.error("--- MAIN.TSX: simple-react-root NOT FOUND ---");
    alert("MAIN.TSX: ERROR - simple-react-root NOT FOUND!");
  }
});