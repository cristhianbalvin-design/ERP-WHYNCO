const fs = require('fs');

const files = ['gantt_desarrollo.html', 'gantt_implementacion.html', 'index.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace empty th with a toggle button
    // In gantt_desarrollo.html: <th class="th-info" style="min-width:36px" rowspan="2"></th>
    // In gantt_implementacion.html: <th class="th-fixed" style="min-width:34px" rowspan="2"></th>
    
    // We can use regex to target the first empty th before Actividad
    // For gantt_desarrollo / index.html (Desarrollo):
    content = content.replace(/<th class="th-info" style="min-width:36px" rowspan="2"><\/th>\s*<th class="th-info" style="min-width:220px" rowspan="2">Actividad<\/th>/g, 
        `<th class="th-info" style="min-width:36px; text-align:center; cursor:pointer;" rowspan="2" onclick="toggleAllSections()" title="Expandir/Contraer Todo">
                            <span id="toggleAllIcon" style="font-size:16px; font-weight:bold; display:inline-block; transition:transform 0.15s; user-select:none;">▾</span>
                        </th>
                        <th class="th-info" style="min-width:220px" rowspan="2">Actividad</th>`);

    // For gantt_implementacion:
    content = content.replace(/<th class="th-fixed" style="min-width:34px" rowspan="2"><\/th>\s*<th class="th-fixed" style="min-width:220px" rowspan="2">Actividad<\/th>/g, 
        `<th class="th-fixed" style="min-width:34px; text-align:center; cursor:pointer;" rowspan="2" onclick="toggleAllSections()" title="Expandir/Contraer Todo">
                            <span id="toggleAllIcon" style="font-size:16px; font-weight:bold; display:inline-block; transition:transform 0.15s; user-select:none;">▾</span>
                        </th>
                        <th class="th-fixed" style="min-width:220px" rowspan="2">Actividad</th>`);

    // 2. Add the JS function before buildTable();
    // It's safe to place it right before function buildTable()
    if (!content.includes('function toggleAllSections()')) {
        content = content.replace(/function buildTable\(\) \{/g, `
        let allCollapsed = false;
        function toggleAllSections() {
            allCollapsed = !allCollapsed;
            // Handle multiple tabs in index.html, we use querySelectorAll for icons
            document.querySelectorAll('#toggleAllIcon').forEach(icon => {
                icon.style.transform = allCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
            });
            Object.keys(SECTIONS).forEach(key => {
                if (allCollapsed) collapsedSections.add(key);
                else collapsedSections.delete(key);
            });
            document.querySelectorAll('tr.row-section, tr.row-sec').forEach(tr => {
                tr.classList.toggle('collapsed', allCollapsed);
            });
            applyFilter(currentFilter);
        }

        function buildTable() {`);
    }

    fs.writeFileSync(file, content);
    console.log(`Patched ${file}`);
});
