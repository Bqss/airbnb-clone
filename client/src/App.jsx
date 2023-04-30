import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { Provider } from "react-redux";
import mainStore from "./store/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function App() {
  return (
    // <UserContextProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={mainStore}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Provider>
    </QueryClientProvider>
    // </UserContextProvider>
  );
}

export default App;
