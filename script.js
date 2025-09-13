// Datos de estudiantes
const students = [
    {id: 1, name: "AINOHA IZASCU", type: "normal", preferences: [18, 11, 12, 2]},
    {id: 2, name: "AINHARA", type: "leader", preferences: [1, 12]},
    {id: 3, name: "ANDREW DAVID", type: "normal", preferences: [19, 13]},
    {id: 4, name: "ASSIA", type: "leader", preferences: [18, 1]},
    {id: 5, name: "CARLA", type: "normal", preferences: [16, 20]},
    {id: 6, name: "CESAR", type: "help", preferences: [19, 3, 23]},
    {id: 7, name: "CRISTIAN", type: "normal", preferences: []},
    {id: 8, name: "ELENA", type: "normal", preferences: []},
    {id: 9, name: "ERICK", type: "normal", preferences: []},
    {id: 10, name: "HELENA", type: "help", preferences: [11, 1, 18, 2]},
    {id: 11, name: "EMILEE", type: "normal", preferences: [8, 4, 1, 18]},
    {id: 12, name: "KIARA ARELI", type: "leader", preferences: [1, 2]},
    {id: 13, name: "LUCAS", type: "leader", preferences: []},
    {id: 14, name: "LUIS ANGEL", type: "normal", preferences: []},
    {id: 15, name: "MARCOS", type: "help", preferences: [1, 13]},
    {id: 16, name: "MARTINA G", type: "normal", preferences: [17, 22]},
    {id: 17, name: "MARTINA S", type: "help", preferences: [16, 20, 22]},
    {id: 18, name: "PAULA", type: "normal", preferences: [1, 2]},
    {id: 19, name: "ROBERT ALEJANDRO", type: "normal", preferences: []},
    {id: 20, name: "ROKAYA", type: "leader", preferences: [16, 17]},
    {id: 21, name: "RUBÉN YAHIR", type: "leader", preferences: [19, 13]},
    {id: 22, name: "SARA", type: "normal", preferences: [16, 17]},
    {id: 23, name: "YAREL", type: "normal", preferences: [1, 13]},
    {id: 24, name: "YOUNESS", type: "help", preferences: [3, 23]}
];

// Conjuntos y constantes para comprobaciones rápidas
const MALE_STUDENTS = new Set([3, 6, 7, 9, 13, 14, 15, 19, 21, 24]);
const FEMALE_STUDENTS = new Set([1, 2, 4, 5, 8, 10, 11, 12, 16, 17, 18, 20, 22, 23]);
const LEADERS = new Set([2, 12, 20, 13, 21, 4]);
const NEED_HELP = new Set([6, 24, 10, 15, 17]);
// Estudiantes problemáticos: Erik(9), Luis Angel(14), Cristian(7)
const PROBLEMATIC = new Set([9, 14, 7]);

// Util: Fisher-Yates shuffle (mutates array)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderStudents() {
    const grid = document.getElementById('studentsGrid');
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();

    students.forEach(student => {
        const item = document.createElement('div');
    let classes = `student-item ${student.type}`;
    if (PROBLEMATIC.has(student.id)) classes += ' problematic';
    item.className = classes;
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `${student.id} ${student.name}`);

        const num = document.createElement('div');
        num.className = 'student-number';
        num.textContent = student.id;

        const name = document.createElement('div');
        name.textContent = student.name;

        item.appendChild(num);
        item.appendChild(name);
        frag.appendChild(item);
    });

    grid.appendChild(frag);
}

// Mensajes de estado accesibles y seguros
function showStatus(message, type = 'info') {
    const status = document.getElementById('status');
    status.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = `status ${type}`;

    if (typeof message === 'string' && message.includes('\n')) {
        const pre = document.createElement('pre');
        pre.style.whiteSpace = 'pre-wrap';
        pre.textContent = message.trim();
        wrapper.appendChild(pre);
    } else {
        // Mensajes cortos pueden usar innerHTML para mantener emoji y formato
        wrapper.innerHTML = String(message);
    }

    status.appendChild(wrapper);
}

function validateConstraints(groups) {
    const errors = [];

    // Erik, Luis Angel y Cristian no juntos
    const problematic = [9, 14, 7];
    groups.forEach(group => {
        const found = group.filter(id => problematic.includes(id));
        if (found.length > 1) errors.push(`Erik, Luis Angel y Cristian no pueden estar juntos (encontrados: ${found.join(', ')})`);
    });

    // Un líder por grupo
    groups.forEach(group => {
        const leadersInGroup = group.filter(id => LEADERS.has(id));
        if (leadersInGroup.length > 1) errors.push(`Solo debe haber un líder por grupo`);
    });

    // Separar alumnos que necesitan ayuda
    groups.forEach(group => {
        const helpInGroup = group.filter(id => NEED_HELP.has(id));
        if (helpInGroup.length > 1) errors.push(`Estudiantes que necesitan ayuda deben estar separados`);
    });

    // Elena (8) debe ir con Assia (4)
    const elenaGroup = groups.find(g => g.includes(8));
    if (elenaGroup && !elenaGroup.includes(4)) errors.push(`Elena debe estar con Assia`);

    // Carla (5) no con Ainoha (1)
    const carlaGroup = groups.find(g => g.includes(5));
    if (carlaGroup && carlaGroup.includes(1)) errors.push(`Carla no puede estar con Ainoha`);

    // Marcos (15) máximo un varón
    const marcosGroup = groups.find(g => g.includes(15));
    if (marcosGroup) {
        const males = marcosGroup.filter(id => MALE_STUDENTS.has(id));
        if (males.length > 1) errors.push(`Marcos debe tener como máximo un varón en su grupo`);
    }

    return errors;
}

function countPreferencesSatisfied(groups) {
    let satisfied = 0;
    let total = 0;

    students.forEach(student => {
        if (Array.isArray(student.preferences) && student.preferences.length > 0) {
            total += student.preferences.length;
            const studentGroup = groups.find(group => group.includes(student.id));
            if (studentGroup) {
                student.preferences.forEach(prefId => { if (studentGroup.includes(prefId)) satisfied++; });
            }
        }
    });

    return { satisfied, total };
}

function generateGroups() {
    showStatus('🔄 Generando grupos... Puede tardar unos segundos.', 'info');

    setTimeout(() => {
        const t0 = performance.now();
        let bestGroups = null;
        let bestScore = -Infinity;
        let bestErrors = [];
        const maxAttempts = 1000;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const groups = attemptGroupGeneration();
            const errors = validateConstraints(groups);
            const prefStats = countPreferencesSatisfied(groups);

            const score = (prefStats.satisfied * 10) - (errors.length * 100);

            if (errors.length === 0 && score > bestScore) {
                bestGroups = groups; bestScore = score; bestErrors = errors; break;
            }

            if (bestGroups === null || score > bestScore) {
                bestGroups = groups; bestScore = score; bestErrors = errors;
            }
        }

        const t1 = performance.now();

                if (bestGroups) {
            displayGroups(bestGroups);
                    // Guardar la configuración actual para export
                    window.currentGroups = bestGroups;
                        updateExportButtons();
            const prefStats = countPreferencesSatisfied(bestGroups);
            const pct = prefStats.total ? Math.round(prefStats.satisfied / prefStats.total * 100) : 0;

            if (bestErrors.length === 0) {
                showStatus(`✅ ¡Grupos generados exitosamente! Preferencias satisfechas: ${prefStats.satisfied}/${prefStats.total} (${pct}%). Generación: ${Math.round(t1 - t0)} ms.`, 'success');
            } else {
                showStatus(`⚠️ Grupos generados con restricciones menores: ${bestErrors.join('; ')}. Preferencias: ${prefStats.satisfied}/${prefStats.total} (${pct}%). Generación: ${Math.round(t1 - t0)} ms.`, 'error');
            }
        } else {
            showStatus('❌ No se pudo generar una configuración válida. Intenta de nuevo.', 'error');
        }
        }, 50);
}

// Exportar CSV
function exportCSV() {
    const groups = window.currentGroups || [];
    if (!groups.length) { showStatus('No hay grupos para exportar.', 'error'); return; }

    const rows = [];
    groups.forEach((g, i) => {
        g.forEach(memberId => {
            const student = students.find(s => s.id === memberId) || { name: 'Desconocido' };
            rows.push([`Grupo ${i+1}`, memberId, student.name]);
        });
    });

    const csvContent = ['Grupo,ID,Nombre', ...rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grupos.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showStatus('✅ Exportado CSV (grupos.csv)', 'success');
}

// Exportar JSON
function exportJSON() {
    const groups = window.currentGroups || [];
    if (!groups.length) { showStatus('No hay grupos para exportar.', 'error'); return; }

    const data = { generatedAt: new Date().toISOString(), groups };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grupos.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showStatus('✅ Exportado JSON (grupos.json)', 'success');
}

// --- Export buttons wiring ---
function updateExportButtons() {
    const csvBtn = document.getElementById('exportCsvBtn');
    const jsonBtn = document.getElementById('exportJsonBtn');
    const hasGroups = Array.isArray(window.currentGroups) && window.currentGroups.length > 0;
    if (csvBtn) csvBtn.disabled = !hasGroups;
    if (jsonBtn) jsonBtn.disabled = !hasGroups;
}

function setupExportButtons() {
    const csvBtn = document.getElementById('exportCsvBtn');
    const jsonBtn = document.getElementById('exportJsonBtn');
    if (csvBtn) csvBtn.addEventListener('click', () => { exportCSV(); });
    if (jsonBtn) jsonBtn.addEventListener('click', () => { exportJSON(); });
    // Inicializar estado
    updateExportButtons();
}

// Auto-generate toggle handling
function readAutoGenerateSetting() {
    try { return localStorage.getItem('autoGenerate') === '1'; } catch (e) { return false; }
}

function writeAutoGenerateSetting(value) {
    try { localStorage.setItem('autoGenerate', value ? '1' : '0'); } catch (e) {}
}

function setupAutoToggle() {
    const toggle = document.getElementById('autoGenerateToggle');
    if (!toggle) return;
    toggle.checked = readAutoGenerateSetting();
    toggle.addEventListener('change', () => {
        writeAutoGenerateSetting(toggle.checked);
        showStatus(`Auto-generate ${toggle.checked ? 'ON' : 'OFF'}`, 'info');
    });
}

function attemptGroupGeneration() {
    const groups = [[], [], [], [], [], []];
    const available = Array.from({ length: 24 }, (_, i) => i + 1);

    // Asignar líderes aleatoriamente (uno por grupo)
    const leaders = [2, 12, 20, 13, 21, 4];
    shuffle(leaders);
    leaders.forEach((leader, i) => {
        groups[i].push(leader);
        const idx = available.indexOf(leader);
        if (idx !== -1) available.splice(idx, 1);
    });

    // Elena (8) con Assia (4)
    const assiaGroupIndex = groups.findIndex(g => g.includes(4));
    if (assiaGroupIndex !== -1 && available.includes(8)) {
        groups[assiaGroupIndex].push(8);
        available.splice(available.indexOf(8), 1);
    }

    // Distribuir estudiantes que necesitan ayuda
    const needHelp = [6, 24, 10, 15, 17].filter(id => available.includes(id));
    shuffle(needHelp);

    for (const student of needHelp) {
        const candidateGroups = groups.filter(g => g.length < 4 && !g.some(id => NEED_HELP.has(id)));
        if (candidateGroups.length === 0) continue;
        const chosen = candidateGroups[Math.floor(Math.random() * candidateGroups.length)];

        if (student === 15) {
            const males = chosen.filter(id => MALE_STUDENTS.has(id)).length;
            if (males < 1) {
                chosen.push(student);
                available.splice(available.indexOf(student), 1);
            }
        } else {
            chosen.push(student);
            available.splice(available.indexOf(student), 1);
        }
    }

    // Llenar el resto respetando restricciones simples
    shuffle(available);
    while (available.length > 0 && groups.some(g => g.length < 4)) {
        const student = available.pop();
        const candidateGroups = groups.filter(g => g.length < 4);
        let placed = false;

        for (const g of candidateGroups) {
            let valid = true;

            // Restricción Erik/Luis/Cristian
            if ([9, 14, 7].includes(student) && g.some(id => [9, 14, 7].includes(id))) valid = false;
            // Carla (5) no con Ainoha (1)
            if (student === 5 && g.includes(1)) valid = false;

            if (valid) { g.push(student); placed = true; break; }
        }

        if (!placed) {
            // asignar al primer grupo con espacio si no hay opción válida
            const g = candidateGroups[Math.floor(Math.random() * candidateGroups.length)];
            g.push(student);
        }
    }

    return groups;
}

function displayGroups(groups) {
    const container = document.getElementById('groupsResult');
    container.innerHTML = '';
    const frag = document.createDocumentFragment();

    groups.forEach((group, index) => {
        const groupEl = document.createElement('div');
        groupEl.className = 'group';

        const header = document.createElement('div');
        header.className = 'group-header';
        header.textContent = `Grupo ${index + 1}`;
        groupEl.appendChild(header);

        group.forEach(studentId => {
            const student = students.find(s => s.id === studentId) || { name: 'Desconocido' };
            const member = document.createElement('div');
                    const isLeader = LEADERS.has(studentId);
                    const needsHelp = NEED_HELP.has(studentId);
                    const isProblem = PROBLEMATIC.has(studentId);
                    member.className = `group-member ${isLeader ? 'leader' : needsHelp ? 'needs-help' : ''} ${isProblem ? 'problematic' : ''}`;

            const num = document.createElement('div');
            num.className = 'student-number';
            num.textContent = studentId;

            const name = document.createElement('div');
            name.textContent = `${student.name} ${isLeader ? '👑' : needsHelp ? '🆘' : ''}`;

            member.appendChild(num);
            member.appendChild(name);
            groupEl.appendChild(member);
        });

        frag.appendChild(groupEl);
    });

    container.appendChild(frag);
}

function clearGroups() {
    document.getElementById('groupsResult').innerHTML = '';
    document.getElementById('status').innerHTML = '';
    window.currentGroups = [];
    updateExportButtons();
}

function showConstraints() {
    const constraints = `
        📋 RESTRICCIONES DEL SISTEMA:
        
        1️⃣ Erik, Luis Angel y Cristian NO pueden estar juntos, pero cada uno necesita un líder
        2️⃣ Líderes (Ainhara, Kiara, Rokaya, Lucas, Rubén, Assia) deben ir en grupos separados
        3️⃣ Estudiantes que necesitan ayuda (César, Youness, Helena, Marcos, Martina S) deben ir separados
        4️⃣ Marcos debe tener como máximo un niño varón en su grupo
        5️⃣ Elena DEBE sentarse con Assia
        6️⃣ Carla NO puede mezclarse con Ainoha
        7️⃣ Se intentan respetar al máximo las preferencias de cada estudiante
        `;

    showStatus(constraints, 'info');
}

// Inicializar la aplicación y generar grupos por defecto
renderStudents();
setupAutoToggle();
setupExportButtons();
if (readAutoGenerateSetting()) {
    showStatus('👋 ¡Bienvenido! Generando grupos automáticamente al cargar.', 'info');
    generateGroups();
} else {
    showStatus('👋 ¡Bienvenido! Haz clic en "Generar Grupos" para crear una distribución automática.', 'info');
}
