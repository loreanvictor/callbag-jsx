import { isKeyedState } from 'callbag-state-keyed';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { KeyedList, KeyedListProps } from './keyed-list';
import { SimpleList, SimpleListProps } from './simple-list';


export type ListProps<T> = SimpleListProps<T> | KeyedListProps<T>;


export function List<T>(props: ListProps<T>, renderer: LiveDOMRenderer) {
  if (isKeyedState(props.of) || (props as any).key) {
    return <KeyedList {...props as KeyedListProps<T>}/>;
  } else {
    return <SimpleList {...props as SimpleListProps<T>}/>;
  }
}
