import React from 'react';
// import ReactDOM from 'react-dom';
import FormTabs from './formTabs';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// modelo
// root.render(<App tab="home" />);

//ReactDOM.render(<FormTabs />, document.getElementById('root'));
root.render(<FormTabs tab="index" />, container);

