import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

library.add(fas, far, fab)

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])


  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }

  }, [])

  const copyText = (text) => {
    toast('Copy to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/public/eye-close.png")) {
      ref.current.src = "/public/eye.png"
      passwordRef.current.type = "text"
    }
    else {
      ref.current.src = "/public/eye-close.png"
      passwordRef.current.type = "password"
    }

  }

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast(" Error: Password not Seved")
    }
  }
  

  const deletePassword = (id) => {
    console.log("Delete password with id", id)
    let c = confirm("Do you really want to delete this password")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('Password deleted!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    // console.log([...passwordArray, form]);
  }

  const editPassword = (id) => {
    console.log("Edit password with id", id)
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(150%_150%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="mainContainer p-2 md:p-0 md:mycontainer py-9 min-h-[85.6vh]">

        <h1 className="text-4xl text font-bold text-center">
          <span className="text-purple-500">&lt;</span>
          <span>Pass</span><span className="text-purple-500">OP/&gt;</span>
        </h1>

        <p className="text-purple-900 text-lg text-center">Your Own Password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className=" flex flex-col text-black gap-8  rounded-full border border-purple-500 w-full p-4 py-1" type="text" name="site" id="site" />

          <div className=" flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="rounded-full border border-purple-500 w-full p-4 py-1" type="text" name="username" id="username" />

            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="rounded-full border border-purple-500 w-full p-4 py-1" type="password" name="password" id="password" />
              <span className='absolute right-[5px] top-[5px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className="p-1" src="/public/eye-close.png" alt="close-eye" style={{ width: '24px', height: '24px', display: 'block' }} />
              </span>
            </div>

          </div>

          <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-purple-300 text-white hover:bg-purple-600 rounded-full px-8 py-2 w-fit border-2 border-purple-900 cursor-pointer ">
            <FontAwesomeIcon icon="fa-solid fa-cart-plus" style={{ color: "#6633ee", }} />
            Add Save
          </button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show </div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-purple-800 text-white'>
              <tr>
                <th className='py-2 w-95'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>

              </tr>
            </thead>
            <tbody className='bg-purple-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index} className=''>

                  <td className='py-2 border border-white text-center w-32'><a href={item.site} target="_blank">{item.site}</a>
                    <FontAwesomeIcon icon="fa-regular fa-copy" style={{ color: "#6633ee", }} className='px-1 cursor-pointer ' onClick={() => { copyText(item.site) }} />
                  </td>
                  <td className=' py-2 border border-white text-center w-32'>{item.username}
                    <FontAwesomeIcon icon="fa-regular fa-copy" style={{ color: "#6633ee", }} className='px-1 cursor-pointer' onClick={() => { copyText(item.username) }} />
                  </td>
                  <td className=' py-2 border border-white text-center w-32'>{item.password}
                    <FontAwesomeIcon icon="fa-regular fa-copy" style={{ color: "#6633ee", }} className='px-1 cursor-pointer' onClick={() => { copyText(item.password) }} />
                  </td>
                  <td className=' py-2 border border-white text-center w-32'>
                    <FontAwesomeIcon icon="fa-solid fa-pen" style={{ color: "#6633ee", }} className='px-2 cursor-pointer' onClick={() => { editPassword(item.id) }} />
                    <FontAwesomeIcon icon="fa-regular fa-trash-can" style={{ color: "#6633ee", }} className='px-1 cursor-pointer' onClick={() => { deletePassword(item.id) }} />
                  </td>

                </tr>
              })}
            </tbody>
          </table>
          }
        </div >

      </div >

    </>
  )
}

export default Manager
