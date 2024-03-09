const qs = require('qs')
global.navigator = {appName: 'nodejs'}; // fake the navigator object
global.window = {}; // fake the window object
const jsencrypt = require('jsencrypt');
const pubkey = require('./pubkey')
var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlYsiV3DsG+t8OFMLyhdmG2P2J4GJwmwb1rKKcDZmTxEphPiYTeFIg4IFEiqDCATAPHs8UHypphZTK6LlzANyTzl9LjQS6BYVQk81LhQ29dxyrXgwkRw9RdWaMPtcXRD4h6ovx6FQjwQlBM5vaHaJOHhEorHOSyd/deTvcS+hRSQIDAQAB'
const encrypt = new jsencrypt()
encrypt.setPublicKey(PUBLIC_KEY)
 const data = qs.stringify({
            'app_version': "4.6.44",
            'registration_id': '',
            'uuid': '',
            'request_source': '3',
            'platform': '2',
            'mac':"CA:DE:D9:FD:1E:F7",
            'password': "Li0830m.",
            'system': '9',
            'school_id': 7,
            'model': "iphone",
            'app_id': 'cn.vanber.xixunyun.saas',
            'account': "21071230210",
            'key': ''
        })


const signdata = qs.stringify({
  address: process.env.ADDRESS,
  address_name: process.env.ADDRESS_NAME,
  latitude: encrypt.encrypt(process.env.LATITUDE),
  longitude: encrypt.encrypt(process.env.LONGITUDE),
  remark: 0,
  change_sign_resource: 0
})

const reportdata = (family_name, family_phone) => {
  return qs.stringify({
    health_type: 1,
    province_id: 0,
    city_id: 0,
    district_id: 0,
    hubei: 0,
    ill: 0,
    state: 1,
    family_name,
    family_phone,
    temperature: (36 + Math.random()).toFixed(1),
    safe: [],
    file: ''
  })
}

const headers = {
            'Host': 'api.xixunyun.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.8.1'
        }
const loginApi = 'https://api.xixunyun.com/login/api?platform=1&from=app&school_id=7&version=4.6.44'
const signApi = (token) => {
  return `https://api.xixunyun.com/signin_rsa?token=${token}&from=app&version=5.1.1&platform=android&entrance_year=0&graduate_year=0&school_id=${process.env.SCHOOL_ID}`
}
const studentReportApi = (token) => {
  return `https://api.xixunyun.com/health/studentlist?token=${token}&page_no=1&page_size=1`
}
const studentReportCommitApi = (token) => {
  return `https://api.xixunyun.com/health/add?token=${token}`
}
const mail = process.env.MAIL
const code = process.env.CODE
const token = process.env.TOKEN
module.exports = {
  data,
  signdata,
  reportdata,
  loginApi,
  signApi,
  studentReportApi,
  studentReportCommitApi,
  headers,
  mail,
  code,
  token
}
