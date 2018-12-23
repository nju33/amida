export type KindOfResult =
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'number'
  | 'string'
  | 'array'
  | 'object'
  | 'date'
  | 'regexp'
  | 'error'
  | 'function'
  | 'symbol'
  | 'map'
  | 'weakmap'
  | 'set'
  | 'weakset';

const kindOf = (value: any): KindOfResult => {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  switch (typeof value) {
    case 'string': {
      return 'string';
    }
    case 'number': {
      return 'number';
    }
    case 'boolean': {
      return 'boolean';
    }
    case 'function': {
      return 'function';
    }
    case 'symbol': {
      return 'symbol';
    }
  }

  const stringValue = value.toString();
  switch (true) {
    case stringValue === '[object Object]': {
      return 'object';
    }
    case stringValue === '[object Map]': {
      return 'map';
    }
    case stringValue === '[object WeakMap]': {
      return 'weakmap';
    }
    case stringValue === '[object Set]': {
      return 'set';
    }
    case stringValue === '[object WeakSet]': {
      return 'weakset';
    }
  }

  if (value instanceof RegExp) {
    return 'regexp';
  }

  if (value instanceof Date) {
    return 'date';
  }

  if (value instanceof Error) {
    return 'error';
  }

  throw new Error('unexpected value');
};

export default kindOf;