import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Banner() {
    const [visible,setVisible] = useState(true);

    // if(!visible){
    //     return null;
    // }
  return (
    visible && <div className="flex mb-10 items-center gap-x-6 bg-gradient-to-r from-[#c7ae6a] to-[#1a1a1a] px-5 py-3 sm:px-5 w-full">
        <div className="flex justify-center lg:gap-20 w-full lg:px-10 items-center">
            <div className="banner-details flex flex-wrap gap-y-2 items-center">
                <p className='text-sm sm:text-base text-gray-100'><span className='font-bold'>Workshop on : </span>Career on Web Development in Nepal</p>
                <a href="" className='rounded-full ml-3 bg-gray-900 px-3.5 py-1 text-sm font-semibold text-gray-200 shadow-sm hover:bg-[#c7ae6a] hover:text-black'>
                    Register now <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
            <div className="h-full">
                <button type="button" className="focus-visible:outline-offset-[-4px] flex items-center" onClick={()=>setVisible(false)}>
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon aria-hidden="true" className="h-7 w-7 text-red-500 hover:bg-gray-50 rounded-full" />
                </button>
            </div>
        </div>
    </div>
  )
}
