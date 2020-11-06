// tslint:disable: unified-signatures

import { isKeyedState } from 'callbag-state-keyed';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { KeyedList, KeyedListProps } from './keyed-list';
import { SimpleList, SimpleListProps } from './simple-list';


export function List<T>(props: SimpleListProps<T>, renderer: LiveDOMRenderer): Node;
export function List<T>(props: KeyedListProps<T>, renderer: LiveDOMRenderer): Node;
export function List<T>(props: SimpleListProps<T> | KeyedListProps<T>, renderer: LiveDOMRenderer) {
  if (isKeyedState(props.of) || (props as any).key) {
    return <KeyedList {...props as KeyedListProps<T>}/>;
  } else {
    return <SimpleList {...props as SimpleListProps<T>}/>;
  }
}
