import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';

import { makeRenderer } from '../../index';

export function testRender(test: (renderer: LiveDOMRenderer, document: Document) => void) {
  const dom = new JSDOM().window;
  const renderer = makeRenderer(dom);

  test(renderer, dom.document);
}
