import request from '@/models/request.js'; // 引入封装好的request

// 店铺的预约列表
function getAllBookingList (data) {
	return request({
		method: "GET", // 请求方式
		url: '/api/miniapp/getAllBookingList', // 请求url
		data: data ,// 参数
	})
}

// 获取预约详情
function getBooking (id) {
	return request({
		method: "GET", // 请求方式
		url: `/api/miniapp/getBookingOrder/${id}`, // 请求url
	})
}

// 获取服务类目
function serviceTime (id) {
	return request({
		method: "GET", // 请求方式
		url: `/api/miniapp/serviceTime/${id}`, // 请求url
	})
}

// 提交预约
function postBooking (params) {
	return request({
		method: "POST", // 请求方式
		url: `/api/miniapp/booking/${params.storeId}`, // 请求url
		data: params
	})
}

// 获取轮播图
function getStoreInfo (id) {
	return request({
		method: "GET", // 请求方式
		url: `/api/miniapp/getStoreInfo/${id}`, // 请求url
	})
}

// 取消预约
function cancelBookingOrder (id) {
	return request({
		method: "GET", // 请求方式
		url: `/api/miniapp/cancelBookingOrder/${id}`, // 请求url
	})
}

// 获取用户信息
function getContact (id) {
	return request({
		method: "GET", // 请求方式
		url: `/api/miniapp/get_contact_by_openid/${id}`, // 请求url
	})
}

// 获取手机号
function decodePhone (data) {
	return request({
		method: 'POST',
		url: '/api/miniapp/decrypt_data',
		data: data
	})
}

export default {
	getAllBookingList,
	getBooking,
	serviceTime,
	postBooking,
	getStoreInfo,
	cancelBookingOrder,
	getContact,
	decodePhone
}