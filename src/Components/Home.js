import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Home() {
  return (
    <div className="sidebar-all home">
      <div className="content">
        <Header />
        <Sidebar />
      </div>
    </div>
  );
}
