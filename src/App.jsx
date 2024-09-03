import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import { UserContextProvider } from "./context/UserContext"

function App() {


  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppRouter/>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
