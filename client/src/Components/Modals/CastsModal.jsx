import React, { useEffect, useState } from "react";
import MainModal from "./MainModal.jsx";
import { Input } from "../UsedInputs.jsx";
import Uploder from "../Uploder.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addCastAction,
  updateCastAction,
} from "../../Redux/Actions/MoviesActions.jsx";
import { InlineError } from "../Notfications/Error.jsx";
import { Imagepreview } from "../ImagePreview.jsx";
import toast from "react-hot-toast";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  //validate cast
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast Name is required"),
      })
    ),
  });
  //onSubmit
  const onSubmit = (data) => {
    // if cast is not null then update cast
    if (cast) {
      dispatch(
        updateCastAction({
          ...data,
          image: image,
          id: cast.id,
        })
      );
      toast.success("Cast updated successfully");
    } else {
      // else create cast
      dispatch(
        addCastAction({
          ...data,
          image: image,
          id: generateId,
        })
      );
      toast.success("Cast created successfully");
    }
    reset();
    setCastImage("");
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block  border border-border text-center lg:w-full w-full allign-middle p-5  h-full bg-main text-white rounded-xl ">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="Cast Name"
              placeholder="John Doe"
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast Image</p>
            <Uploder setImageUrl={setCastImage} />
            <Imagepreview
              image={image ? image : "../../../public/favicon.png"}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
