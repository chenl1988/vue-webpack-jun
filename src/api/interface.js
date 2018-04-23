import { API_PATH } from './config'
import axios from 'axios'
import qs from 'qs'

function getData(_url, _data) {
    return axios.get(_url, {
        params: _data || {}
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.resolve(err.data)
    })
}

function postData(_url, _data) {
    return axios.post(_url, qs.stringify(_data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.resolve(err.data)
    })
}

export function checkSignUp() {
    return getData(
        API_PATH + '?action=signup'
        // {
        //     // openId: "o3XWV0pBAEJYwVCdwZRc4rWDY1V8"
        //     openId: "oAgNVwk2LnQDnZ7TrkXkrT7Q5wKw"
        //     // openId: "og_yDt-NQwxJk965NFEP9y-maITs"
        // }
    )
}

// 提交我要报名信息
export function checkSignupsubmit(params) {
    return postData(
        API_PATH + '?action=signupsubmit',
        params
    )
}

// 排行榜
export function checkRankingList() {
    return getData(
        API_PATH + '?action=rankinglist'
    )
}

// 购车榜
export function checkBuyCar() {
    return getData(
        API_PATH + '?action=purchase'
    )
}

// 我的推荐
export function checkMyrankinglist() {
    return getData(
        API_PATH + '?action=myrankinglist'
    )
}

// 现场推荐，用户信息验证
export function checkScene() {
    return getData(
        API_PATH + '?action=scene'
    )
}

// 现场推荐，信息录入
export function checkScenelist(params) {
    return postData(
        API_PATH + '?action=scenelist',
        params
    )
}

// 全部问题及对应的答案
export function checkAnswer() {
    return getData(
        API_PATH + '?action=answer'
    )
}

// 根据问题查找对应答案
export function checkSee(params) {
    return getData(
        API_PATH + '?action=see',
        params
    )
}

// 提问
export function checkProblem(params) {
    return postData(
        API_PATH + '?action=problem',
        params
    )
}

// 我的提问
export function checkMyanswer() {
    return getData(
        API_PATH + '?action=myanswer'
    )
}

// 获取openid
export function checkOpenid() {
    return getData(
        API_PATH + '?action=openid'
    )
}