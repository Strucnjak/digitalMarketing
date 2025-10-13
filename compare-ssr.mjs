import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import { jsx } from 'react/jsx-runtime';
import { AppRoutes } from './dist/server/src/routes.js';
import { InitialStateProvider } from './dist/server/src/components/InitialStateContext.js';
import { BrowserRouter } from './dist/server/src/router/react-router-dom.js';

function noop() {}

const matchMediaStub = () => ({
  matches: false,
  addEventListener: noop,
  removeEventListener: noop,
});

const localStorageStub = {
  getItem: () => null,
  setItem: noop,
  removeItem: noop,
};

const createElementStub = () => ({
  setAttribute: noop,
  appendChild: noop,
  remove: noop,
  textContent: '',
});

global.window = {
  location: { pathname: '/', search: '', hash: '' },
  history: {
    state: {},
    pushState: noop,
    replaceState: noop,
    go: noop,
  },
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: noop,
  localStorage: localStorageStub,
  matchMedia: matchMediaStub,
  innerWidth: 1024,
  scrollY: 0,
  requestAnimationFrame: (cb) => setTimeout(() => cb(Date.now()), 0),
};

global.document = {
  documentElement: { lang: 'me' },
  head: {
    appendChild: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
  },
  body: {
    appendChild: noop,
  },
  createElement: () => createElementStub(),
  querySelector: () => null,
};

global.navigator = { userAgent: 'node' };

const initialState = { locale: 'me', footerYear: 2025 };

const tree = jsx(StrictMode, {
  children: jsx(InitialStateProvider, {
    value: initialState,
    children: jsx(BrowserRouter, {
      children: jsx(AppRoutes, {}),
    }),
  }),
});

const clientHtml = renderToString(tree);
console.log(clientHtml);
