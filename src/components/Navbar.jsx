import Brand from '../assets/Tee Commerce.svg'
import { BsBag, BsPerson, BsSearch } from "react-icons/bs";
const Navbar = () => {
   return (
      <div id="navbar" className='bg-white shadow-md sticky'>
         <div className="container mx-auto py-6 flex items-center justify-between">
            <div id="brand">
               <img src={Brand} alt="" />
            </div>
            <div id="link" className='flex items-center gap-20 font-medium'>
               <span>Pria</span>
               <span>Wanita</span>
               <span>Anak</span>
            </div>
            <div id="rightMenu" className='flex items-center justify-between gap-4'>
               <BsSearch className='' />
               <input type="text" className='outline-none border-b' />
               <BsBag className='' />
               <BsPerson />
            </div>
         </div>
      </div>
   )
}

export default Navbar