import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root') as HTMLElement;
const store = setupStore();
createRoot(root).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
