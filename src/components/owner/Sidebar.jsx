import { NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";


const Sidebar = () => {

  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
     <div className="group relative">
      <label htmlFor="image">
        <img src={image ? URL.createObjectURL(image) : user?.image || ""} className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto" alt="" />
        <input type="file" id="image" accept="image/*" hidden onChange={(e)=>setImage(e.target.files[0])}/>
        <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
         <img src={assets.edit_icon} alt="" />
        </div>
      </label>
     </div>
     {image && (
      <button onClick={updateImage} className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer">
        Save <img src={assets.check_icon} width={13} alt="" />
      </button>
     )}
     <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
     {/* menu items */}
     <div className="w-full">
      {ownerMenuLinks.map((link, index)=>(
        <NavLink 
        className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname ? "bg-primary/10 text-primary" : "text-gray-600"}`} 
        to={link.path} key={index}>
         <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="icons" />
         <span className="max-md:hidden">{link.name}</span>
         <div className={`${link.path === location.pathname && "bg-primary"} w-1.5 h-8 rounded-lg right-0 absolute`}></div> 
        </NavLink>
      ))}
     </div>
    </div>
  )
}

export default Sidebar;
