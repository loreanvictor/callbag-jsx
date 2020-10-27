// tslint:disable: no-magic-numbers

import { makeRenderer, List } from '../src';
import { state } from 'callbag-state';
import { expr } from 'callbag-expr';

const renderer = makeRenderer();

const data = state([
  {id: 1, name: 'AAA'},
  {id: 2, name: 'BBB'},
  {id: 3, name: 'CCC'},
  {id: 4, name: 'DDD'},
  {id: 5, name: 'EEE'},
]);

renderer.render(<>
  <List of={data} each={item => <div>{item.sub('name')}</div>} key={i => i.id}/>
  <button onclick={() => {
    const A = data.sub(1).get();
    const B = data.sub(3).get();


    data.sub(3).set({id: -1, name: ''});
    data.sub(1).set(B!!);
    data.sub(3).set(A!!);
  }}>Swap</button>
</>).on(document.body);
