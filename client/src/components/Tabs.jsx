import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
} from "react";
import {Transition} from "@headlessui/react";

const TabsContext = createContext({
  activeTab: 0,
});

const Tabs = ({ className, children, activeTab }) => {
  console.log(activeTab);

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

Tabs.Panels = ({ children, className }) => {

  return (
    <div className={["translate duration", className].join(" ")}>
      {children}
    </div>
  );
};

Tabs.Panel = ({ children, className, value}) => {
  const {activeTab} = useContext(TabsContext);
  useEffect(() => {
    console.log("inndex :" + activeTab);
  },[activeTab])
  return (
    <Transition
      show={activeTab === value}
      enter ="duration-1000 absolute delay-1000 transition-all"
      enterFrom ="opacity-0  "
      enterTo ="opacity-1 "
      leave ="duration-1000 "
      leaveFrom ="opacity-100 "
      leaveTo = "opacity-0 absolute"
      className={"h-full px-7 py-5 "+className}
    >
      {children}
    </Transition>
  )
};



export default Tabs;
