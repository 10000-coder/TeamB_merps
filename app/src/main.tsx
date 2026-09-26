import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

/**
 * Mounted on <body> rather than a `#root` wrapper.
 *
 * The reference's <body> contains the header, mobile menu, main and footer as
 * direct children. A wrapper element would insert a level the reference does not
 * have, so every node in the port would sit at a different tree position -- which
 * makes a structural comparison compare the wrong elements against each other.
 *
 * The reference sets html[data-theme] from localStorage before paint (see the
 * inline bootstrap in index.html); nothing else is needed here.
 */
createRoot(document.body).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
