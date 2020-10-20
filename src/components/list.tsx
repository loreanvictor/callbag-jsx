import { LiveDOMRenderer } from 'render-jsx/dom';
import { SimpleList, SimpleListProps } from './simple-list';


export type ListProps<T> = SimpleListProps<T>;


export function List<T>(props: ListProps<T>, renderer: LiveDOMRenderer) {
  return <SimpleList {...props}/>;
}
