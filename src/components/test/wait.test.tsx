/* eslint-disable newline-before-return */
import { should } from 'chai';
import subject from 'callbag-subject';

should();

import { testRender } from './util';
import { Wait } from '../wait';


describe('Wait', () => {
  it('should wait for the given promise and then render with resolved value.', done => {
    testRender((renderer, document) => {
      let res: any;
      const src = new Promise(r => res = r);

      renderer.render(<Wait for={src} with={() => <>Loading ...</>} then={i => <>{i}</>}/>).on(document.body);
      document.body.textContent!.should.equal('Loading ...');
      res('Hola hola!');
      setTimeout(() => {
        document.body.textContent!.should.equal('Hola hola!');
        done();
      }, 1);
    });
  });

  it('should keep waiting if the promise rejects.', done => {
    testRender((renderer, document) => {
      let rej: any;
      const src = new Promise((_, r) => rej = r);

      renderer.render(<Wait for={src} with={() => <>Loading ...</>} then={i => <>{i}</>}/>).on(document.body);
      document.body.textContent!.should.equal('Loading ...');
      rej();
      setTimeout(() => {
        document.body.textContent!.should.equal('Loading ...');
        done();
      }, 1);
    });
  });

  it('should wait for the next value of given callbag and then render with resolved value.', () => {
    testRender((renderer, document) => {
      const src = subject();
      src(1, 'Hey there!');

      renderer.render(<Wait for={src} with={() => <>Loading ...</>} then={i => <>{i}</>}/>).on(document.body);
      document.body.textContent!.should.equal('Loading ...');
      src(1, 'Hola hola!');
      document.body.textContent!.should.equal('Hola hola!');
    });
  });

  it('should keep waiting if the source errors.', () => {
    testRender((renderer, document) => {
      const src = subject();
      src(1, 'Hey there!');

      renderer.render(<Wait for={src} with={() => <>Loading ...</>} then={i => <>{i}</>}/>).on(document.body);
      document.body.textContent!.should.equal('Loading ...');
      src(2, 'Hola hola!');
      document.body.textContent!.should.equal('Loading ...');
    });
  });

  it('should only read one value from the source.', () => {
    testRender((renderer, document) => {
      const src = subject();
      let r = 0;
      src(1, 'Hey there!');

      renderer.render(<Wait for={src} then={i => {
        r++;
        return <>{i}</>;
      }}/>).on(document.body);

      r.should.equal(0);
      src(1, 'Hola hola!');
      r.should.equal(1);
      src(1, 'Hola hola!');
      r.should.equal(1);
      src(1, 'Even with different values?');
      r.should.equal(1);
    });
  });
});
