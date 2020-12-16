/* eslint-disable newline-before-return */

import { should } from 'chai';
import subject from 'callbag-subject';

import { testRender } from './util';
import { Conditional } from '../conditional';

should();


describe('Conditional', () => {
  it('should render stuff on page when given condition holds.', () => {
    testRender((renderer, document) => {
      const ref = <div/>;
      const condition = subject();

      renderer.render(<Conditional
        if={condition}
        then={() => <>Hellow</>}
        else={() => <>World</>}
      />).on(ref);
      renderer.render(ref).on(document.body);

      ref.textContent.should.equal('');
      condition(1, true);
      ref.textContent.should.equal('Hellow');
      condition(1, false);
      ref.textContent.should.equal('World');
      condition(1, true);
      ref.textContent.should.equal('Hellow');
      condition(1, false);
      ref.textContent.should.equal('World');
    });
  });

  it('should only invoke given functions when value of given callbag changes.', () => {
    testRender((renderer, document) => {
      const condition = subject();
      let r = 0;

      renderer.render(<Conditional
        if={condition}
        then={() => { r++; return <>Hellow</>; }}
      />).on(document.body);

      condition(1, true);
      condition(1, false);
      condition(1, true);
      condition(1, true);
      condition(1, false);

      r.should.equal(2);
    });
  });
});
