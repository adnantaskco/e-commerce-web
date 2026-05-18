import React from 'react'
import "flag-icons/css/flag-icons.min.css";
import Image from 'next/image';



function Navbar1() {

   
  return (
    <>
    <section className='container mx-auto px-6 bg-black  py-2'>
        <div className='flex justify-between items-center text-white'>
       <div>
        <p>Tell a friends about Styleway Fashion & get 30% off your next order.</p>
        </div> 
       <div>
        <a href="#" className='border-r-2 px-4 border-gray-700 '> Need Help?</a>  
        <a href="#" className='border-r-2 px-4 border-gray-700 '>Track Order</a>

     

          <select
            onChange={(e) => console.log(e.target.value)}
            className="px-2  text-sm border-r border-gray-700 outline-none cursor-pointer bg-black text-white"
            defaultValue="en"
          >
            <option value="en"> English</option>
            <option value="fr"> Français</option>
            <option value="es"> Español</option>
            <option value="de"> Deutsch</option>
            <option value="it"> Italiano</option>
            <option value="pl"> Polski</option>
          </select>
          <select
            onChange={(e) => console.log(e.target.value)}
            className="px-2  text-sm border-r outline-none cursor-pointer border-gray-700 bg-gray-900 text-white"
            defaultValue="usd"
          >
            <option value="usd"> $ USD </option>
            <option value="eur"> € EUR </option>
          </select>
                </div>
                
              </div>
              </section>
    
    </>
  )
}

export default Navbar1