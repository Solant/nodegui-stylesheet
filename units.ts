export interface Value {
    value: number,
    units: string,
}

export interface Px {
    value: number,
    units: 'px',
}

export interface Pt {
    value: number,
    units: 'pt',
}

export function units(value: number, units: 'pt'): Pt
export function units(value: number, units: 'px'): Px
export function units(value: number, units: 'pt' | 'px') {
    return {
        value,
        units,
    };
}

export function toString({ value, units}: Value): string {
    return `${value}${units}`;
}
