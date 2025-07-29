import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {

  const {axios, currency} = useAppContext();


  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoading) return null;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const {data} = await axios.post("/api/owners/add-car", formData);
      if(data.success){
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: ""
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1/2">
     <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing, availability and car specifications." />
     <form 
     onSubmit={handleSubmit} 
     className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
      {/* car image */}
      <div className="flex items-center gap-2 w-full">
        <label htmlFor="car-image">
          <img src={image ? URL.createObjectURL(image) : assets.upload_icon} className="h-14 rounded cursor-pointer" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="car-image" hidden accept="image/*"/>
        </label>
        <p className=" text-sm text-gray-500">Upload a picture of your car</p>
      </div>

      {/* car brand and model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col w-full">
          <label>Brand</label>
          <input 
          value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          type="text" placeholder="e.g BMW, Mercedes, Audi..." required/>
        </div>

       <div className="flex flex-col w-full">
          <label>Model</label>
          <input 
          value={car.model} onChange={(e) => setCar({...car, model: e.target.value})}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          type="text" placeholder="e.g X5, E-class, M4..." required/>
        </div>

      </div>

      {/* car, year, price, category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

       <div className="flex flex-col w-full">
          <label>Year</label>
          <input 
          value={car.year} onChange={(e) => setCar({...car, year: e.target.value})}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          type="number" placeholder="2025" required/>
        </div>

         <div className="flex flex-col w-full">
          <label>Daily Price ({currency})</label>
          <input 
          value={car.pricePerDay} onChange={(e) => setCar({...car, pricePerDay: e.target.value})}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          type="number" placeholder="100" required/>
        </div>

         <div className="flex flex-col w-full">
          <label>Category</label>
          <select className="px-3 py-2 mt-1 border box-border rounded-md outline-none" value={car.category} onChange={(e) => setCar({...car, category: e.target.value})}>
            <option value="">Select a Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>
        </div>

      </div>

      {/* car transmission  fuel type seating capacity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <div className="flex flex-col w-full">
          <label>Transmission</label>
          <select className="px-3 py-2 mt-1 border box-border rounded-md outline-none" value={car.transmission} onChange={(e) => setCar({...car, transmission: e.target.value})}>
            <option value="">Select a Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label>Fuel Type</label>
          <select className="px-3 py-2 mt-1 border box-border rounded-md outline-none" value={car.fuel_type} onChange={(e) => setCar({...car, fuel_type: e.target.value})}>
            <option value="">Select a Fuel Type</option>
            <option value="Gas">Gas</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

         <div className="flex flex-col w-full">
          <label>Seating Capacity</label>
          <input 
          value={car.seating_capacityr} onChange={(e) => setCar({...car, yseating_capacity: e.target.value})}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          type="number" placeholder="4" required/>
        </div>

        {/* car location */}
        <div className="flex flex-col w-full">
           <label>Location</label>
          <select className="px-3 py-2 mt-1 border box-border rounded-md outline-none" value={car.location} onChange={(e) => setCar({...car, location: e.target.value})}>
            <option value="">Select a Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Youston">Youston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
      </div>

        {/* description */}
       <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea rows={5}
          value={car.description} onChange={(e) => setCar({...car, description: e.target.value})}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine." required></textarea>
        </div>

       <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
        <img src={assets.tick_icon} alt="" />
        {isLoading ? "Listing..." : "List Your Car"}
       </button>

     </form>
    </div>
  )
}

export default AddCar;
