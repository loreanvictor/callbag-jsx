import { should } from 'chai';
import subject from 'callbag-subject';
import state from 'callbag-state';

import { testRender } from './util';
import { For } from '../for';

should();

describe('For', () => {
  it('should render given array.', () => {
    testRender((renderer, document) => {
      const sub = subject();
      renderer.render(<For of={sub} each={i => <span>{i}</span>}/>).on(document.body);

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

  it('should provide indexes.', () => {
    testRender((renderer, document) => {
      const sub = subject();
      renderer.render(<For of={sub} each={(i, j) => <>{i}{j}</>}/>).on(document.body);

      sub(1, ['A', 'B', 'C']);
      document.body.textContent!.should.equal('A0B1C2');
      sub(1, ['A', 'C', 'B']);
      document.body.textContent!.should.equal('A0C1B2');
      sub(1, ['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('B0C1D2E3');
      sub(1, ['B', 'F']);
      document.body.textContent!.should.equal('B0F1');
    });
  });

  it('should provide `.get()` on callbags passed to `each()`.', () => {
    testRender((renderer, document, tools) => {
      const sub = subject();
      let r = '';
      renderer.render(<For of={sub} each={i => <div onclick={() => r = `${i.get()}`}>{i}</div>}/>).on(document.body);

      sub(1, ['A', 'B', 'C']);

      tools.click(document.body.firstElementChild as HTMLElement);
      r.should.equal('A');

      sub(1, ['B', 'C']);
      tools.click(document.body.firstElementChild as HTMLElement);
      r.should.equal('B');
    });
  });

  it('should properly render keyed arrays.', () => {
    testRender((renderer, document) => {
      const sub = subject<string[]>();
      renderer.render(<For of={sub} each={i => <span>{i}</span>} key={i => i}/>).on(document.body);

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

  it('should render keyed arrays in a keyed way.', () => {
    testRender((renderer, document) => {
      const sub = subject<string[]>();
      let r = 0;
      renderer.render(<For of={sub} each={i => <span>{++r}{i}</span>} key={i => i}/>).on(document.body);

      sub(1, ['A', 'B', 'C']);
      document.body.textContent!.should.equal('1A2B3C');
      sub(1, ['B', 'C', 'A']);
      document.body.textContent!.should.equal('2B3C1A');
    });
  });

  it('should provide index callbags for keyed arrays.', () => {
    testRender((renderer, document) => {
      const sub = state(['A', 'B', 'C']);
      renderer.render(<For of={sub} each={(i, j) => <>{i}{j}</>} key={i => i}/>).on(document.body);

      document.body.textContent!.should.equal('A0B1C2');
      sub(1, ['A', 'C', 'B']);
      document.body.textContent!.should.equal('A0C1B2');
      sub(1, ['B', 'C', 'D', 'E']);
      document.body.textContent!.should.equal('B0C1D2E3');
      sub(1, ['B', 'F']);
      document.body.textContent!.should.equal('B0F1');
    });
  });
});
