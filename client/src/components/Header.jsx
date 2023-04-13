import { Link } from "react-router-dom";
import {
  toggleOpenAddAirbnbModal,
  toggleOpenLoginModal,
  toggleOpenRegisterModal,
} from "../fitures/modalSlice";
import Dropdown from "./Dropdown";
import { useDispatch } from "react-redux";
import Button from "./atoms/Button";

export default function Header() {
  const dispatch = useDispatch();

  return (
    <header className="p-4 w-auto bg-white flex items-center justify-between -mt-4 gap-[170px] fixed border-b-[1px] border-slate-200">
      <Link to={"/"} className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 -rotate-90"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
        <span className="font-bold text-xl">airbnb</span>
      </Link>
      <div className="flex border border-gray-300 px-4 py-2 rounded-full gap-2 shadow-md shadow-gray-300">
        <div>Ke mana saja</div>
        <div className="border-l border-gray-300"></div>
        <div>Minggu mana pun</div>
        <div className="border-l border-gray-300"></div>
        <div>Tambahkan tamu</div>
        <div className="border-l border-gray-300"></div>
        <button className="text-red p-1 rounded-full bg-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="space-x-3 flex items-center text-sm">
        <div className="flex items-center">
          <Button
            className="rounded-full text-sm text-slate-950 mt-1"
            onClick={() => dispatch(toggleOpenAddAirbnbModal())}
          >
            Jadikan Rumah Anda AirBnb
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>

        <Dropdown>
          <Dropdown.Button
            className={
              "flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 rounded-full py-2 px-4 "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Dropdown.Button>
          {/* {!!user && <div>{user.name}</div>} */}
          <Dropdown.Body
            className={
              "p-1 bg-white flex flex-col border-2 border-gray-200  rounded-lg overflow-hidden shadow-md w-[40vw] max-w-[13rem]"
            }
          >
            <Dropdown.Item onClick={() => dispatch(toggleOpenLoginModal())}>
              Masuk
            </Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(toggleOpenRegisterModal())}>
              Daftar
            </Dropdown.Item>
          </Dropdown.Body>
        </Dropdown>
      </div>
    </header>
  );
}
