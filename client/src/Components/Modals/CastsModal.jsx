import React from "react";
import MainModal from "./MainModal.jsx";
import { Input } from "../UsedInputs.jsx";
import Uploder from "../Uploder.jsx";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block  border border-border text-center lg:w-full w-full allign-middle p-5  h-full bg-main text-white rounded-xl ">
        <h2 className="text-3xl font-bold">{cast ? "Update Cast" : "Create Cast"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Cast Name"
            placeholder={cast ? cast.fullName : "John Doe"}
            type="text"
            bg={false}
          />
                    <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Cast Image
            </p>
            <Uploder />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src={`../../../public/${cast ? cast.image : "favicon.png"}`}
                alt={cast?.fullName}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"  }
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
