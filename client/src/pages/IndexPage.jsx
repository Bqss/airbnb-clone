import { useQuery } from "@tanstack/react-query";
import Content from "../components/Content";
import AvenueCard from "../components/molecules/AvenueCard";
import AvenueApi from "../api/services/avenueApi";


export default function IndexPage() {

  const {data, isLoading} = useQuery({
    queryFn : AvenueApi.getAllAvenue,
    queryKey : ["avenues"],
     initialData : []
  })



  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((avenue, i) => <AvenueCard data={avenue} key={i}/>)}
    </div>
  );
}
