import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';

const CarDetails = () => {

  const currency = import.meta.env.VITE_CURRENCY;

  const {id} = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  useEffect(()=>{
    setCar(dummyCarData.find(car => car._id === id));
  },[id]);

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
     <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
      <img src={assets.arrow_icon} className='rotate-180 opacity-65' alt="" />
      Back to all Cars
     </button>

     {/* ************** */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* left car image and details */}
      <div className="lg:col-span-2">
       <img src={car.image} className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md' alt="" />
       <div className="space-y-6">
        <div className="">
          <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
          <p className="text-gray-500 text-lg">{car.category} . {car.year}</p>
        </div>
        <hr className='border border-borderColor my-6'/>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
            {icon: assets.fuel_icon, text: `${car.fuel_type}`},
            {icon: assets.car_icon, text: `${car.transmission}`},
            {icon: assets.location_icon, text: `${car.location}`}
          ].map(({icon, text})=>(
            <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
              <img src={icon} className='h-5 mb-2' alt="" /> {text}
            </div>
          ))}
        </div>

       {/* description */}
        <div className="">
          <h2 className='text-xl font-medium mb-3'>Description</h2>
          <p className='text-gray-500'>{car.description}</p>
        </div>

        {/* features */}
        <div className="">
          <h2 className='text-xl font-medium mb-3'>Features</h2>
          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item)=>(
              <li key={item} className='flex items-center text-gray-500'>
                <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                {item}
              </li>
            ))}
          </ul>
        </div>

       </div>
      </div>

      {/* right booking form */}
      <form onSubmit={handleSubmit} className="shadow-lg h-max rounded-xl p-6 space-y-6 text-gray-500">
        <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
          {currency} {car.pricePerDay}
          <span className='text-base text-gray-400 font-normal'> per day</span>
        </p>
        <hr className='border border-borderColor my-6'/>

        <div className="flex items-center justify-between">
          <label htmlFor="pickup-date">Pickup Date</label>
          <input type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split("T")[0]}/>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="return-date">Return Date</label>
          <input type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='return-date'/>
        </div>
     
        <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>
        <p className='text-center text-sm'>No credit card required to reserve</p>

      </form>

     </div>
    </div>
  ) : <Loader />
}

export default CarDetails;
