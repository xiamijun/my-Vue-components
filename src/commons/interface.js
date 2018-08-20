const inter = {}
inter.install = function(Vue) {
	const baseUrl = {
    // url: "http://10.4.0.227:8080/mdm/",//彭江华/
    url: "http://10.4.0.246:8080/mdm/",//胡
	}
	const ME = {
    getUserId:baseUrl.url + "/user/info",//获取用户id

	}

	Vue.prototype.ME = ME;
	Vue.prototype.baseUrl = baseUrl;
}
export default inter
