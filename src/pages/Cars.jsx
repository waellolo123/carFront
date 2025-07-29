import { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard';
import { useAppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cars = () => {

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");



  const {cars, axios} = useAppContext();
  const [input, setInput] = useState("");
  
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filterdCars, setFilteredCars] = useState([]);
  
  const searchAvailability = async () => {
    const {data} = await axios.post("/api/bookings/check-availability", {location: pickupLocation, pickupDate, returnDate});
    if(data.success){
      setFilteredCars(data.availableCars);
      if(data.availableCars.length === 0){
        toast("No Cars Available");
      }
      return null;
    }
  };

  useEffect(()=>{
    isSearchData && searchAvailability();
  },[]);
  

  return (
    <div>
      {/* ******************* */}
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title title="Available Cars" subTitle="Browse our selection of premium vehicles availables for your next adventure" />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} className='w-4.5 h-4.5 mr-2' alt="" />
          <input
          value={input} onChange={(e) => setInput(e.target.value)} 
          type="text" 
          placeholder='Search by make, model or Features' 
          className='w-full h-full outline-none text-gray-500' />
          <img src={assets.filter_icon} className='w-4.5 h-4.5 ml-2' alt="" />
        </div>
      </div>
      {/* ******************* */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
       <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filterdCars.length} Cars</p>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
        {filterdCars.map((car, index)=>(
          <div key={index}>
            <CarCard car={car}/>
          </div>
        ))}
       </div>
      </div>
    </div>
  )
}

export default Cars;
