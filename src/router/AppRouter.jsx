import { Route, Routes } from "react-router-dom"
import { Landing } from "../components/pages/Landing"
import { Layout } from "../components/layout/Layout"
import { LogIn } from "../components/pages/LogIn"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { UserProfile } from "../components/pages/UserProfile"
import { CreatePost } from "../components/pages/CreatePost"
import { Post } from "../components/pages/Post"
import { Search } from "../components/pages/Search"
import { SavePosts } from "../components/pages/SavePosts"


const AppRouter = () => {


    return (
        <Routes>
            <Route element={ <Layout/> } >
                <Route path="/" element={ <Landing/> } />
                <Route path="/profile/:id" element={ <UserProfile/> } />
                <Route path="/crear_post" element={ <CreatePost/> } />
                <Route path="/post/:id" element={ <Post/> } />
                <Route path="/search/:category" element={ <Search/> } />
                <Route path="/search/:category/:search" element={ <Search/> } />
                <Route path="/saveposts" element={ <SavePosts/> } />


            </Route>
            <Route path="/login" element={ <LogIn/> } />
        </Routes>
    )
}

export default AppRouter