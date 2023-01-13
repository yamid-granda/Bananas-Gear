import { useState } from 'react'
import Input from '@/components/Input/Input'

function App() {
  const [inputValue, setInputValue] = useState('jazz')

  return (
    <div>
      <Input
        value={inputValue}
        onInput={setInputValue}
      />
      { inputValue }
    </div>
  )
}

export default App
