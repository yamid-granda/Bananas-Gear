import { useState } from 'react'
import Input from '@/ui/components/Input'

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
