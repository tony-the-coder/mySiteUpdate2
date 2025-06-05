// reactland/src/main.tsx
console.log("[MAIN.TSX] TOP OF FILE - SCRIPT HAS STARTED");

function initializeReact() {
  console.log("[MAIN.TSX] initializeReact function called");
  const targetDiv = document.getElementById('simple-react-root'); // Or 'root' or 'react-contact-form-root'
  console.log("[MAIN.TSX] Target div ('simple-react-root'):", targetDiv);

  if (targetDiv) {
    // To further simplify, temporarily comment out createRoot and actual rendering
    // import { createRoot } from 'react-dom/client';
    // import SimpleApp from './simpleTest';
    // createRoot(targetDiv).render(<SimpleApp />);
    console.log("[MAIN.TSX] Found targetDiv, would attempt to render here.");
    targetDiv.innerHTML = "Test content from main.tsx!"; // Direct DOM manipulation for test
  } else {
    console.error("[MAIN.TSX] Target div NOT found.");
  }
}

if (document.readyState === 'loading') {
  console.log("[MAIN.TSX] Document is loading. Adding DOMContentLoaded listener.");
  document.addEventListener('DOMContentLoaded', () => {
    console.log("[MAIN.TSX] DOMContentLoaded event fired.");
    initializeReact();
  });
} else {
  console.log("[MAIN.TSX] Document was already loaded. Calling initializeReact directly.");
  initializeReact();
}

console.log("[MAIN.TSX] BOTTOM OF FILE - SCRIPT HAS FINISHED INITIAL EXECUTION");