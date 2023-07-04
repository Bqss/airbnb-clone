import React from 'react'
import { Container, Skeleton, UpperlinedDiv } from '../atoms';

const DetailPageSkeleton = () => {
  return (
    <Container size="md">
    <div className="flex justify-between items-end">
      <div className="flex flex-col gap-4">
        <Skeleton type="rect" height={5} width={60}></Skeleton>
        <Skeleton type="rect" height={3} width={40}></Skeleton>
      </div>
      <div className="flex space-x-4">
        <Skeleton type="rect" height={3} width={20}></Skeleton>
        <Skeleton type="rect" height={3} width={20}></Skeleton>
      </div>
    </div>
    <div className="mt-7 rounded-xl relative overflow-hidden  ">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
        {new Array(5).fill({}).map((f, i) => {
          if (i == 0) {
            return (
              <div className="row-span-2 col-span-2 h-full" key={i}>
                <Skeleton
                  type="rect"
                  className="aspect-square rounded-md"
                ></Skeleton>
              </div>
            );
          }
          return (
            <Skeleton
              type="rect"
              className="aspect-square rounded-md"
            ></Skeleton>
          );
        })}
      </div>
    </div>
    <div className="mt-10 flex gap-10">
      <div className="flex-1">
        <div className="flex justify-between">
          <Skeleton type="rect" height={6} width={60}></Skeleton>
          <Skeleton
            type="circle"
            width={10}
            className="aspect-square "
          ></Skeleton>
        </div>
        <div className="grid grid-cols-3 gap-2  mt-4">
          <Skeleton type="rect" className="rounded-lg" height={10}></Skeleton>
          <Skeleton type="rect" className="rounded-lg" height={10}></Skeleton>
          <Skeleton type="rect" className="rounded-lg" height={10}></Skeleton>
          <Skeleton type="rect" className="rounded-lg" height={10}></Skeleton>
        </div>
        <UpperlinedDiv className={"flex  items-center gap-4"}>
          <Skeleton
            type="rect"
            width={12}
            className="aspect-square rounded-md"
          ></Skeleton>
          <div className="space-y-4">
            <Skeleton
              type="rect"
              width={60}
              height={5}
              className=" rounded-md"
            ></Skeleton>
            <Skeleton
              type="rect"
              height={3}
              className=" rounded-md"
            ></Skeleton>
          </div>
        </UpperlinedDiv>

        <UpperlinedDiv>
          <Skeleton
            type="rect"
            width={80}
            height={5}
            className=" rounded-md"
          ></Skeleton>
          <Skeleton
            type="rect"
            height={3}
            className="mt-4 rounded-md"
          ></Skeleton>
          <Skeleton
            type="rect"
            height={3}
            className="mt-2 rounded-md"
          ></Skeleton>
          <Skeleton
            type="rect"
            height={3}
            className="mt-2 rounded-md"
          ></Skeleton>
        </UpperlinedDiv>
        <UpperlinedDiv>
          <Skeleton
            type="rect"
            width={80}
            height={5}
            className="rounded-md"
          ></Skeleton>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <Skeleton
              type="rect"
              width={40}
              height={8}
              className=" rounded-md"
            ></Skeleton>
            <Skeleton
              type="rect"
              width={40}
              height={8}
              className=" rounded-md"
            ></Skeleton>
            <Skeleton
              type="rect"
              width={40}
              height={8}
              className=" rounded-md"
            ></Skeleton>
          </div>
        </UpperlinedDiv>
        <UpperlinedDiv className={"w-full "}>
          <Skeleton
            type="rect"
            width={80}
            height={5}
            className=" rounded-md"
          ></Skeleton>
          <Skeleton
            type="rect"
            className="mt-4 aspect-square rounded-md"
          ></Skeleton>
        </UpperlinedDiv>
        <div className="pb-10"></div>
      </div>
      <div className="basis-96 relative">
        <div className="p-7 rounded-lg shadow-xl">
          <Skeleton
            type="rect"
            width={50}
            height={6}
            className=" rounded-md"
          ></Skeleton>

          <div className="mt-5">
            <Skeleton
              type="rect"
              height={30}
              className=" rounded-md"
            ></Skeleton>
          </div>
          <Skeleton
            type="rect"
            height={10}
            className=" rounded-xl mt-7"
          ></Skeleton>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex justify-between">
              <Skeleton
                type="rect"
                width={40}
                height={3}
                className=" rounded-md"
              ></Skeleton>
              <Skeleton
                type="rect"
                width={25}
                height={3}
                className=" rounded-md"
              ></Skeleton>
            </div>
            <div className="flex justify-between">
              <Skeleton
                type="rect"
                width={40}
                height={3}
                className=" rounded-md"
              ></Skeleton>
              <Skeleton
                type="rect"
                width={25}
                height={3}
                className=" rounded-md"
              ></Skeleton>
            </div>
            <div
              className={
                "flex justify-between border-t-2 border-gray-200 pt-3"
              }
            >
              <Skeleton
                type="rect"
                width={40}
                height={3}
                className=" rounded-md"
              ></Skeleton>
              <Skeleton
                type="rect"
                width={25}
                height={3}
                className=" rounded-md"
              ></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
  )
}

export default DetailPageSkeleton