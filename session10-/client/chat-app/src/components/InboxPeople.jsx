import React from "react";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

const InboxPeople = () => {
  return (
    <>
      <div className="inbox_people">
        {/* <!-- Searchbox inicio --> */}
        <Searchbox/>
        {/* <!-- Searchbox Fin -->
          <!-- Sidebar inicio --> */}
        
        <Sidebar/>
        {/* <!-- Sidebar Fin --> */}
      </div>
    </>
  );
};

export default InboxPeople;
