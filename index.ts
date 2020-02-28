import { Pt, Px, Em, Ex, Value, toString } from './units';
export { units } from './units';
import { units } from './units';

type BorderStyle = 'dashed'
    | 'dot-dash'
    | 'dot-dot-dash'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'inset'
    | 'outset'
    | 'ridge'
    | 'solid'
    | 'none';

type Box<T> = T
    | [T]
    | [T, T]
    | [T, T, T]
    | [T, T, T, T];

type BoxLength = Box<Length>;

type BoxColors = Box<Brush>;

type Length = number | Em | Ex | Pt | Px;

type Repeat = 'repeat-x'
    | 'repeat-y'
    | 'repeat'
    | 'no-repeat';

type Alignment = 'top'
    | 'top right'
    | 'right'
    | 'bottom right'
    | 'bottom'
    | 'bottom left'
    | 'left'
    | 'top left';

type Attachment = 'scroll' | 'fixed';

type Origin = 'margin'
    | 'border'
    | 'padding'
    | 'content';

type Color = string;

type Brush = string;

type Url = string;

type Background = string;

type Radius = Length
    | [Length]
    | [Length, Length];

interface Styles {
    // yoga flexbox properties
    flex: number,
    flexDirection: 'row' | 'column',
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between',
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
    alignSelf: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
    alignContent: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',

    // qt stylesheet properties
    alternateBackgroundColor: Brush,
    background: Background,
    backgroundColor: Brush,
    backgroundImage: Url,
    backgroundRepeat: Repeat,
    backgroundPosition: Alignment,
    backgroundAttachment: Attachment,
    backgroundClip: Origin,
    backgroundOrigin: Origin,
    // TODO border
    // TODO borderTop
    // TODO borderRight
    // TODO borderBottom
    // TODO borderLeft
    borderColor: BoxColors
    borderTopColor: Brush,
    borderRightColor: Brush,
    borderBottomColor: Brush,
    borderLeftColor: Brush,
    // TODO borderImage
    borderRadius: Radius,
    borderTopLeftRadius: Radius,
    borderTopRightRadius: Radius,
    borderBottomRightRadius: Radius,
    borderBottomLeftRadius: Radius,
    borderStyle: BorderStyle,
    borderTopStyle: BorderStyle,
    borderRightStyle: BorderStyle,
    borderBottomStyle: BorderStyle,
    borderLeftStyle: BorderStyle,
    borderWidth: BoxLength,
    borderTopWidth: Length,
    borderRightWidth: Length,
    borderBottomWidth: Length,
    borderLeftWidth: Length,
    bottom: Length,
    buttonLayout: 0 | 1 | 2 | 3 | 5,
    color: Brush,
    dialogbuttonboxButtonsHaveIcons: 0 | 1,
    // TODO font
    fontFamily: string,
    fontSize: Pt | Px | number,
    fontStyle: 'normal' | 'italic' | 'oblique',
    fontWeight: 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    gridlineColor: Color,
    height: Length,
    iconSize: Length,
    image: Url,
    imagePosition: Alignment,
    left: Length,
    lineeditPasswordCharacter: string | number,
    lineeditPasswordMaskDelay: number,
    margin: BoxLength,
    marginLeft: Length,
    marginRight: Length,
    marginTop: Length,
    marginBottom: Length,
    maxHeight: Length,
    maxWidth: Length,
    messageboxTextInteractionFlags: number,
    minHeight: Length,
    minWidth: Length,
    opacity: number,
    // TODO outline
    outlineColor: Color,
    outlineOffset: Length,
    outlineStyle: BorderStyle,
    outlineRadius: Radius,
    outlineBottomLeftRadius: Radius,
    outlineBottomRightRadius: Radius,
    outlineTopLeftRadius: Radius,
    outlineTopRightRadius: Radius,
    padding: BoxLength,
    paddingLeft: Length,
    paddingRight: Length,
    paddingTop: Length,
    paddingBottom: Length,
    paintAlternatingRowColorsForEmptyArea: 0 | 1,
    position: 'relative' | 'absolute',
    right: Length,
    selectionBackgroundColor: Brush,
    selectionColor: Brush,
    showDecorationSelected: 0 | 1,
    spacing: Length,
    subcontrolOrigin: Origin,
    subcontrolPosition: Alignment,
    titlebarShowTooltipsOnButtons: 0 | 1,
    widgetAnimationDuration: number,
    textAlign: Alignment,
    textDecoration: 'none' | 'underline' | 'overline' | 'line-through',
    top: Length,
    width: Length,
}

function dashify(arg: string) {
    return arg.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

// some values, like font-size SHOULD NOT be wrapped to be properly applied
function wrapValue(arg: string | number | Value): string {
    if (typeof arg === 'string') {
        return `"${arg}"`;
    } else if (typeof arg === 'number') {
        return arg.toString();
    } else {
        return toString(arg);
    }
}

function wrapEntry(key: keyof Styles, value: Styles[keyof Styles]): string {
    if (Array.isArray(value)) {
        const values = (value as Array<string|Length>).map(wrapValue).join(' ');
        return `${dashify(key)}: ${values}`;
    }

    // support: list of properties that should not be wrapped
    const unwrapped: Array<keyof Styles> = [
        'textDecoration',
        'textAlign',
        'color',
        'backgroundColor',
        'fontWeight',
    ];
    if (unwrapped.includes(key)) {
        return `${dashify(key)}: ${value}`;
    }

    // support: all border-style properties should not be wrapped
    if (key.startsWith('border') && key.includes('Style')) {
        return `${dashify(key)}: ${value}`;
    }

    // support: enforce pixel units for cross-platform compatibility
    if (key === 'fontSize' && typeof value === 'number') {
        return `${dashify(key)}: ${wrapValue(units(value, 'px'))}`;
    }

    // convenience: allow both unicode number and js char as argument
    if (key === 'lineeditPasswordCharacter' && (typeof value === 'string' || typeof value === 'number')) {
        if (typeof value === 'number') {
            return `${dashify(key)}: ${wrapValue(value)}`;
        } else {
            return `${dashify(key)}: ${wrapValue(value.charCodeAt(0))}`;
        }
    }

    return `${dashify(key)}: ${wrapValue(value)}`;
}

export function create<T extends { [key: string]: Partial<Styles> }, R extends { [key in keyof T]: string }>(arg: T): R {
    const result: { [key: string]: string } = {};

    Object.keys(arg).forEach(k => {
        const stylesheet = arg[k];
        result[k] = Object
            .entries(stylesheet)
            .map(([k, v]) => wrapEntry(k as keyof Styles, v as Styles[keyof Styles]))
            .join(';') + ';';
    });

    // @ts-ignore
    return result;
}

