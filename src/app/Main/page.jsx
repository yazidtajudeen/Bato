'use client';
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import preg from '@/assets/images/preg.jpg'
import black from '@/assets/images/black.png'
import Link from 'next/link'
import line from '@/assets/images/line.png'
import doc from '@/assets/images/Doctors.png'
import Gyn from '@/assets/images/Gyn.png'
import { IoMdArrowForward } from "react-icons/io";
import Circle from '@/Components/Circle';
import { Mother } from '@/Components/Mother';
import { FaUserNurse } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";

const Main = () => {
  const images = [preg, black, Gyn];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative'>
      <div className={`transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={images[currentImageIndex]}
          alt='pregnant lady and a nurse image'
          className='h-full w-full object-cover'
          height={800}
          width={1200}
          priority
        />
      </div>
      <div className='absolute inset-0 font-medium text-white' style={{ fontSize: '35px', marginLeft: '12rem', marginTop: '22rem', fontFamily: 'Barlow' }}>
        Empowering Maternal Health  <br />in Sierra Leone
        <p className='' style={{ fontFamily: 'poppins', fontSize: '16px', marginTop: '2rem', fontWeight: 'normal' }}>
          At Bato, we are dedicated to transforming maternal health <br />
          outcomes for pregnant women in Sierra Leone. Join us in <br />
          our mission to ensure every mother has access to skilled <br />
          midwives and safe childbirth.
        </p>
        <Link href=''>
          <button className='bg-[#AE4B68] hover:bg-[#c799a7] transition-colors duration-200' style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 'normal', display: 'flex', padding: '9px 15px', borderRadius: '6px', marginTop: '2rem', textAlign: 'center', }}>
            <span className='ml-7'>Get Started</span>
            <IoMdArrowForward className='ml-3 mt-1' />
          </button>
        </Link>
      </div>
      <div className='' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{paddingLeft:'5rem'}}>
          <span className='flex mt-14'>
            <Image
              src={line}
              width={50}
              height='auto'
              className='ml-10'
              alt="line icon"
            />
            <h4>
              <span className='font-medium ml-4' style={{ fontFamily: 'Barlow', fontSize: '40px' }}>
                Why Choose Bato?
              </span>
            </h4>
          </span>
          <span style={{display:'flex', marginLeft:'30px', marginTop:'5rem'}}>
            <Circle icon={Mother} />
            <h3 className='font-semibold mt-3 ml-4' style={{fontSize:'24px'}}>
             Maternity Care
            </h3>
          </span>
          <span className='font-normal mt-5' style={{fontSize:'16px'}}>
            <p style={{marginLeft:'6.5em'}}
            >Comprehensive support for expecting mothers.</p>
          </span>
        <span style={{display:'flex', marginLeft:'30px', marginTop:'5rem'}}>
            <Circle icon={FaUserNurse} />
            <h3 className='font-semibold mt-3 ml-4' style={{fontSize:'24px'}}>
            Access to Skilled Midwives
            </h3>
          </span>
          <span className='font-normal mt-5' style={{fontSize:'16px'}}>
            <p style={{marginLeft:'6.5em'}}
            >Our network of experienced midwives is ready to assist you.</p>
          </span>
          <span style={{display:'flex', marginLeft:'30px', marginTop:'5rem'}}>
            <Circle icon={MdEmergency} />
            <h3 className='font-semibold mt-3 ml-4' style={{fontSize:'24px'}}>
           Emergency support
            </h3>
          </span>
          <span className='font-normal mt-5' style={{fontSize:'16px'}}>
            <p style={{marginLeft:'6.5em'}}
            >provides instant access to nearby skilled midwives or emergency services,</p>
          </span>
        </div>
        <div className='mr-16 mt-20 p-10'>
          <Image
            src={doc}
            width={800}
            height={800}
            alt="doctors image"
            priority
          />
        </div>
      </div>

      <div className='mt-10 p-10'>
        <span className='flex mt-14'>
          <Image
            src={line}
            width={50}
              height='auto'
            className='ml-10'
            alt='line icon'
            priority
          />
          <h3 
          >Find a Skilled Midwife</h3>
        </span>
        <span>
          <Link href="/See-More">
            <button>

            </button>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Main
