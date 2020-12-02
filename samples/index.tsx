// tslint:disable: no-magic-numbers

import { state } from 'callbag-state';
import { makeRenderer } from '../src';

const renderer = makeRenderer();

const s = state('Hola');

renderer.render(<input type='text' _state={s}/>).on(document.body);
