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
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

const SettingsPage = ({setActiveTab}) => {
  const name=useRef(null);
  const email=useRef(null);
  const address=useRef(null);
  const phone=useRef(null);
  const {user,setuser}=useContext(UserContext);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
    axios.post("http://localhost:4000/api/admin/logout",{},{withCredentials:true})
    .then((res=>{
      setuser(null);
      localStorage.removeItem("user");
      if (res.data.success){
        navigate("/");
      }
    }))
    .catch((error)=>{
      console.log(error.message);
      navigate('/login');
    })
  }
  const handleUpdate=(e)=>{
    e.preventDefault();
    setloading(true);
    axios.post('http://localhost:4000/api/admin/dashboard/update-profile',{id:user._id,name:name.current.value,email:email.current.value,phone:phone.current.value,address:address.current.value},{withCredentials:true})
    .then(res=>{
      if (res.data.success){
        setuser(res.data.user);
        setloading(false);
        toast.success(res.data.message);
        setActiveTab('dashboard');
      }
      else{
        setloading(false);
        toast.error("Network error. Please try again later");
        setloading(false);
      }
    }).catch(err=>{
      console.log(err.message);
      setloading(false);
      toast.error("Network error. Please try again later");
    }
  )
  }
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center mb-8 gap-4">
        <img src={user.image} className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold shadow-md"/>
         
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>
          <p className="text-gray-500">
            Manage your profile and account preferences
          </p>
        </div>
      </div>

      {/* Profile Update Form (Design Only) */}
      <form className="space-y-6" onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <User className="w-4 h-4" /> Name
            </label>
            <input
              type="text"
              ref={name}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Full Name"
              defaultValue={user.name}
              />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              ref={email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email Address"
              defaultValue={user.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Phone className="w-4 h-4" /> Phone
            </label>
            <input
              type="tel"
              ref={phone}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Phone Number"
              defaultValue={user.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Address
            </label>
            <input
              type="text"
              ref={address}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Address"
              defaultValue={user.address}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            className={`${!loading && 'bg-blue-600'} ${loading && 'opacity-70'} text-white px-6 py-2 rounded-lg font-semibold ${!loading && 'hover:bg-blue-700'} transition-colors cursor-pointer`}
            
          >
            {loading && 'Updating'}
            {!loading && 'Update Profile'}
          </button>
          <button
            onClick={()=>{
              if (confirm("Are you sure to cancel")){
                setActiveTab('dashboard');
              }
            }}
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
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
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors" onClick={()=>{
          if (confirm("Are you sure logout?")){
            handleLogout();
          }
        }}>
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
