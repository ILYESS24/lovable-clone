// Stub simplifié pour Monaco Editor dans Next.js
import { loader } from "@monaco-editor/react";

// Configuration simplifiée pour éviter les erreurs de workers
export function setupMonaco() {
  if (typeof window !== 'undefined') {
    // Configuration basique pour Monaco Editor
    loader.config({
      paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.1/min/vs'
      }
    });
    
    // Setup simplifié sans workers
    (window as any).MonacoEnvironment = {
      getWorkerUrl: () => 'data:text/javascript;charset=utf-8,',
    };
  }
}

export default setupMonaco;