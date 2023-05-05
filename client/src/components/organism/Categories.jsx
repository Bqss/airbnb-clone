import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import { desc } from "./../../data/index";
import { useMemo } from "react";
import Container from "../atoms/Container";
import queryString from "query-string";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import WithFade from "./../templates/WithFade";

const Categories = () => {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const [scroll, setScroll] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(1000)
  const slider = useRef(null);
  const category = useMemo(() => params.get("category"), [params]);

  useEffect(() => {
    if(slider.current){
      setScrollWidth(slider.current.scrollWidth - slider.current.offsetWidth -50);
      slider.current.addEventListener('mousedown', handleMouseDown);
    }
  },[slider])

  const handleScroll = (ev) => {
    setScroll(ev.target.scrollLeft);
  };


  const handleMouseDown = (event) => {
    event.preventDefault();
    const scrollbar = slider.current;
    const startX = event.pageX;
    const startY = event.pageY;
    const startScrollLeft = scrollbar.scrollLeft;
  
    const handleMouseMove = moveEvent => {
      moveEvent.preventDefault();
      const dx = moveEvent.pageX - startX;
      const dy = moveEvent.pageY - startY;
      scrollbar.scrollLeft = startScrollLeft - dx;
    };
  
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  

  

  if (pathname !== "/") return null;

  return (
    <Container className="mt-6 relative">
      <nav
        className="w-full max-w-full scrollbar-none  overflow-x-auto"
        ref={slider}
        onScroll={handleScroll}
      >
        <div className="flex absolute inset-0 pointer-events-none">
          <WithFade show={scroll !== 0}>
            <div className="flex">
              <div className="flex items-center bg-white h-full">
                <button className="p-1 pointer-events-auto rounded-full border border-black  bg-white ">
                  <GrFormPrevious className="w-4 h-4" />
                </button>
              </div>
              <div className="px-4 bg-gradient-to-r h-full  from-white to-transparent"></div>
            </div>
          </WithFade>
          <WithFade show={scrollWidth > scroll}>
            <div className="ml-auto flex">
              <div className="px-4 bg-gradient-to-l h-full  from-white to-transparent"></div>
              <div className="flex items-center bg-white h-full">
                <button className="p-1 pointer-events-auto rounded-full border border-black  bg-white ">
                  <GrFormNext className="w-4 h-4" />
                </button>
              </div>
            </div>
          </WithFade>
        </div>
        <div className="grid grid-flow-col gap-8 ">
          {desc.map((d, i) => (
            <CategoryBox
              key={i}
              label={d.label}
              value={d.value}
              selected={category == d.value}
            >
              <d.icon className="w-7 h-7 " />
            </CategoryBox>
          ))}
        </div>
      </nav>
    </Container>
  );
};

const CategoryBox = ({ label, value, children, selected }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (ev) => {
      let currentQuery = {};
      let a = {};
      ev.preventDefault();

      if (location.search) {
        a = queryString.parse(location.search);
      }
      if (a.category == value) {
        currentQuery = {
          ...a,
        };
      } else {
        currentQuery = {
          ...a,
          category: value,
        };
      }

      navigate({
        pathname: "/",
        search: queryString.stringify(currentQuery),
      });
    },
    [location]
  );
  return (
    <button
      onClick={handleClick}
      className={`inline-flex border-b-2 py-1 transition-all duration-300  flex-col  gap-2  items-center hover:bg-white  ${
        selected
          ? "text-black border-b-black hover:border-b-black"
          : "text-gray-500 hover:text-black border-b-transparent hover:border-b-black/20"
      } `}
    >
      {children}
      <span className="text-sm truncate ">{label}</span>
    </button>
  );
};

export default Categories;
