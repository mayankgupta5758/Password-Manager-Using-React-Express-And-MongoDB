// eslint-disable-next-line no-unused-vars
import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-300 flex justify-around h-14 items-center'>
            <div className="logo">
                <span className='text-green-600 text-2xl font-bold drop-shadow-lg shadow-green-500'>&lt;</span>
                <span className='shad'>
                    <span className='text-2xl'>Pass</span>
                    <span className='text-green-600 text-2xl font-bold'>OP</span>
                </span>
                <span className='text-green-600 text-2xl font-bold drop-shadow-lg shadow-green-500'> /&gt;</span>
            </div>
            {/* <ul className='flex'>
                <li className='hover:font-bold'><a href="#">Home</a></li>
                <li className='hover:font-bold'><a href="#">About</a></li>
                <li className='hover:font-bold'><a href="#">Contact</a></li>
            </ul> */}
            <button className='invert hover:invert-0'>
                <img width={27} src="/Icons/github.svg" alt="github" />
            </button>
        </nav>
    )
}

export default Navbar
