import { useLocation } from "react-router-dom";

import { Notification } from "@/shared/ui/Notification/Notification";
import { Header } from "@/widgets/header";

import { Router } from "./providers/router";

const App = () => {
  const { pathname } = useLocation();

  const hideHeader = ["/login"];
  const isHeaderVisible = !hideHeader.includes(pathname);

  return (
    <>
      {isHeaderVisible ? <Header /> : null}
      <main className="app">
        <Router />
        <Notification />
      </main>
    </>
  );
};

export default App;
