import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";



const CarCard = ({car}) => {

 const currency = import.meta.env.VITE_CURRENCY

 const navigate = useNavigate();

  return (
    <div 
    onClick={() => {navigate(`/car-details/${car._id}`); scrollTo(0, 0)}}
    className='group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer'>
      {/* card top  */}
     <div className="relative h-48 overflow-hidden">
      <img src={car.image} className='w-full h-full object-cover' alt="car image" />
      {car.isAvaliable && <p className='absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
       <span className='font-semibold'>{currency}{car.pricePerDay}</span>
       <span className=' text-sm text-white/80'> / day</span>
      </div>
     </div>
     {/* card bottom */}
     <div className="p-4 sm:p-5">

      <div className="flex justify-between items-start mb-2">
        <div className="">
          <h3 className="text-lg font-medium">{car.brand} {car.model}</h3>
          <p className="text-muted-forground text-sm">{car.category} . {car.year}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
        <div className="flex items-center text-sm text-muted-forground">
          <img src={assets.users_icon} className="h-4 mr-2" alt="" />
          <span>{car.seating_capacity} Seats</span>
        </div>
        <div className="flex items-center text-sm text-muted-forground">
          <img src={assets.fuel_icon} className="h-4 mr-2" alt="" />
          <span>{car.fuel_type}</span>
        </div>
        <div className="flex items-center text-sm text-muted-forground">
          <img src={assets.car_icon} className="h-4 mr-2" alt="" />
          <span>{car.transmission}</span>
        </div>
        <div className="flex items-center text-sm text-muted-forground">
          <img src={assets.location_icon} className="h-4 mr-2" alt="" />
          <span>{car.location}</span>
        </div>
      </div>

     </div>
    </div>
  )
}

export default CarCard;
