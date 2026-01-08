import { Header } from "@/widgets/header";

import { Router } from "./providers/router";

const App = () => {
  return (
    <>
      <Header />
      <main className="app">
        <Router />
      </main>
    </>
  );
};

export default App;
