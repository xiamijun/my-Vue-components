const funcs = {}
funcs.install = function (Vue) {
  function getUrlData(val) {
    var uri = window.location.href;
    var re = new RegExp("" + val + "=([^&?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
  }
  function netDataErr () {
    this.$alert('数据返回失败', '请重新获取', {
      confirmButtonText: '确定',
      callback: action => {

      }
    });
  }
  function netDataSearchErr () {
    this.$alert('查询数据为空', '请重新查询', {
      confirmButtonText: '确定',
      callback: action => {

      }
    });
  }
  Vue.prototype.getUrlData = getUrlData;
  Vue.prototype.netDataErr = netDataErr;
  Vue.prototype.netDataSearchErr = netDataSearchErr;
}

export default funcs
