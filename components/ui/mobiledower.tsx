// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { 
//   FiHome, 
//   FiShoppingCart, 
//   FiShoppingBag, 
//   FiTruck, 
//   FiMail, 
//   FiX, 
//   FiUser 
// } from "react-icons/fi";
// import MenuItem from "../MenuItem"; 

// interface MobileDrawerProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   data?: {
//     data: Array<any>;
//   };
// }

// export default function MobileDrawer({ open, setOpen, data }: MobileDrawerProps) {
//   return (
//     <>
//       {open && (
//         <>
//           {/* Backdrop Overlay */}
//           <div
//             className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
//             onClick={() => setOpen(false)}
//           />

//           {/* Drawer Sheet */}
//           <div
//             className={`fixed top-0 left-0 z-50 h-screen w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
//               open ? "translate-x-0" : "-translate-x-full"
//             }`}
//           >
//             {/* Top Bar: Logo & Close Button */}
//             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//               <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
//                 <Image
//                   src="/logo.png" // Replace with your logo path
//                   alt="Sevenone Logo"
//                   width={140}
//                   height={40}
//                   className="h-9 w-auto object-contain"
//                 />
//               </Link>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="p-1.5 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition"
//                 aria-label="Close menu"
//               >
//                 <FiX className="text-xl" />
//               </button>
//             </div>

//             {/* Scrollable Navigation Body */}
//             <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
//               {/* Main Quick Links */}
//               <nav className="space-y-1 px-3">
//                 <Link
//                   href="/"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors"
//                 >
//                   <FiHome className="text-xl text-sky-500" />
//                   <span>Home</span>
//                 </Link>

//                 <Link
//                   href="/cart"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors"
//                 >
//                   <FiShoppingCart className="text-xl text-sky-500" />
//                   <span>Cart</span>
//                 </Link>

//                 <Link
//                   href="/flash-sales"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors"
//                 >
//                   <FiShoppingBag className="text-xl text-sky-500" />
//                   <span>Flash Sales</span>
//                 </Link>

//                 <Link
//                   href="/special-offers"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors"
//                 >
//                   <FiShoppingCart className="text-xl text-sky-500" />
//                   <span>Special Offers</span>
//                 </Link>

//                 <Link
//                   href="/track-order"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors"
//                 >
//                   <FiTruck className="text-xl text-sky-500" />
//                   <span>Track Order</span>
//                 </Link>

//                 <Link
//                   href="/contact"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors"
//                 >
//                   <FiMail className="text-xl text-sky-500" />
//                   <span>Contact Us</span>
//                 </Link>
//               </nav>

//               {/* Menu Divider & Heading */}
//               <div className="mt-4 border-t border-gray-100 pt-4 px-5">
//                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                   MENU
//                 </span>
//               </div>

//               {/* Dynamic Category Menu Items */}
//               <div className="mt-2">
//                 {data?.data.map((category) => (
//                   <MenuItem
//                     key={category.id}
//                     item={category}
//                     mobile
//                     onSelect={() => setOpen(false)}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Bottom Section: Sign In / Register Button */}
//             <div className="p-4 border-t border-gray-100 bg-white">
//               <Link
//                 href="/login"
//                 onClick={() => setOpen(false)}
//                 className="flex items-center justify-center gap-2.5 w-full py-3 bg-[#29b6f6] hover:bg-[#029ae4] text-white font-semibold text-base rounded-xl transition-colors shadow-sm"
//               >
//                 <FiUser className="text-xl" />
//                 <span>Sign In / Register</span>
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }