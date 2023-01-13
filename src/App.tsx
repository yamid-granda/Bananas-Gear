import { useState } from 'react'
import Input from './components/Input/Input'

function App() {
  const [inputValue, setInputValue] = useState('jazz')

  return (
    <div>
      <Input value={inputValue} setValue={setInputValue} />
    </div>
  )
}

export default App
