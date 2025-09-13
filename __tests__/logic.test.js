const { shuffle, validateConstraints, countPreferencesSatisfied } = require('../logic');

describe('Logic module', () => {
  test('shuffle returns array with same elements', () => {
    const input = [1,2,3,4,5];
    const out = shuffle(input);
    expect(out).not.toBe(input); // different reference
    expect(out.sort()).toEqual(input.slice().sort());
  });

  test('validateConstraints detects problematic trio together', () => {
    // Grupo 1 tiene 9 y 14 juntos
    const groups = [[9,14,2,3], [1,4,5,6], [7,8,10,11], [12,13,15,16], [17,18,19,20], [21,22,23,24]];
    const errors = validateConstraints(groups);
    expect(errors.some(e => e.includes('Erik, Luis Angel'))).toBeTruthy();
  });

  test('countPreferencesSatisfied counts correctly', () => {
    const students = [
      { id: 1, preferences: [2,3] },
      { id: 2, preferences: [1] }
    ];
    const groups = [[1,2,4,5],[3,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[21,22,23,24]];
    const stats = countPreferencesSatisfied(groups, students);
  // student 1 has two prefs (2 and 3) but only 2 is in the same group -> 1 satisfied; student 2 has pref 1 in same group -> 1
  expect(stats.satisfied).toBe(2);
  expect(stats.total).toBe(3);
  });
});
