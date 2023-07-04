import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AvenueCard } from "/src/components/molecules";
import { Fragment, forwardRef, useEffect } from "react";
import AvenueApi from "../api/services/avenueApi";
import { Container } from "/src/components/atoms";
import { AvenueSkeleton } from "../components/molecules";
import { Transition } from "@headlessui/react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useParams, useSearchParams } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";

export default function IndexPage() {
  const query =   useQueryParams();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    refetch,
    hasNextPage = true,
    fetchNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = { page: 0 } }) => {
      return AvenueApi.getAvenues({ page: pageParam.page, limit: 12, category: query.get("category")||"" });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    refetchOnMount : false,
    queryKey: ["avenues"],
  });
  useEffect(()=>{
    refetch();
  },[query])
  const loader = Array(12).fill({});
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (
      entry?.isIntersecting &&!isFetching && hasNextPage & !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [entry, ref]);


  return (
    <Container>
      <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pb-10">
        {loader.map((_, i) => (
          <Transition
            show={((isLoading || isFetching) && !isFetchingNextPage)}
            leave="transition-all duration-500 "
            leaveFrom="opacity-100"
            key={i}
            leaveTo="opacity-0 hidden"
          >
            <AvenueSkeleton key={i} />
          </Transition>
        ))}
        {data?.pages?.map((page) => {
          return page.data.map((avenue, i) => (
            <Transition
              show={!isLoading && !isRefetching}
              appear
              key={i}
              enter="transition-all delay-500 duration-500   "
              enterFrom="opacity-0 hidden"
              enterTo="opacity-100"
            >
                <AvenueCard data={avenue} key={i} />
          
            </Transition>
          ));
        })}
        {loader.slice(0, 6).map((_, i) => (
          <Transition
            show={(hasNextPage || isRefetching) }
            key={i}
            leave="transition-all  "
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
          >
            <AvenueSkeleton key={i} />
          </Transition>
        ))}
      </div>
      <Observer ref={ref} className="w-full" />
    </Container>
  );
}

const Observer = forwardRef(({ className }, ref) => {
  return <div className={className + " h-2"} ref={ref}></div>;
});
