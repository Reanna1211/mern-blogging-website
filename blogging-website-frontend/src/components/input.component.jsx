import user from "../imgs/user icon.png"
import email from "../imgs/email icon3.png"
import password from "../imgs/password icon.png"
import eyeClosed from "../imgs/eye icon.png"
import eyeOpen from "../imgs/eye open.png"
import { useState } from "react"

const InputBox = ({ name, type, id, value, placeholder }) => {

    const [ passwordVisible, setPasswordVisible ] = useState(false)
    return (
        <div className="relative w-[100%] mb-4">
            <input 
                name={name}
                type={ type == "password" ? passwordVisible ? "text" : "password" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box pl-[50px]"
            />

    {/* Render icon based on placeholder or name */}
  {placeholder === "Full Name" && (
    <img src={user} alt="User icon" className="input-icon w-[24px] h-[24px]" />
  )}
  {placeholder === "Email" && (
    <img src={email} alt="Email icon" className="input-icon w-[24px] h-[24px]" />
  )}
  {placeholder === "Password" && (
    <img src={password} alt="Password icon" className="input-icon w-[24px] h-[24px]" />
  )}

  {
        type == "password" ? 
        <img src={passwordVisible ? eyeOpen : eyeClosed} className="input-icon w-[24px] h-[24px] left-[auto] right-4 cursor-pointer" 
        onClick={() => setPasswordVisible(currentVal => !currentVal)

            
        }/> 
        : ""
  }
</div>
    )
}

export default InputBox;