/* eslint-disable newline-before-return */
import { should } from 'chai';
import subject from 'callbag-subject';
import state from 'callbag-state';
import keyed from 'callbag-state-keyed';

import { testRender } from './util';
import { List } from '../list';

should();

describe('List', () => {
  it('should render given array.', () => {
    testRender((renderer, document) => {
      const s = state<string[] | undefined>(undefined);
      renderer.render(<List of={s} each={i => <span>{i}</span>}/>).on(document.body);

      s.set(['A', 'B', 'C']);
      document.body.textContent!.should.equal('ABC');
      s.set(['A', 'C', 'B']);
      document.body.textContent!.should.equal('ACB');
      s.set(['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('BCDE');
      s.set([]);
      document.body.textContent!.should.equal('');
    });
  });

  it('should provide indexes.', () => {
    testRender((renderer, document) => {
      const sub = subject();
      renderer.render(<List of={sub} each={(i, j) => <>{i}{j}</>}/>).on(document.body);

      sub(1, ['A', 'B', 'C']);
      document.body.textContent!.should.equal('A0B1C2');
      sub(1, ['A', 'C', 'B']);
      document.body.textContent!.should.equal('A0C1B2');
      sub(1, ['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('B0C1D2E3');
      sub(1, ['B', 'F']);
      document.body.textContent!.should.equal('B0F1');
      sub(1, undefined);
      document.body.textContent!.should.equal('');
    });
  });

  it('should provide `.get()` on callbags passed to `each()`.', () => {
    testRender((renderer, document, tools) => {
      const s = state(['A', 'B', 'C']);
      let r = '';
      renderer.render(<List of={s} each={i => <div onclick={() => r = `${i.get()}`}>{i}</div>}/>).on(document.body);

      tools.click(document.body.firstElementChild as HTMLElement);
      r.should.equal('A');

      s.set(['B', 'C']);
      tools.click(document.body.firstElementChild as HTMLElement);
      r.should.equal('B');
    });
  });

  it('should properly render keyed arrays.', () => {
    testRender((renderer, document) => {
      const sub = subject<string[]>();
      renderer.render(<List of={sub} each={i => <span>{i}</span>} key={i => i}/>).on(document.body);

      sub(1, ['A', 'B', 'C']);
      document.body.textContent!.should.equal('ABC');
      sub(1, ['A', 'C', 'B']);
      document.body.textContent!.should.equal('ACB');
      sub(1, ['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('BCDE');
      sub(1, []);
      document.body.textContent!.should.equal('');
    });
  });

  it('should properly render keyed states.', () => {
    testRender((renderer, document) => {
      const s = keyed(state(['A', 'B', 'C']), i => i);
      renderer.render(<List of={s} each={i => <span>{i}</span>}/>).on(document.body);

      document.body.textContent!.should.equal('ABC');
      s.set(['A', 'C', 'B']);
      document.body.textContent!.should.equal('ACB');
      s.set(['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('BCDE');
      s.set([]);
      document.body.textContent!.should.equal('');
    });
  });

  it('should render keyed arrays in a keyed way.', () => {
    testRender((renderer, document) => {
      const s = state(['A', 'B', 'C']);
      let r = 0;
      renderer.render(<List of={s} each={i => <span>{++r}{i}</span>} key={i => i}/>).on(document.body);

      document.body.textContent!.should.equal('1A2B3C');
      s.set(['B', 'C', 'A']);
      document.body.textContent!.should.equal('2B3C1A');
    });
  });

  it('should provide index callbags for keyed arrays.', () => {
    testRender((renderer, document) => {
      const sub = state(['A', 'B', 'C']);
      renderer.render(<List of={sub} each={(i, j) => <>{i}{j}</>} key={i => i}/>).on(document.body);

      document.body.textContent!.should.equal('A0B1C2');
      sub(1, ['A', 'C', 'B']);
      document.body.textContent!.should.equal('A0C1B2');
      sub(1, ['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('B0C1D2E3');
      sub(1, ['B', 'F']);
      document.body.textContent!.should.equal('B0F1');
    });
  });

  it('should not update anymore when list is removed from document.', () => {
    testRender((renderer, document) => {
      const sub = state(['A', 'B']);
      let r = 0;
      const ref = <div/>;
      renderer.render(<List of={sub} each={i => { r++; return <>{i}</>; }}/>).on(ref);
      renderer.render(ref).on(document.body);

      r.should.equal(2);
      renderer.remove(ref);
      sub.set(['A', 'B', 'C']);
      r.should.equal(2);
    });
  });
});
