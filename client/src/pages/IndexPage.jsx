import { useQuery } from "@tanstack/react-query";
import {AvenueCard} from "/src/components/molecules";
import AvenueApi from "../api/services/avenueApi";
import {Container} from "/src/components/atoms";

export default function IndexPage() {
  const { data, isLoading, isFetching } = useQuery({
    queryFn: AvenueApi.getAvenues,
    queryKey: ["avenues"],
    initialData: [],
  });

  if (isLoading || isFetching) {
    return (
      <Container>
        <div className="text-black ">Loading....</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {data.map((avenue, i) => (
          <AvenueCard data={avenue} key={i} />
        ))}
      </div>
    </Container>
  );
}
