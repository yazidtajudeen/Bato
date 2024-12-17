import React from 'react'
import MidwifeCard from './MidwifeCard';

const DocCard = () => {
 const midwives = [
    {
      image: "https://via.placeholder.com/300x200",
      name: "Dr. Madonna Kamara",
      specialty: "Gynecologist",
      location: "Goderich Kalah Drive",
    },
    {
      image: "https://via.placeholder.com/300x200",
      name: "Dr. Grace Smith",
      specialty: "Gynecologist",
      location: "Brooklyn Avenue",
    },
    {
      image: "https://via.placeholder.com/300x200",
      name: "Dr. Sarah Johnson",
      specialty: "Gynecologist",
      location: "Lumley Beach Road",
    },
    {
      image: "https://via.placeholder.com/300x200",
      name: "Dr. Fatima Sesay",
      specialty: "Gynecologist",
      location: "Wilkinson Road",
    },
  ];

  const handleBookAppointment = (name: string) => {
    alert(`Booking an appointment with ${name}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {midwives.map((midwife, index) => (
        <MidwifeCard
          key={index}
          image={midwife.image}
          name={midwife.name}
          specialty={midwife.specialty}
          location={midwife.location}
          onClick={() => handleBookAppointment(midwife.name)}
        />
      ))}
    </div>
  )
}

export default DocCard