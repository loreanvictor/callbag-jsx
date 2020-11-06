// tslint:disable: unified-signatures

import { LiveDOMRenderer } from 'render-jsx/dom';
import { KeyedFor, KeyedForProps } from './keyed-for';
import { SimpleFor, SimpleForProps } from './simple-for';


export function For<T>(props: SimpleForProps<T>, renderer: LiveDOMRenderer): Node;
export function For<T>(props: KeyedForProps<T>, renderer: LiveDOMRenderer): Node;
export function For<T>(
  props: SimpleForProps<T> | KeyedForProps<T>,
  renderer: LiveDOMRenderer,
) {
  if ((props as any).key) {
    return <KeyedFor {...props as KeyedForProps<T>}/>;
  } else {
    return <SimpleFor {...props as SimpleForProps<T>}/>;
  }
}
