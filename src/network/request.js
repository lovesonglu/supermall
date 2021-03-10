import axios from 'axios'

//方案四：
export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
      //baseURL: 'http://123.207.32.32:8000',
      baseURL: 'http://152.136.185.210:8000/api/w6',
      timeout: 5000
    })

    //2.1.axios的拦截器(请求拦截)
    instance.interceptors.request.use(config => {
      //console.log(config);
      //1.比如config中的一些信息不符合服务器要求

      //2.比如发送网络请求时，显示一个请求中的图标

      //3.某些网络请求（比如登录token），必须携带一些特殊信息
      return config;//拦截处理后需返回
    }, err => {
      console.log(err);
    });

    //2.2响应拦截
    instance.interceptors.response.use(res => {
      //console.log(res);
      return res.data;
    },err => {
      console.log(err);
    })

    //3.发送真正的网络请求
    return instance(config)
}
