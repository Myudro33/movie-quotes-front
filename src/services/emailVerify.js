import axiosInstance from '../config/axios-config'


export const verify = async (url) => {
  if (url.query.email === 'email') {
    await axiosInstance.get(`/verify-email/${url.params.token}`).then((response) => {
      return response.data.stage
    }).catch(() => {
      return false
    })
  } else if (url.query.email === 'reset-password') {
    await axiosInstance.post(`/verify-token/${url.query.user}`, { token: url.params.token }).then((response) => {
      return response.data.stage
    }).catch(() => {
      return false
    })
  } else if (url.query.email === 'email-update') {
    return await axiosInstance
      .post(`/update-email/${url.params.token}`, {
        new_email: url.query.new
      })
      .then((response) => {
        return response.data.stage
      }).catch(() => {
        return false
      })
  }
}