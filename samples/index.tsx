// tslint:disable: no-magic-numbers

import { Wait, makeRenderer } from '../src';

const renderer = makeRenderer();

renderer.render(
  <Wait concurrently
    for={fetch('https://pokeapi.co/api/v2/pokemon/charizard').then(res => res.json())}
    with={() => <>Loading ...</>}
    then={pokemon => <h1>{pokemon.sub('name')}</h1>}
  />
).on(document.body);

