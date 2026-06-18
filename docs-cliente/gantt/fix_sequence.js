const fs = require('fs');

function fixImplementationWeeks(content) {
    let newContent = content;

    // 1. >SX<br>
    let headerCount = 7;
    newContent = newContent.replace(/>S\d+<br>/g, (match) => {
        // In devModule, headers are not >SX<br>, they are things like class="wk-s1". Wait, are they >SX<br>?
        // In index.html, dev headers are like: <th class="wk-s1" style="min-width:110px">04–10 May<br><small>...
        // Ah, dev headers don't have S1, they have dates directly!
        // Imp headers have S9<br> (now S7<br>).
        return `>S${headerCount++}<br>`;
    });

    // 2. - SEMANA X:
    let jsCount = 7;
    newContent = newContent.replace(/- SEMANA \d+:/g, (match) => {
        return `- SEMANA ${jsCount++}:`;
    });

    // 3. <td>SX</td>
    let tdCount = 7;
    newContent = newContent.replace(/<td>S\d+<\/td>/g, (match) => {
        return `<td>S${tdCount++}</td>`;
    });

    return newContent;
}

// gantt_implementacion.html
let implHtml = fs.readFileSync('gantt_implementacion.html', 'utf8');
implHtml = fixImplementationWeeks(implHtml);
fs.writeFileSync('gantt_implementacion.html', implHtml);
console.log('Fixed gantt_implementacion.html');

// index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// For index.html, we only want to touch the implementation sections
let startView = indexHtml.indexOf('id="view-implementacion"');
let endView = indexHtml.indexOf('<script>', startView);
if (endView === -1) endView = indexHtml.length;
let viewImplHtml = indexHtml.substring(startView, endView);
viewImplHtml = fixImplementationWeeks(viewImplHtml);
indexHtml = indexHtml.substring(0, startView) + viewImplHtml + indexHtml.substring(endView);

let startJS = indexHtml.indexOf('const impModule');
let endJS = indexHtml.indexOf('})();', startJS);
if (endJS === -1) endJS = indexHtml.length;
let viewImplJS = indexHtml.substring(startJS, endJS);
viewImplJS = fixImplementationWeeks(viewImplJS);
indexHtml = indexHtml.substring(0, startJS) + viewImplJS + indexHtml.substring(endJS);

fs.writeFileSync('index.html', indexHtml);
console.log('Fixed index.html');
