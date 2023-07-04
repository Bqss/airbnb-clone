import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AvenueCard } from "/src/components/molecules";
import { Fragment, forwardRef, useEffect } from "react";
import AvenueApi from "../api/services/avenueApi";
import { Container } from "/src/components/atoms";
import { AvenueSkeleton } from "../components/molecules";
import { Transition } from "@headlessui/react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

import useQueryParams from "../hooks/useQueryParams";
import EmptyState from "../components/molecules/EmptyState";

export default function IndexPage() {
  const query = useQueryParams();
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
      return AvenueApi.getAvenues({ page: pageParam.page, limit: 12, category: query.get("category") || "" });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    refetchOnMount: false,
    queryKey: ["avenues"],
  });
  useEffect(() => {
    refetch();
  }, [query])
  const loader = Array(12).fill({});
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });
  let topLoader, body, bottomLoader;


  useEffect(() => {
    if (
      entry?.isIntersecting && !isFetching && hasNextPage & !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [entry, ref]);

  if (((isLoading || isFetching) && !isFetchingNextPage && !isRefetching)) {
    topLoader = loader.map((_, i) => (
      <Transition
        show={true}
        leave="transition-all duration-1000 "
        leaveFrom="opacity-100"
        key={i}
        leaveTo="opacity-0 hidden"
      >
        <AvenueSkeleton key={i} />
      </Transition>
    ))
  }
  if (!isLoading ) {
    body = data?.pages?.map((page) => {
      return page.data.map((avenue, i) => (
        <Transition
          show={true}
          appear
          key={i}
          enter="transition-all  duration-300   "
          enterFrom="opacity-0 "
          enterTo="opacity-100"
        >
          <AvenueCard  data={avenue} key={i} />

        </Transition>
      ));
    })

    if (data?.pages?.reduce((p, c) => p + c.data.length, 0) <= 0) return <Transition
      show={true}
      appear
      enter="transition-all  duration-1000   "
      enterFrom="opacity-0 "
      enterTo="opacity-100"
    >
      <EmptyState />
    </Transition>
  }

  if (hasNextPage ) {
    bottomLoader = loader.slice(0, 6).map((_, i) => (
      <Transition
        show={(true)}
        key={i}
        leave="transition-all  "
        leaveFrom="opacity-100 "
        leaveTo="opacity-0"
      >
        <AvenueSkeleton key={i} />
      </Transition>
    ))
  }

  return (
    <Container>
      <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pb-10">
        {topLoader}
        {body}
        {bottomLoader}
      </div>
      <Observer ref={ref} className="w-full" />
    </Container>
  );
}

const Observer = forwardRef(({ className }, ref) => {
  return <div className={className + " h-2"} ref={ref}></div>;
});
