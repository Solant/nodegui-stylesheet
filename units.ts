export interface Value {
    value: number,
    units: string,
}

export interface Px {
    value: number,
    units: 'px',
}

export interface Em {
    value: number,
    units: 'em',
}
export interface Ex {
    value: number,
    units: 'ex',
}

export interface Pt {
    value: number,
    units: 'pt',
}

export function units(value: number, units: 'em'): Em
export function units(value: number, units: 'ex'): Ex
export function units(value: number, units: 'pt'): Pt
export function units(value: number, units: 'px'): Px
export function units(value: number, units: 'pt' | 'px' | 'em' | 'ex') {
    return {
        value,
        units,
    };
}

export function toString({ value, units}: Value): string {
    return `${value}${units}`;
}
