const fs = require('fs');

const files = ['gantt_desarrollo.html', 'gantt_implementacion.html', 'index.html'];

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');

    // Remove the old attachToggleListener definitions
    c = c.replace(/function attachToggleListener\(\) \{[\s\S]*?\}, 50\);\n        \}/g, '');

    // Now, inside function buildTable() {, let's add the attachment logic using the `tbody` variable that is already there!
    // In buildTable(), there is: const tbody = document.getElementById('ganttBodyDev');
    
    // We can inject the attachment right after tbody.innerHTML = '';
    // Let's replace: `tbody.innerHTML = '';` with `tbody.innerHTML = ''; attachToggleToTable(tbody);`
    
    // First, let's add the function attachToggleToTable right before buildTable
    if (!c.includes('function attachToggleToTable')) {
        c = c.replace(/function buildTable\(\) \{/g, `
        function attachToggleToTable(tbody) {
            setTimeout(() => {
                if (!tbody) return;
                const table = tbody.closest('table');
                if (!table) return;
                const btn = table.querySelector('.js-toggle-all');
                if (btn && !btn.dataset.listenerAttached) {
                    btn.addEventListener('click', toggleAllSections);
                    btn.dataset.listenerAttached = 'true';
                }
            }, 50);
        }

        function buildTable() {`);
    }

    // Now call it right after tbody.innerHTML = '';
    c = c.replace(/tbody\.innerHTML = '';/g, `tbody.innerHTML = '';\n            attachToggleToTable(tbody);`);

    // And remove any old attachToggleListener(); calls at the bottom
    c = c.replace(/attachToggleListener\(\);\n/g, '');

    fs.writeFileSync(file, c);
    console.log(`Patched ${file}`);
});
