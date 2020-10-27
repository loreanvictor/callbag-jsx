// tslint:disable: no-magic-numbers

import { makeRenderer, List, Conditional} from '../src';
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

const next = state('');
const show = state(true);

renderer.render(<>
  <Conditional if={show} then={
    () => <>
      <List of={data} each={item => <div>{item.sub('name')}</div>} key={i => i.id}/>
      <button onclick={() => {
        const A = data.sub(1).get();
        const B = data.sub(3).get();


        data.sub(3).set({id: -1, name: ''});
        data.sub(1).set(B!!);
        data.sub(3).set(A!!);
      }}>Swap</button>
    </>
  } else={() => <>Nothing to see here</>}/>
  <button onclick={() => show.set(!show.get())}>Toggle</button>
  <br/>
  <input type='text' _state={next}/>
  <button onclick={() => data.set(data.get().concat({id: data.get().length + 1, name: next.get()}))}>ADD</button>
</>).on(document.body);
