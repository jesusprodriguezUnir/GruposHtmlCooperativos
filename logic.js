// Módulo de lógica reutilizable para tests
// Exporta funciones puras usadas por la UI.

const MALE_STUDENTS = new Set([3, 6, 7, 9, 13, 14, 15, 19, 21, 24]);
const LEADERS = new Set([2, 12, 20, 13, 21, 4]);
const NEED_HELP = new Set([6, 24, 10, 15, 17]);
const PROBLEMATIC = new Set([9, 14, 7]);

// Fisher-Yates shuffle (pure: returns new array)
function shuffle(arr) {
  const array = Array.isArray(arr) ? arr.slice() : [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function validateConstraints(groups) {
  const errors = [];
  // Erik, Luis Angel y Cristian no juntos
  groups.forEach(group => {
    const found = group.filter(id => PROBLEMATIC.has(id));
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

function countPreferencesSatisfied(groups, students) {
  let satisfied = 0;
  let total = 0;
  if (!Array.isArray(students)) return { satisfied: 0, total: 0 };
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

module.exports = {
  shuffle,
  validateConstraints,
  countPreferencesSatisfied,
  MALE_STUDENTS,
  LEADERS,
  NEED_HELP,
  PROBLEMATIC
};

// Compatibilidad navegador (si se incluye directamente con <script>)
if (typeof window !== 'undefined') {
  window.Logic = {
    shuffle,
    validateConstraints,
    countPreferencesSatisfied,
    MALE_STUDENTS,
    LEADERS,
    NEED_HELP,
    PROBLEMATIC
  };
}
