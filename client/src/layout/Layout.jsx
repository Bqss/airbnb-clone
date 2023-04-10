import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
      <div className="p-4 flex flex-col min-h-screen max-w-7xl mx-auto">
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
    </div> 
    </> 
  );
}
