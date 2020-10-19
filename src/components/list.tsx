import { LiveDOMRenderer } from 'render-jsx/dom';
import { SimpleList, SimpleListProps } from './simple-list';


export type ListProps = SimpleListProps;


export function List(props: ListProps, renderer: LiveDOMRenderer) {
  return <SimpleList {...props}/>;
}
