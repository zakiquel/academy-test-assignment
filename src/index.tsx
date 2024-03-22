import {createRoot} from "react-dom/client";
import App from "./app/App";

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение.');
}

const root = createRoot(container);

root.render(
  <App />
);