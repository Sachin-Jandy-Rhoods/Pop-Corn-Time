import React, { useEffect } from 'react'
import SideBar from './SideBar'
import Uploder from '../../../Components/Uploder'
import { Input } from '../../../Components/UsedInputs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileValidation } from '../../../Components/Validation/UserValidation'
import { InlineError } from '../../../Components/Notfications/Error'

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = useSelector(
    (state) => state.userLogin
  );

  //validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });
  //onSubmit
  const onSubmit = async (data) => {
    console.log(data);
    
  };
//useEffect
useEffect(()=>{
  setValue("fullName",userInfo?.fullName);
  setValue("email",userInfo?.email);
 
},[userInfo,setValue])
  return (
    <SideBar>
      <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold'>Profile</h2>
        <Uploder/>
        <div className="w-full">
            <Input
             label="FullName"
             placeholder="netflexo react tailwind"
             type="text"
              name="fullName"
              register={register("fullName")}
              bg={true}
            />
            {errors.fullName && <InlineError text={errors.fullName.message} />}
          </div>

        <div className="w-full">
            <Input
             label="FullName"
             placeholder="netflexo react tailwind"
             type="text"
              name="email"
              register={register("email")}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>

        <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
          <button className='bg-subMain transtions font-medium hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
            Delete Account
          </button>
          <button className='bg-main transtions font-medium hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
            Update Profile
          </button>
        </div>
      </form>
    </SideBar>
  )
}

export default Profile