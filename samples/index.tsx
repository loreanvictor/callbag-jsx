// tslint:disable: no-magic-numbers

const subject = require('callbag-subject');
import { Callbag } from 'callbag';
import expr from 'callbag-expr';
import { debounce } from 'callbag-debounce';

import { makeRenderer } from '../src';

const renderer = makeRenderer();
const mouse: Callbag<MouseEvent, MouseEvent> = subject();
const mread = debounce(5)(mouse) as Callbag<never, MouseEvent>;

renderer.render(<>
  <style>{`
    .container { width: 100%; height: 80vh; }
    .ball { background: black; width: 32px; height: 32px; border-radius: 32px; }
  `}</style>
  <div class='container' onmousemove={mouse}>
    <div class='ball' style={{
      transition: { 'transform.s': .3 },
      transform: expr($ => {
        if ($(mread)) {
          return {
            'translateX.px': $(mread)?.clientX,
            'translateY.px': $(mread)?.clientY,
          };
        }
      })
    }}/>
  </div>
</>).on(document.body);
// import { makeRenderer, List } from '../src';

// const renderer = makeRenderer();
// const s = state([0, 0, 0, 0, 0]);

// renderer.render(<>
//   <List of={s} each={i =>
//     <div onclick={() => i.set(i.get()!! + 1)}>clicked times</div>
//   }/>
//   {expr($ => $(s, []).join(','))}
// </>).on(document.body);

