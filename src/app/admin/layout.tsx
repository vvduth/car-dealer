import AdminHeader from "@/components/layouts/admin-header";
import AdminSidebar from "@/components/layouts/admin-sidebar";
import React, { PropsWithChildren } from "react";
import { AI } from "../_actions/ai";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <AI>
      <div className="flex bg-gray-900 text-gray-300 min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main
            className="admin-scrollbar flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto"
          >
            {children}
          </main>
        </div>
      </div>
    </AI>
  );
};

export default AdminLayout;
