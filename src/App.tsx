import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Problem from './Problem'

function App(): React.ReactElement {
  return (
    <main className="w-full min-h-[100dvh] flex flex-col p-32 gap-8 bg-zinc-100 text-zinc-700">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problem/:id" element={<Problem />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
