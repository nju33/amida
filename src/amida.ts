import kindOf, {KindOfResult} from './kind-of';

export interface AmidaIfReturn {
  (): {
    type: KindOfResult;
    value: any;
    called: boolean;
  };
}

export interface AmidaIfFunction extends Record<KindOfResult, any> {
  (type: KindOfResult): AmidaIfReturn;
}

export interface AmidaIntoFunction {
  (cb: (value: any) => any): {if: AmidaIfFunction};
}

export type AmidaReceivingObjectAdaptor<BO extends {[x: string]: any}> = Record<
  keyof BO,
  (into: AmidaIntoFunction) => AmidaIfReturn[]
>;

const createInto: (value: any) => AmidaIntoFunction = (value: any) => cb => {
  function ifFn(type: KindOfResult) {
    return () => {
      if (kindOf(value) === type) {
        // return cb(value);
        return {
          type,
          value: cb(value),
          called: true,
        };
      }
      return {
        type,
        value: false,
        called: false,
      };
    };
  }
  ifFn.undefined = () => ifFn('undefined');
  ifFn.null = () => ifFn('null');
  ifFn.boolean = () => ifFn('boolean');
  // ifFn.buffer = () => ifFn('buffer');
  ifFn.number = () => ifFn('number');
  ifFn.string = () => ifFn('string');
  // ifFn.args = () => ifFn('arguments');
  ifFn.array = () => ifFn('array');
  ifFn.object = () => ifFn('object');
  ifFn.date = () => ifFn('date');
  ifFn.regexp = () => ifFn('regexp');
  ifFn.error = () => ifFn('error');
  ifFn.function = () => ifFn('function');
  // ifFn.generatorfunction = () => ifFn('generatorfunction');
  ifFn.symbol = () => ifFn('symbol');
  ifFn.map = () => ifFn('map');
  ifFn.weakmap = () => ifFn('weakmap');
  ifFn.set = () => ifFn('set');
  ifFn.weakset = () => ifFn('weakset');
  // ifFn.int8array = () => ifFn('int8array');
  // ifFn.uint8array = () => ifFn('uint8array');
  // ifFn.uint8clampedarray = () => ifFn('uint8clampedarray');
  // ifFn.int16array = () => ifFn('int16array');
  // ifFn.uint16array = () => ifFn('uint16array');
  // ifFn.int32array = () => ifFn('int32array');
  // ifFn.uint32array = () => ifFn('uint32array');
  // ifFn.float32array = () => ifFn('float32array');
  // ifFn.float64array = () => ifFn('float64array');

  return {if: ifFn};
};

export class Amida<BO extends {[x: string]: any}> {
  private handler: ProxyHandler<BO>;

  constructor(public adaptor: AmidaReceivingObjectAdaptor<BO>) {
    const keys = Object.keys(adaptor);

    this.handler = {
      set(target: object, key: string | number | symbol, newValue, receiver) {
        if (typeof key === 'symbol') {
          return Reflect.set(target, key, newValue, receiver);
        }

        if (typeof key === 'number') {
          key = String(key);
        }

        if (keys.indexOf(key) === -1) {
          return Reflect.set(target, key, newValue, receiver);
        }

        const into = createInto(newValue);
        const processes = adaptor[key](into);

        const types: KindOfResult[] = [];
        let value: any;
        for (const process of processes) {
          const result = process();
          types.push(result.type);

          if (Boolean(result.called)) {
            value = result.value;
            break;
          }
        }

        if (value === undefined) {
          throw new TypeError(`${key} must be ${types}`);
        }

        return Reflect.set(target, key, value, receiver);
      },
      get(target: object, key: string | number | symbol, receiver) {
        return Reflect.get(target, key, receiver);
      },
    };
  }

  from(object: Partial<Record<keyof BO, any>>): BO {
    const proxied = new Proxy({...object}, this.handler);

    Object.keys(object).forEach(key => {
      proxied[key] = object[key];
    });

    return proxied as BO;
  }
}
