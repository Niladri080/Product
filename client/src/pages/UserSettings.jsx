import React, { useContext, useRef, useState } from "react";
import {
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Image as ImageIcon,
  Settings,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

const UserSettings = () => {
  const [loading, setloading] = useState(false);
  const {user,setuser}=useContext(UserContext);
  const name=useRef(null);
  const email=useRef(null);
  const navigate=useNavigate();
  const handleLogout=()=>{
    setloading(true);
    axios.post("http://localhost:4000/api/user/logout",{},{withCredentials:true})
    .then((res=>{
      setuser(null);
      localStorage.removeItem("user");
      if (res.data.success){
        setloading(false);
        navigate("/");
      }
    }))
    .catch((error)=>{
      setloading(false);
      console.log(error.message);
      navigate('/login');
    })
  }
  const handleUpdate=(e)=>{
    setloading(true);
    axios.post('http://localhost:4000/api/dashboard/update-profile',{id:user._id,name:name.current.value,email:email.current.value},{withCredentials:true})
    .then(res=>{
      if (res.data.success){
        setloading(false);
        toast.success("Your profile updated successfully");
        setuser(res.data.user);
      }
      else{
        setloading(false);
        toast.warning(res.data.message);
      }
    })
    .catch((err) => {
      setloading(false);
      console.log(err);
      toast.error("Network error. Please try again later");
    });
  }
  return (
    <div className='flex justify-center items-center'>
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mt-[5%]">
      {/* Header */}
      <div className="flex items-center mb-8 gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold shadow-md">
          <User className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Settings</h2>
          <p className="text-gray-500">
            Manage your profile and account preferences
          </p>
        </div>
      </div>

      {/* Profile Update Form (Design Only) */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <User className="w-4 h-4" /> Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Full Name"
              ref={name}
              defaultValue={user.name} 
              />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email Address"
              ref={email}
              defaultValue={user.email}
            />
          </div>
          <div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={()=>{
              if (!loading){
                handleUpdate();
              }
            }
            }
            className={`${loading && 'bg-blue-400 hover:bg-blue-500'} bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors cursor-pointer opacity-70`}
            
          >
            {loading?'Updating':'Update Profile' }
          </button>
          <button
          onClick={()=>{
            if (confirm("Are you sure cancel?")){
              navigate('/user/dashboard')
            }
          }}
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-not-allowed opacity-70"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* Other Settings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Lock className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Change Password</span>
          </div>
          <button
            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors cursor-not-allowed opacity-70"
            disabled
          >
            Change
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Settings className="w-5 h-5 text-indigo-500" />
            <span className="font-medium">Account Preferences</span>
          </div>
          <button
            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors cursor-not-allowed opacity-70"
            disabled
          >
            Edit
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* Logout */}
      <div className="flex justify-end space-x-2">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors" onClick={()=>{
         navigate('/user/dashboard');
        }}>
          <ArrowLeft className="w-5 h-5" /> Back To Home
        </button>
        <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors" onClick={()=>{
          if (confirm("Are you sure logout?")){
            handleLogout();
          }
        }}>
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserSettings;
