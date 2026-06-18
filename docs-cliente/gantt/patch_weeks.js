const fs = require('fs');

function replaceAll(str, find, replace) {
    return str.split(find).join(replace);
}

function updateImplementationWeeks(content) {
    let newContent = content;
    
    // Order matters, replace 1-8 to 9-16
    for (let i = 1; i <= 8; i++) {
        const newNum = i + 8;
        
        // 1. "SEMANA X"
        newContent = replaceAll(newContent, `SEMANA ${i}`, `SEMANA ${newNum}`);
        
        // 2. ">SX<"
        newContent = replaceAll(newContent, `>S${i}<`, `>S${newNum}<`);
        
        // 3. "<td>SX</td>"
        newContent = replaceAll(newContent, `<td>S${i}</td>`, `<td>S${newNum}</td>`);
        
        // 4. "'SX ·" (for JS tooltips and labels)
        newContent = replaceAll(newContent, `'S${i} ·`, `'S${newNum} ·`);
        
        // 5. ">SX<br>"
        newContent = replaceAll(newContent, `>S${i}<br>`, `>S${newNum}<br>`);
    }

    return newContent;
}

// Update gantt_implementacion.html
let implHtml = fs.readFileSync('gantt_implementacion.html', 'utf8');
implHtml = updateImplementationWeeks(implHtml);
fs.writeFileSync('gantt_implementacion.html', implHtml);
console.log('Updated gantt_implementacion.html');

// Update index.html only for Implementation sections
let indexHtml = fs.readFileSync('index.html', 'utf8');

// The implementation view HTML block starts with id="view-implementacion" and ends with <script>
let startView = indexHtml.indexOf('id="view-implementacion"');
let endView = indexHtml.indexOf('<script>', startView);
let viewImplHtml = indexHtml.substring(startView, endView);
viewImplHtml = updateImplementationWeeks(viewImplHtml);
indexHtml = indexHtml.substring(0, startView) + viewImplHtml + indexHtml.substring(endView);

// The implementation JS block starts with const impModule
let startJS = indexHtml.indexOf('const impModule');
let endJS = indexHtml.indexOf('})();', startJS);
if (endJS === -1) endJS = indexHtml.length; // fallback
let viewImplJS = indexHtml.substring(startJS, endJS);
viewImplJS = updateImplementationWeeks(viewImplJS);
indexHtml = indexHtml.substring(0, startJS) + viewImplJS + indexHtml.substring(endJS);

fs.writeFileSync('index.html', indexHtml);
console.log('Updated index.html');
