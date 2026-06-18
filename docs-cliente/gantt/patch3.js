const fs = require('fs');

const files = ['gantt_desarrollo.html', 'gantt_implementacion.html', 'index.html'];

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');

    // Remove onclick and add js-toggle-all class
    c = c.replace(/class="th-info"(.*?)onclick="toggleAllSections\(\)"/g, 'class="th-info js-toggle-all"$1');
    c = c.replace(/class="th-fixed"(.*?)onclick="toggleAllSections\(\)"/g, 'class="th-fixed js-toggle-all"$1');
    
    // In case the script was already run and added class="js-toggle-all" as a second attribute (fallback cleanup)
    c = c.replace(/class="th-info"(.*?)class="js-toggle-all"/g, 'class="th-info js-toggle-all"$1');
    c = c.replace(/class="th-fixed"(.*?)class="js-toggle-all"/g, 'class="th-fixed js-toggle-all"$1');

    // Replace the toggleAllSections implementation
    const regex = /let allCollapsed = false;[\s\S]*?function buildTable\(\) \{/g;
    
    if (regex.test(c)) {
        c = c.replace(regex, `
        let allCollapsed = false;
        function toggleAllSections(e) {
            allCollapsed = !allCollapsed;
            
            const table = e.currentTarget.closest('table');
            const icon = e.currentTarget.querySelector('span');
            if(icon) icon.style.transform = allCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
            
            Object.keys(SECTIONS).forEach(key => {
                if (allCollapsed) collapsedSections.add(key);
                else collapsedSections.delete(key);
            });
            
            table.querySelectorAll('tr.row-section, tr.row-sec').forEach(tr => {
                tr.classList.toggle('collapsed', allCollapsed);
            });
            
            applyFilter(currentFilter);
        }

        function attachToggleListener() {
            setTimeout(() => {
                document.querySelectorAll('.js-toggle-all').forEach(btn => {
                    if(!btn.dataset.listenerAttached) {
                        btn.addEventListener('click', toggleAllSections);
                        btn.dataset.listenerAttached = 'true';
                    }
                });
            }, 50);
        }

        function buildTable() {`);
    }

    // Call attachToggleListener after buildTable
    // We only want to replace `buildTable();` if it's not already followed by attachToggleListener
    if (!c.includes('attachToggleListener();')) {
        c = c.replace(/buildTable\(\);/g, 'buildTable();\n        attachToggleListener();');
    }

    fs.writeFileSync(file, c);
    console.log(`Patched ${file}`);
});
