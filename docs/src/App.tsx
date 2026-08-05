import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DocPage from "./components/DocPage";
import NotFound from "./pages/NotFound";
import { navItems } from "./navigation";

function App() {
  return (
    <div className="doc-shell">
      <Sidebar />
      <main className="doc-main">
        <Routes>
          {navItems.map((item) => (
            <Route key={item.path} path={item.path} element={<DocPage item={item} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
