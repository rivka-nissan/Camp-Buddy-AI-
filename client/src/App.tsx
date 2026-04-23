import { useState } from "react";
import Home from "./components/Home";
import Chat from "./components/Chat";
import "./App.css";

export type Page = "home" | "chat";

function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="app">
      {page === "home" ? (
        <Home onStartChat={() => setPage("chat")} />
      ) : (
        <Chat onBack={() => setPage("home")} />
      )}
    </div>
  );
}

export default App;
