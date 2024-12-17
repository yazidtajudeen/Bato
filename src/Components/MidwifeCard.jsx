import React from 'react'
import { IoLocation } from "react-icons/io5"

const MidwifeCard = ({ image, name, specialty, location, onClick }) => {
  return (
    <div className="border rounded-lg shadow-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(174,75,104,0.2)] hover:-translate-y-2 cursor-pointer" style={{ width: '300px', height: '400px' }}>
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col h-[calc(426px-192px)]">
        <div className="text-left mb-2">
          <span className="bg-pink-100 text-pink-600 text-sm font-medium px-3 py-1 rounded-full">
            {specialty}
          </span>
          <h3 className="font-medium mt-5" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
            {name}
          </h3>
        </div>
        
        <div className="flex-grow flex flex-col justify-end">
          <p className="text-base flex items-center text-[#444444] mb-8">
            <IoLocation className="mr-1 text-[#444444] text-lg" /> 
            {location}
          </p>
          
          <div className="flex justify-end pr-2">
            <button
              className="bg-[#AE4B68] text-white rounded-lg hover:bg-pink-700 flex items-center justify-center text-sm"
              style={{ 
                width: '277px', 
                height: '35px',
                padding: '0 24px',
                marginBottom: '20px'
              }}
              onClick={onClick}
            >
              Book An Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidwifeCard