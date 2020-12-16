import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { testCallbagAppendSupport } from '../plugins/test/spec/append.spec';
import { testCallbagClassSupport } from '../plugins/test/spec/class.spec';
import { testCallbagContentSupport } from '../plugins/test/spec/content.spec';
import { testCallbagEventHandlerSupport } from '../plugins/test/spec/event-handler.spec';
import { testCallbagInputValueSupport } from '../plugins/test/spec/input-value.spec';
import { testCallbagInputStateSupport } from '../plugins/test/spec/input-state.spec';
import { testCallbagPropSupport } from '../plugins/test/spec/prop.spec';
import { testCallbagStyleSupport } from '../plugins/test/spec/style.spec';
import { testCallbagTrackSupport } from '../plugins/test/spec/track.spec';

import { makeRenderer } from '../index';

describe('callbag-jsx', () => {
  require('../plugins/test');
  require('../components/test');

  describe('makeRenderer()', () => {
    const D = new JSDOM().window;
    const C = (node: Node) => (node as HTMLElement).innerHTML;
    const L = () => D.document.body;
    const P = (node: Node, prop: string) => (node as HTMLElement).getAttribute(prop)!;

    testCallbagAppendSupport<Node, LiveDOMRenderer>((...plugins) => makeRenderer(D).plug(...plugins), C, L);
    testCallbagContentSupport<Node, LiveDOMRenderer>((...plugins) => makeRenderer(D).plug(...plugins), C, L);
    testCallbagPropSupport<Node, LiveDOMRenderer>((...plugins) => makeRenderer(D).plug(...plugins), P, L);
    testCallbagTrackSupport<Node, LiveDOMRenderer>((...plugins) => makeRenderer(D).plug(...plugins), L);

    testCallbagClassSupport((dom, ...plugins) => makeRenderer(dom).plug(...plugins));
    testCallbagStyleSupport((dom, ...plugins) => makeRenderer(dom).plug(...plugins));
    testCallbagEventHandlerSupport((dom, ...plugins) => makeRenderer(dom).plug(...plugins));
    testCallbagInputStateSupport((dom, ...plugins) => makeRenderer(dom).plug(...plugins));
    testCallbagInputValueSupport((dom, ...plugins) => makeRenderer(dom).plug(...plugins));
  });
});
