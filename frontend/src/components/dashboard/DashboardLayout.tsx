import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { SearchProvider } from "../../context/SearchContext";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SearchProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#090817]">

        {/* ================= SIDEBAR ================= */}
        <div className="h-screen shrink-0">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>

        {/* ================= MAIN AREA ================= */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* ================= NAVBAR ================= */}
          <div className="shrink-0">
            <Navbar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </div>

          {/* ================= CONTENT ================= */}
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3">
            <Outlet />
          </main>

        </div>
      </div>
    </SearchProvider>
  );
};

export default DashboardLayout;