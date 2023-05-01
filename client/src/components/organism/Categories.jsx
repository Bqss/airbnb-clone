import React, { useCallback, useState } from "react";
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

const Categories = () => {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const category = useMemo(() => params.get("category"), [params]);

  if (pathname !== "/") return null;

  return (
    <Container className="mt-4">
      <nav className="grid grid-flow-col w-full max-w-full  gap-8 overflow-x-auto  py-4">
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
      className={`inline-flex border-b-2 py-1 transition-all duration-300 border-b-transparent flex-col  gap-2  items-center hover:bg-white  ${
        selected
          ? "text-black border-b-black hover:border-b-black"
          : "text-gray-500 hover:text-black hover:border-b-black/20"
      } `}
    >
      {children}
      <span className="text-sm truncate ">{label}</span>
    </button>
  );
};

export default Categories;
