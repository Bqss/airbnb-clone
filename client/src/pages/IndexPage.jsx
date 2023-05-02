import { useQuery } from "@tanstack/react-query";
import Content from "../components/Content";
import AvenueCard from "../components/molecules/AvenueCard";
import AvenueApi from "../api/services/avenueApi";


export default function IndexPage() {

  const {data, isLoading, isFetching} = useQuery({
    queryFn : AvenueApi.getAllAvenue,
    queryKey : ["avenues"],
     initialData : []
  });

  if(isLoading || isFetching){
    return (
      <div className="text-black ">Loading....</div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {data.map((avenue, i) => <AvenueCard data={avenue} key={i}/>)}
    </div>
  );
}
