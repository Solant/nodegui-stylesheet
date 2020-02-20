import { Pt, Px, Em, Ex, Value, toString } from './units';
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
    // FIXME: Box Length instead of one value
    margin: number | Em | Ex | Pt | Px,
    marginLeft: number | Em | Ex | Pt | Px,
    marginRight: number | Em | Ex | Pt | Px,
    marginTop: number | Em | Ex | Pt | Px,
    marginBottom: number | Em | Ex | Pt | Px,

    // FIXME: Box Length instead of one value
    padding: number | Em | Ex | Pt | Px,
    paddingLeft: number | Em | Ex | Pt | Px,
    paddingRight: number | Em | Ex | Pt | Px,
    paddingTop: number | Em | Ex | Pt | Px,
    paddingBottom: number | Em | Ex | Pt | Px,

    minHeight: number | Em | Ex | Pt | Px,
    maxHeight: number | Em | Ex | Pt | Px,
    minWidth: number | Em | Ex | Pt | Px,
    maxWidth: number | Em | Ex | Pt | Px,

    position: 'relative' | 'absolute',
    top: number | Em | Ex | Pt | Px,
    left: number | Em | Ex | Pt | Px,
    right: number | Em | Ex | Pt | Px,
    bottom: number | Em | Ex | Pt | Px,
    textAlign: 'top' | 'top right' | 'right' | 'bottom right' | 'bottom' | 'bottom left' | 'left' | 'top left',
    textDecoration: 'none' | 'underline' | 'overline' | 'line-through',
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
    if (key === 'textDecoration') {
        return `${dashify(key)}: ${value}`;
    }
    if (key === 'textAlign') {
        return `${dashify(key)}: ${value}`;
    }
    if (key === 'color' || key === 'backgroundColor') {
        return `${dashify(key)}: ${value}`;
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

