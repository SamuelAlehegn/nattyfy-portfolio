const appName = import.meta.env.VITE_APP_NAME?.trim() || 'React App';

export default function App() {
  return (
    <main>
      <h1>{appName}</h1>
      <p>Your React + TypeScript + Vite project is ready.</p>
    </main>
  );
}
