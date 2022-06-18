
export interface Focusing {
  val: number | boolean,
  ts: number,
};

export namespace Focusing {
  export function of(val: number | boolean): Focusing {
    return { val, ts: +(new Date()) };
  }
}
