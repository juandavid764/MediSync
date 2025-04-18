import '@testing-library/jest-dom' // Importa las utilidades de jest-dom

import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });