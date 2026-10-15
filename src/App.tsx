import { DesktopHeader } from "./components/layout/DesktopHeader/DesktopHeader";
import { MobileSearchBar } from "./components/layout/MobileSearchBar/MobileSearchBar";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <DesktopHeader />
      <MobileSearchBar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-text-primary">
          Jungle Gaming — Frontend Challenge
        </h1>
      </main>
    </div>
  );
}

export default App;
