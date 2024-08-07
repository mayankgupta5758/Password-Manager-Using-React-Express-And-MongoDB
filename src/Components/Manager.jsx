/* eslint-disable no-unused-vars */
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords);
        setPasswordArray(passwords);
    }

    useEffect(() => {
        getPassword()
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("Icons/eyecross.png")) {
            ref.current.src = "Icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "Icons/eyecross.png"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            // console.log(...passwordArray, form);

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id:form.id }) })

            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            setform({ site: "", username: "", password: "" })
            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Password Not Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing Password", id);
        setform({...passwordArray.filter(item => item.id === id)[0], id:id});
        setPasswordArray(passwordArray.filter(item => item.id != id));
    }

    const deletePassword = async (id) => {
        console.log("Deleting Password", id);
        setPasswordArray(passwordArray.filter(item => item.id != id));
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)));
        let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const handleChange = (e) => {
        setform({
            ...form, [e.target.name]: e.target.value
        })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#cfbdfc,transparent)]"></div></div>
            </div>

            <div className="color mx-auto">
                <h1 className='text-center'>
                    <span className='text-green-600 text-2xl font-bold drop-shadow-lg shadow-green-500'>&lt;</span>
                    <span className='text-2xl'>Pass</span>
                    <span className='text-green-600 text-2xl font-bold'>OP</span>
                    <span className='text-green-600 text-2xl font-bold drop-shadow-lg shadow-green-500'> /&gt;</span>
                </h1>
                <p className='text-center'>
                    <span className="font-semibold text-2xl text-green-600">Y</span>our
                    <span className="font-semibold text-2xl text-green-600">&nbsp; O</span>wn
                    <span className="font-semibold text-2xl text-green-600">&nbsp; P</span>assward
                    <span className="font-semibold text-2xl text-green-600">&nbsp; M</span>anager
                    <span className="font-semibold text-2xl text-green-600">.</span>
                </p>

                <div className="flex flex-col p-4 gap-8 w-2/3 m-auto text-purple-500 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL.' className='w-full p-4 py-1  rounded-full border border-green-300' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter UserName.' className=' rounded-full w-full p-4 py-1 border border-green-300' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password.' className=' rounded-full w-full p-4 py-1 border border-green-300' type="password" name="password" id="password" />
                            <span className='absolute right-[4px] top-[4px]' onClick={showPassword}>
                                <img ref={ref} className='p-1 cursor-pointer' width={26} src="/Icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='hov flex gap-5 justify-center text-yellow-100 items-center rounded-full border-2 border-purple-400 bg-green-600 w-fit px-4 py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover"
                            colors="primary:#29242e">
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="line ht"></div>
                <div className="passwords text-center">
                    <h2>
                        <span className="font-semibold text-2xl text-green-600">Y</span>our
                        <span className="font-semibold text-2xl text-green-600">&nbsp; P</span>asswords
                    </h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-fixed w-3/4 m-auto text-white">
                        <thead>
                            <tr className='bg-green-500'>
                                <th className='p-2 text-center'>Site</th>
                                <th className='p-2 text-center'>UserName</th>
                                <th className='p-2 text-center'>Password</th>
                                <th className='p-2 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='b text-black'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div >
        </>

    )
}

export default Manager
