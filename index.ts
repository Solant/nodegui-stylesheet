import { Pt, Px, Value, toString } from './units';
export { units } from './units';
import { units } from './units';

interface Styles {
    // flexbox
    flex: number,
    justifyContent: 'space-around' | 'space-between',
    alignItems: 'center',

    // styles
    backgroundColor: string,
    color: string,

    // positioning
    margin: number,
    marginLeft: number,
    marginRight: number,
    marginTop: number,
    marginBottom: number,

    // fonts
    fontFamily: string,
    // fallback: number will be treated like pixel units
    fontSize: Pt | Px | number,
    fontStyle: 'normal' | 'italic' | 'oblique',
    fontWeight: 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
}

function dashify(arg: string) {
    return arg.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

// some values, like font-size SHOULD NOT be wrapped to be properly applied
function wrapValue(arg: string | number | Value) {
    if (typeof arg === 'string') {
        return `"${arg}"`;
    } else if (typeof arg === 'number') {
        return arg.toString();
    } else {
        return toString(arg);
    }
}

function wrapEntry(key: keyof Styles, value: string | number | Value): string {
    if (key === 'fontSize' && typeof value === 'number') {
        return `${dashify(key)}: ${wrapValue(units(value, 'px'))}`;
    }
    return `${dashify(key)}: ${wrapValue(value)}`;
}

export function create<T extends { [key: string]: Partial<Styles> }, R extends { [key in keyof T]: string }>(arg: T): R {
    const result: { [key: string]: string } = {};

    Object.keys(arg).forEach(k => {
        const stylesheet = arg[k];
        result[k] = Object
            .entries(stylesheet)
            .map(([k, v]) => wrapEntry(k as keyof Styles, v as string | number | Value))
            .join(';') + ';';
    });

    // @ts-ignore
    return result;
}

