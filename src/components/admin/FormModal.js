"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useCallback } from "react";

// LAZY LOADED FORMS
const CanteenForm = dynamic(() => import("../admin/forms/CanteenForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("../admin/forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

// FORM COMPONENTS MAP
const forms = {
  canteen: (type, data) => <CanteenForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const FormModal = ({ table, type, data, id }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaGreen"
      : type === "update"
      ? "bg-orange-200"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  // Handle delete confirmation submit to close modal after deletion
  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      // TODO: Add your delete logic here (API call)
      alert(`Deleted ${table} with ID: ${id}`);
      setOpen(false);
    },
    [id, table]
  );

  // Render the appropriate form or delete confirmation
  const RenderForm = () => {
    if (type === "delete" && id) {
      return (
        <form
          onSubmit={handleDelete}
          className="p-4 flex flex-col gap-4"
        >
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button
            type="submit"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
          >
            Delete
          </button>
        </form>
      );
    }

    if ((type === "create" || type === "update") && forms[table]) {
      return forms[table](type, data);
    }

    return <p>Form not found!</p>;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
        aria-label={`${type} ${table}`}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>

      {open && (
        <div
          className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <RenderForm />
            <button
              type="button"
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
