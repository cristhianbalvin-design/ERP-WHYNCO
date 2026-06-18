const fs = require('fs');

const files = ['gantt_desarrollo.html', 'gantt_implementacion.html', 'index.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('const sectionWeeks = {};')) {
        console.log(`File ${file} already patched.`);
        return;
    }

    content = content.replace(/let currentSection = null;\s+ROWS\.forEach\(row => \{/g, `let currentSection = null;
            const sectionWeeks = {};
            ROWS.forEach(row => {
                if (row.section) {
                    currentSection = row.section;
                    if (!sectionWeeks[currentSection]) sectionWeeks[currentSection] = [];
                } else if (currentSection && row.weeks) {
                    row.weeks.forEach((w, i) => {
                        if (w) sectionWeeks[currentSection][i] = 1;
                    });
                }
            });
            currentSection = null;
            ROWS.forEach(row => {`);

    content = content.replace(/tr\.innerHTML = `<td colspan="9"><span class="sec-toggle">▾<\/span>\$\{sec\.label\}<\/td>`;/g, 
        `const tdLabel = document.createElement('td');
                    tdLabel.colSpan = 3;
                    tdLabel.innerHTML = \`<span class="sec-toggle">▾</span>\${sec.label}\`;
                    tr.appendChild(tdLabel);
                    const sWeeks = sectionWeeks[row.section] || [];
                    for (let wi = 0; wi < 6; wi++) {
                        const td = document.createElement('td');
                        td.className = 'cell-week ' + WK_CLS[wi];
                        if (sWeeks[wi]) {
                            const bar = document.createElement('span');
                            bar.className = 'bar bar-INTERN';
                            bar.style.opacity = '0.5';
                            td.appendChild(bar);
                        }
                        tr.appendChild(td);
                    }`);

    content = content.replace(/tr\.innerHTML = `<td colspan="11"><span class="sec-toggle">▾<\/span>\$\{sec\.label\}<\/td>`;/g, 
        `const tdLabel = document.createElement('td');
                    tdLabel.colSpan = 3;
                    tdLabel.innerHTML = \`<span class="sec-toggle">▾</span>\${sec.label}\`;
                    tr.appendChild(tdLabel);
                    const sWeeks = sectionWeeks[row.section] || [];
                    for (let wi = 0; wi < 8; wi++) {
                        const td = document.createElement('td');
                        td.className = 'c-wk ' + WK_CLS[wi];
                        if (sWeeks[wi]) {
                            const bar = document.createElement('span');
                            bar.className = 'bar bar-INTERN';
                            bar.style.opacity = '0.5';
                            td.appendChild(bar);
                        }
                        tr.appendChild(td);
                    }`);

    fs.writeFileSync(file, content);
    console.log(`Patched ${file}`);
});
