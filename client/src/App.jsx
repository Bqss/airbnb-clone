import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import { Provider } from "react-redux";
import mainStore from "./store/main";
import toast from "react-hot-toast";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailedAvenuePage from "./pages/DetailedAvenuePage";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { ErrorPage, FavouritesPage, PropertiesPage, ReservationsPage, TripsPage } from "./pages";

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false
    }
  },
  queryCache : new QueryCache({
    onError : (error) => {
      if(error.response?.status >= 500 || error.message == "Network Error" ){
        toast.error("An error has occured, please try again later");
      }
    },
    
  }),
  mutationCache : new MutationCache({
    onError : (error) => {
      if(error.response.status >= 500){
        toast.error("An error has occured, please try again later");
      }
    }
  })
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
      <Provider store={mainStore}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/my-reservations" element={<ReservationsPage />} />
            <Route path="/my-trips" element={<TripsPage />} /> 
            <Route path="/my-favourites" element={<FavouritesPage />} /> 
            <Route path="/my-properties" element={<PropertiesPage />} /> 
            <Route path="/rooms/:id" element={<DetailedAvenuePage />} />
            
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
      
    </QueryClientProvider>
  );
}

export default App;
