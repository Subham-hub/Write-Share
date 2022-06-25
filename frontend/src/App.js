import React, { Suspense, lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import NavBar from './shared/Navigation/NavBar'
import LoadingSpinner from './shared/UIElements/LoadingSpinner/LoadingSpinner'
import { fetchBlogs } from './shared/store/blogSlice'
import { autoLogin } from './shared/store/userDataSlice'

const Home = lazy(() => import('./home/pages/Home'))
const Auth = lazy(() => import('./user/pages/Auth'))
const AddBlog = lazy(() => import('./blog/pages/AddBlog'))
const UpdateBlog = lazy(() => import('./blog/pages/UpdateBlog'))
const BlogDetail = lazy(() => import('./blog/pages/BlogDetail'))
const Blogs = lazy(() => import('./blog/pages/MyBlogs'))
const UserBlog = lazy(() => import('./user/components/UserBlog'))
const Userprofile = lazy(() => import('./user/components/UserProfile'))
const MyProfile = lazy(() => import('./user/pages/MyProfile'))

const App = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((s) => s.auth)

  useEffect(() => {
    dispatch(autoLogin())
    dispatch(fetchBlogs())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blog/:bid/details" element={<BlogDetail />} />
          {isLoggedIn && (
            <>
              <Route path="/:uid/profile" element={<Userprofile />}>
                <Route path="posts" element={<UserBlog />} />
              </Route>
              <Route path="/add-blog" element={<AddBlog />} />
              <Route path="/blog/:uid/edit/:bid" element={<UpdateBlog />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
export default App
