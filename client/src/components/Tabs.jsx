import React, {
  Fragment,
  createContext,
  memo,
  useContext,
  useEffect,
} from "react";
import {Transition} from "@headlessui/react";

const TabsContext = createContext({
  activeTab: 0,
});

const Tabs = ({ className, children, activeTab }) => {

  return (
    <TabsContext.Provider value={{activeTab}}>
      <div className={["", className].join(" ")}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.TabList = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
};

Tabs.Tab = () => {};

Tabs.Panels = memo(({ children, className }) => {

  return (
    <div className={["relative  ", className].join(" ")}>
      {children}
    </div>
  );
});

Tabs.Panel = ({ children, className, value}) => {
  const {activeTab} = useContext(TabsContext);

  return (
    <Transition

      show={activeTab === value}
      enter ="delay-1000 duration-1000 transition-all absolute top-0 inset-x-0 "
      enterFrom ="opacity-0 invisible"
      enterTo ="opacity-1 static visible"
      leave ="duration-1000 transition-all top-0 asbolute inset-x-0"
      leaveFrom ="opacity-100 top-0 inset-x-0 visible "
      leaveTo = "opacity-0 invisible"
      as={Fragment}
      className={"h-full px-7 py-5 "+className}
    >
      {children}
    </Transition>
  )
};



export default Tabs;
