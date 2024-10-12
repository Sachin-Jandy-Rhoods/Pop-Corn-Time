import React from "react";
import MainModal from "./MainModal.jsx";
import { Input } from "../UsedInputs.jsx";
import { HiPlusCircle } from "react-icons/hi";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block  border border-border text-center lg:w-full w-full allign-middle p-5  h-full bg-main text-white rounded-xl ">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Actions"}
            type="text"
            bg={false}
          />
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {category ? "Update" : "Add"  }
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
