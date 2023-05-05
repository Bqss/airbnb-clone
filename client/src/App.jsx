import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";

import axios from "axios";
import { Provider } from "react-redux";
import mainStore from "./store/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailedAvenuePage from "./pages/DetailedAvenuePage";


const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false,
    }
  }
});

function App() {
  return (
    // <UserContextProvider>
    <QueryClientProvider client={queryClient} >
      <Provider store={mainStore}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/rooms/:id" element={<DetailedAvenuePage/>}/>
          </Route>
        </Routes>
      </Provider>
    </QueryClientProvider>
    // </UserContextProvider>
  );
}

export default App;
