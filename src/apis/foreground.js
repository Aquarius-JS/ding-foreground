import request from './request'

export const ForegroundAPI = {
  getProduct() {
    return request({
      method: 'GET',
      url: '/front/product'
    })
  },
  submit(data) {
    return request({
      method: 'POST',
      url: '/front/submit',
      data: data
    })
  }
}

export default ForegroundAPI
