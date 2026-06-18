const fs = require('fs');

const files = ['gantt_desarrollo.html', 'gantt_implementacion.html', 'index.html'];

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');

    // Completely remove ANY call to attachToggleListener
    c = c.replace(/attachToggleListener\(\);/g, '');

    // Now fix window.renderGantt...
    // window.renderGanttImp = function() { buildTable(); applyFilter(currentFilter); };
    c = c.replace(/window\.renderGanttDev = function\(\) \{ buildTable\(\);\s+applyFilter\(currentFilter\); \};/g, 'window.renderGanttDev = function() { buildTable(); applyFilter(currentFilter); };');
    c = c.replace(/window\.renderGanttImp = function\(\) \{ buildTable\(\);\s+applyFilter\(currentFilter\); \};/g, 'window.renderGanttImp = function() { buildTable(); applyFilter(currentFilter); };');
    
    // Also in case they are malformed:
    c = c.replace(/window\.renderGanttDev = function\(\) \{ buildTable\(\);\s*\};/g, 'window.renderGanttDev = function() { buildTable(); applyFilter(currentFilter); };');
    c = c.replace(/window\.renderGanttImp = function\(\) \{ buildTable\(\);\s*\};/g, 'window.renderGanttImp = function() { buildTable(); applyFilter(currentFilter); };');

    // Wait, let's just do a blanket removal of the attachToggleListener token
    // since we already removed the definition.
    c = c.replace(/attachToggleListener\(\);?/g, '');

    fs.writeFileSync(file, c);
});
