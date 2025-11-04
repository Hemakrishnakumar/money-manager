import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorProvider } from "./contexts/ErrorContext.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

// const isProduction = import.meta.env.VITE_ENV === 'production';
const isProduction = true;
const Root = (
  isProduction ? (
    <ErrorBoundary>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </ErrorBoundary>
  ) : (
    <App />
  )
);

createRoot(document.getElementById("root")!).render(Root)