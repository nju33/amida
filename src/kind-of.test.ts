import kindOf from './kind-of';

test('basis', () => {
  expect(kindOf(undefined)).toBe('undefined');
  expect(kindOf(null)).toBe('null');
  expect(kindOf('string')).toBe('string');
  expect(kindOf(123)).toBe('number');
  expect(kindOf(true)).toBe('boolean');
  expect(kindOf(() => {})).toBe('function');
  expect(kindOf(Symbol())).toBe('symbol');
  expect(kindOf([])).toBe('array');
  expect(kindOf({})).toBe('object');
  expect(kindOf(/regexp/)).toBe('regexp');
  expect(kindOf(new Date())).toBe('date');
  expect(kindOf(new TypeError())).toBe('error');
  expect(kindOf(new Map())).toBe('map');
  expect(kindOf(new WeakMap())).toBe('weakmap');
  expect(kindOf(new Set())).toBe('set');
  expect(kindOf(new WeakSet())).toBe('weakset');
});