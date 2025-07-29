import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";


const Layout = () => {

  const {isOwner, navigate} = useAppContext();

  useEffect(()=>{
    if(!isOwner){
      navigate("/");
    }
  },[isOwner]);

  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
       <Sidebar />
       <Outlet />
      </div>
    </div>
  )
}

export default Layout;
