export const fetchUserData = async (sendRequest, token, uid) => {
  const userResponse = (
    await sendRequest('users', 'GET', null, {
      Authorization: `Bearer ${token}`,
    })
  ).users.find((user) => user.id === uid)
  userResponse.password = undefined
  userResponse._id = undefined
  userResponse.__v = undefined
  sessionStorage.setItem('userData', JSON.stringify(userResponse))
}
