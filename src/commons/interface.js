const inter = {}
inter.install = function(Vue) {
	const baseUrl = {
    url: " https://easy-mock.com/mock/5ba99832d7eb4275f939a576/OBE_selectUser",
	}
	const ME = {
    teacherList:baseUrl.url + "/teacherList", // 教师列表

	}

	Vue.prototype.ME = ME;
	Vue.prototype.baseUrl = baseUrl;
}
export default inter
