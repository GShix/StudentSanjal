import React, { useState } from 'react'

const LogoWithSearchBtn = () => {

    const [searchInput, setSearchInput] = useState(false);
  return (
    <>
        <div className="logo">
            <img className="w-56 sm:w-58 sm:h-16" src="/img/Home_logo.png" alt="" srcSet="" />
        </div>
        <div className="search-btn relative flex items-center max-w-[60%]">
            {searchInput &&
            (
            <div className="smallSearch md:hidden relative flex items-center max-sm:w-[97%]">
                <input type="text" name="search" id="" className="rounded-md max-sm:py-[6px] py-2 text-gray-600 text-[12.5px] placeholder:text-gray-700/50 w-full" placeholder="Search StudentSanjal"/>
                <i className="ri-close-fill absolute text-[#b99a45] font-semibold text-2xl right-2 cursor-pointer hover:text-gray-600" onClick={()=>setSearchInput(!searchInput)}></i>
            </div>
            )}
            {!searchInput &&
            <i className="ri-search-line absolute left-2  max-sm:text-base text-lg rounded-full max-md:text-gray-200 px-[5px] sm:px-[6px] py-[1px] max-md:cursor-pointer max-md:bg-[#b99a45] md:hidden" onClick={()=>setSearchInput(!searchInput)}></i>
            }

            <div className="bigSearch max-md:hidden flex items-center">
                <input type="text" name="search" id="" className="rounded-md border-transparent py-2 pl-8 text-gray-600 text-sm bg-[#EDF3F8] placeholder:text-gray-700/50" placeholder="Search StudentSanjal"/>
                <i className="ri-search-line text-gray-700/60 absolute left-2 text-lg rounded-full"></i>
            </div>
        </div>
    </>
  )
}

export default LogoWithSearchBtn
