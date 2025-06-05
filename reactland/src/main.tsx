// C:\Users\tonyt\Desktop\mySite\reactland\src\main.tsx
console.error("THIS IS THE CORRECT MAIN.TSX IN reactland/src/ - VITE ROOT");
alert("CORRECT main.tsx in reactland/src/ IS RUNNING!");

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('simple-react-root') || document.getElementById('root') || document.getElementById('react-contact-form-root');
    if (el) {
        el.innerHTML = "<h1>SUCCESSFULLY LOADED THE CORRECT main.tsx from reactland/src/</h1>";
    } else {
        console.error("Still no target div, but this is the correct main.tsx");
    }
});