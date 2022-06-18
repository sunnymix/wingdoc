
// --- focusing:

export interface Focusing {
  val: boolean,
  ts: number,
};

export namespace Focusing {
  export function of(val: boolean): Focusing {
    return { val, ts: +(new Date()) };
  }
}

// --- focusing pos:

export interface FocusingPos {
  val: number,
  ts: number,
};

export namespace FocusingPos {
  export function of(val: number): FocusingPos {
    return { val, ts: +(new Date()) };
  }
}

// --- selecting:

export interface Selecting {
  val: boolean,
  ts: number,
};

export namespace Selecting {
  export function of(val: boolean): Selecting {
    return { val, ts: +(new Date()) };
  }
};
