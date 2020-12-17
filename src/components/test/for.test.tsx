import { should } from 'chai';
import subject from 'callbag-subject';

import { testRender } from './util';
import { For } from '../for';

should();

describe('For', () => {
  it('should render given array.', () => {
    testRender((renderer, document) => {
      const sub = subject();
      const ref = <div/>;
      renderer.render(<For of={sub} each={i => <span>{i}</span>}/>).on(ref);
      renderer.render(ref).on(document.body);

      sub(1, ['A', 'B', 'C']);
      ref.textContent.should.equal('ABC');
      sub(1, ['A', 'C', 'B']);
      ref.textContent.should.equal('ACB');
      sub(1, ['B', 'C', 'D', 'E']);
      ref.textContent.should.equal('BCDE');
      sub(1, []);
      ref.textContent.should.equal('');
    });
  });

  it('should provide indexes.', () => {
    testRender((renderer, document) => {
      const sub = subject();
      const ref = <div/>;
      renderer.render(<For of={sub} each={(i, j) => <>{i}{j}</>}/>).on(ref);
      renderer.render(ref).on(document.body);

      sub(1, ['A', 'B', 'C']);
      ref.textContent.should.equal('A0B1C2');
      sub(1, ['A', 'C', 'B']);
      ref.textContent.should.equal('A0C1B2');
      sub(1, ['B', 'C', 'D', 'E']);
      ref.textContent.should.equal('B0C1D2E3');
      sub(1, ['B', 'F']);
      ref.textContent.should.equal('B0F1');
    });
  });
});
