import { useState,useCallback, useEffect, useRef } from "react";
function App() {
  const [password, setPassword] = useState();
  const [length , setLength] = useState(8)
  const [numbers , setNumbers] = useState(false);
  const [char , setChar] = useState(false);
  const copyPass = useRef()

  const gerneratePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    if(numbers) str += '1234567890';
    if(char) str += '!@#$%^&*()_-|/?';

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length);
      pass += str.charAt(random)
    }
    setPassword(pass)
  },[length,numbers,char,setPassword])

  const handleCopy = () => {
    copyPass.current?.select();
    copyPass.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password)
  }
useEffect(() => {
  gerneratePassword()
},[length,numbers,char,gerneratePassword])

  return (
    <>
      <div className="bg-gray-200 h-screen w-full flex justify-center align-center">
        <div className="w-1/2 bg-gray-800 h-1/2 my-10 rounded-3xl">
        <div className="my-8 w-full flex justify-center align-center">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            ref={copyPass}
            className="w-2/3 h-10 px-5 outline-none border border-black  rounded-l-xl text-black"
            />
          <button 
          onClick={handleCopy} 
          className="bg-blue-500 rounded-r-xl h-10 w-20 text-white">
          Copy
          </button>
          </div>
          <div className="flex align-center justify-center ">
            <input 
            type="range" className="mx-4"
            min={4} max={12}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
             />
            <label className="text-white mr-10" >Length:  {length}</label>
            <input 
            type="checkbox"
            className="mx-4"
            defaultChecked = {numbers}
            onChange={()=>{setNumbers(prevNum => !prevNum)}}
             />
            <label className="text-white mr-10" >Numbers</label>
            <input 
            type="checkbox"
            className="mx-4"
            defaultChecked = {char}
            onChange={()=>{setChar(prevChar => !prevChar)}}
            />
            <label className="text-white mr-10" >Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
