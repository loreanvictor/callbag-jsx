import { Source } from 'callbag';
import state, { isState, StateLike } from 'callbag-state';
import { tap } from '../../util/tap';


export function ensureState<T>(cb: Source<T[]>, track: (cb: Source<T[]>) => void): StateLike<T[]> {
  if (isState(cb)) {
    return cb;
  } else {
    const s = state<T[]>([]);
    track(tap((l: T[] | undefined) => s.set(l || []))(cb));

    return s;
  }
}
