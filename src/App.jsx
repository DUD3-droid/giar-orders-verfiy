import { useState } from 'react'
import './App.css'
import { checkOrder } from './assets/utils'


function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  let [disDs, setDisDs] = useState('');
  let [ace, setAce] = useState([]);
  let [missing, setMissing] = useState('');

  const handleChange = (e, field) => {
    if (field === 'ace') setAce(e.target.value);
    else setDisDs(e.target.value);
  }

  const handleSubmit = () => {
    let missingData = checkOrder(ace, JSON.parse(disDs));

    setMissing(missingData);
    setIsChecked(true)
  }

  function handleCopy() {
    navigator.clipboard.writeText(missing);
    setIsCopied(true)

    setTimeout(()=>{
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold py-2 headline">
        GIAR Missing Orders Check
      </h1>

      <div className='flex gap-3 flex-col md:flex-row h-[50vh]'>
        <div className='flex-1 h-full'>
          <h3 className='p-3 font-bold text-xl'>JSON from DisDS DB</h3>
          <textarea className='w-full rounded-md block mb-2 text-sm font-medium h-[75%] p-3 outline-none' value={disDs} onChange={(e) => handleChange(e, 'dis')} />
        </div>
        <div className='flex-1 h-full'>
          <h3 className='p-3 font-bold text-xl'>Data from Ace DB</h3>
          <textarea className='w-full rounded-md block mb-2 text-sm font-medium h-[75%] p-3 outline-none' value={ace} onChange={(e) => handleChange(e, 'ace')} />
        </div>
      </div>

      <div className='flex justify-center items-center w-full'>
        <button className="check-btn" onClick={handleSubmit}>Check</button>
      </div>

      {isChecked && (
        <div className='flex flex-col result-div my-3'>
          <div className='flex w-full p-3 justify-center items-center '>
            Missing Orders : <input type='text' className='mx-3 p-3 w-[80%] rounded-lg outline-[2px] outline-black' value={missing} disabled />
          </div>
          <div className='flex justify-center items-center w-full'>
            {!isCopied ?
              <button className="copy-btn" onClick={handleCopy}>Copy</button> :
              <button className="copy-btn copied-btn">Copied!</button>
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default App
