import axios from 'axios'
import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [isLoading, setIsloading] = useState()
  const [error, setError] = useState()

  const sendRequest = useCallback(
    async (endpoint, method = 'GET', data, headers, type = 'mb') => {
      try {
        setIsloading(true)
        const response = await axios({
          method,
          url:
            type === 'mb'
              ? `${process.env.REACT_APP_BACKEND_URL}/${endpoint}`
              : endpoint,
          data,
          headers,
        })
        setIsloading(false)
        return response.data
      } catch (e) {
        setIsloading(false)
        setError(e.response.data.message)
        throw e
      }
    },
    [],
  )

  const clearError = () => {
    setError(null)
  }

  return { sendRequest, isLoading, error, clearError }
}
