import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home/home'
import { Dashboard } from './Dashboard/dashboard'
import { CreateAgent } from './Built/Createagent'
import { ChatbotCustomizer } from './Chatbot/Chatbot'
import Signup from './Signup/signup'
import Signin from './Signin/signin'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create' element={<CreateAgent />} />
      <Route path='/chatbot' element={<ChatbotCustomizer />} />
    </Routes>
  )
}
export default App
