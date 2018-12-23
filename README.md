# amida 

[![github](https://badgen.net/badge//nju33,amida/000?icon=github&list=1)](https://github.com/nju33/amida)
[![npm:version](https://badgen.net/npm/v/amida?icon=npm&label=)](https://www.npmjs.com/package/amida)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![ci:status](https://badgen.net/circleci/github/nju33/amida)](https://circleci.com/gh/nju33/amida)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--amida.netlify.com/)
[![license](https://badgen.net/npm/license/amida)](https://github.com/nju33/amida/blob/master/LICENSE)
[![browserslist](https://badgen.net/badge/browserslist/chrome,edge/ffd539?list=1)](https://browserl.ist/?q=last+1+chrome+version%2C+last+1+edge+version)

## Usage 

```ts
/**
 * As to prepare of using the `amida`
 * 
 * ```sh
 * yarn add amida 
 * ```
 */
import Amida from 'amida';
```

or

```html
<script src="https://unpkg.com/amida/amida.js"></script>
<script>
  // Can use the `Amida` here.
</script>
```

## Example

```ts
interface BehaviorObject {
  size: string;
}

const theme = {
  size: 123,
};

const wm = new WeakMap();
wm.set(theme, theme);

const amida = new Amida<BehaviorObject>({
  size: into => [
    // In case of `string`
    into((v: string) => v).if.string(),

    // In case of `number`
    into((num: number) =>
      Math.round(num) === num ? `${num}px` : `${num}em`,
    ).if.number() /* or if('number') */,

    // In case of `object`
    into((obj: BehaviorObject) => `${obj.size}px`).if.object(),

    // In case of `WeakMap`
    into((wm: WeakMap<object, BehaviorObject>) => {
      return `${wm.get(theme)!.size}px`;
    }).if.weakmap() /* or if ('weakmap') */,
  ],
});

const obj = amida.from(theme);
expect(obj.size).toBe('123px');

obj.size = '100%';
expect(obj.size).toBe('100%');

(obj.size as unknown) = theme;
expect(obj.size).toBe('123px');

(obj.size as unknown) = 999;
expect(obj.size).toBe('999px');

(obj.size as unknown) = 2.1;
expect(obj.size).toBe('2.1em');

(obj.size as unknown) = wm;
expect(obj.size).toBe('123px');

const amida2 = new Amida<BehaviorObject>({
  size: into => [
    into((v: string) => v).if.string(),
    into((v: object) => v).if.object(),
  ]
});

amida2.from({});
(amida2.size as any) = 123; // throw TypeError('size must be string, object')
```