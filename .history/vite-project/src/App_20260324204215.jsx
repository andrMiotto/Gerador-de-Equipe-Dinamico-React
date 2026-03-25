import { useState } from 'react'
import './App.css'
import UserGenerator from './components/UserGenerator';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <UserGenerator />
      </main>
    </>
  )
}

export default App
