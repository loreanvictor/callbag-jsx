/* istanbul ignore file */

let start: Date | undefined = undefined;

export function record() {
  start = new Date();
}

export function log(s: any) {
  if (start) {
    console.log('[' + ((new Date() as any) - (start as any)) + ']:: ' + s);
  }
}
