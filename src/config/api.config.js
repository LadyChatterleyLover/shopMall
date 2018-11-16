const BASEURL = 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShopMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'users/register',
  loginUser: LOCALURL + 'users/login',
  goods: LOCALURL + 'goods/getDetailGoodsInfo',
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 得到大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubId: LOCALURL + 'goods/getGoodsListByCategorySubId', // 获取商品信息
}

module.exports = URL
