import EditCustomerForm from "@/components/admin/customers/EditCustomerForm";
import React from "react";

const NewCustomerPage = () => {
  return (
    <div className="space-y-6">
        <h1 className="font-bold text-2xl">Add New Customer</h1>
        <div className="py-4 overflow-y-auto bg-gray-950 border border-gray-800 rounded-lg p-6">
            <EditCustomerForm />
        </div>
    </div>
  )
}

export default NewCustomerPage;
