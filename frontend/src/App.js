import React, { Suspense, lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import NavBar from './shared/Navigation/NavBar'
import LoadingSpinner from './shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from './shared/UIElements/Modal/Modal'
import { authActions } from './shared/store/authSlice'
import { useHttp } from './shared/hooks/http-hook'
import { fetchBlogs } from './shared/store/blogSlice'
import { fetchUserData } from './utils/fetchUser'
import { userDataActions } from './shared/store/userDataSlice'

const Home = lazy(() => import('./home/pages/Home'))
const Auth = lazy(() => import('./user/pages/Auth'))
const AddBlog = lazy(() => import('./blog/pages/AddBlog'))
const UpdateBlog = lazy(() => import('./blog/pages/UpdateBlog'))
const BlogDetail = lazy(() => import('./blog/pages/BlogDetail'))
const Blogs = lazy(() => import('./blog/pages/MyBlogs'))
const UserBlog = lazy(() => import('./user/components/UserBlog'))
const Userprofile = lazy(() => import('./user/components/UserProfile'))
const MyProfile = lazy(() => import('./user/pages/MyProfile'))
const EditMyProfile = lazy(() => import('./user/pages/EditMyProfile'))

const App = () => {
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn)
  const { uid, token } = useSelector((s) => s.userData)
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const dispatch = useDispatch()

  const userData = localStorage.getItem('userData')
  if (userData) {
    const { uid, name, token } = JSON.parse(userData)
    dispatch(authActions.login())
    dispatch(userDataActions.setData({ uid, name, token }))
  }

  useEffect(() => {
    if (isLoggedIn) fetchUserData(sendRequest, token, uid)
    dispatch(fetchBlogs())
  }, [sendRequest, uid, isLoggedIn, token, dispatch])

  return (
    <>
      <NavBar />
      <Modal
        open={error ? true : false}
        handleClose={clearError}
        modalDescription={error}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
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
                <Route path="/edit-profile" element={<EditMyProfile />} />
                <Route path="*" element={<Navigate to="/auth" replace />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      )}
    </>
  )
}
export default App
