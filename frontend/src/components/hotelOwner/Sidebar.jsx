import React from 'react'
import { assets } from '../../assets/assets' // Ensure this path is correct for your assets
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const sidebarLinks = [
        {name :"Dashboard", path: "/owner", icon: assets.dashboardIcon},
        {name :"Walk-In Booking", path: "/owner/walk-in-booking", icon: assets.walkicon},
        {name :"Physical Room", path: "/owner/physical-room", icon: assets.addIcon},
        {name :"List Room", path: "/owner/list-room", icon: assets.listIcon},
        {name :"History", path: "/owner/history", icon: assets.historyicon},
         ]

  return (
    <div className='md:w-64 w-16 border-r h-full text=base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
      {sidebarLinks.map((item, index)=>(
        <NavLink
          to={item.path}
          key={index}
          // The `end` prop should be used carefully with nested routes.
          // For '/owner', `end` is good. For others, `isActive` check is more robust.
          end={item.path === '/owner'} // Only apply 'end' for the exact dashboard path
          className={({isActive})=>
            `flex items-center py-3 px-4 md:px-8 gap-3 ${
                // Check if the current path starts with the item's path for broader active state
                isActive || (location.pathname.startsWith(item.path) && item.path !== '/owner')
                ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600"
                : "hover:bg-gray-100/90 border-white text-gray-700"
            }`}
        >
            <img src={item.icon} alt={item.name} className='min-h-6 min-w-6' />
            <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar