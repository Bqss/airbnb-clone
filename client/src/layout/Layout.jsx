import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="p-4 flex flex-col min-h-screen max-w-7xl mx-auto">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>  
  );
}
