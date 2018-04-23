import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 
    vue-router路由懒加载
    resolve(module)：按需加载js 不会直接打包成一个js导致首页加载慢
*/
const Home = (resolve) => {
    import ('view/home/home').then((module) => {
        resolve(module)
    })
}

const UserInfor = (resolve) => {
    import ('view/signUp/userInfor').then((module) => {
        resolve(module)
    })
}

const OnlookersIndex = (resolve) => {
    import ('view/onlookers/onlookersIndex').then((module) => {
        resolve(module)
    })
}

const RankingList = (resolve) => {
    import ('view/onlookers/rankingList').then((module) => {
        resolve(module)
    })
}

const MyRecommend = (resolve) => {
    import ('view/onlookers/myRecommend').then((module) => {
        resolve(module)
    })
}

const SceneRecommend = (resolve) => {
    import ('view/onlookers/sceneRecommend').then((module) => {
        resolve(module)
    })
}

const SceneRecommendSuccess = (resolve) => {
    import ('view/onlookers/sceneRecommendSuccess').then((module) => {
        resolve(module)
    })
}

const InteractionIndex = (resolve) => {
    import ('view/onlookers/interactionIndex').then((module) => {
        resolve(module)
    })
}

const InteractionInfor = (resolve) => {
    import ('view/onlookers/interactionInfor').then((module) => {
        resolve(module)
    })
}

const MyInteraction = (resolve) => {
    import ('view/onlookers/myInteraction').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/userInfor',
        name: 'userInfor',
        component: UserInfor
    }, {
        path: '/onlookersIndex',
        name: 'onlookersIndex',
        component: OnlookersIndex
    }, {
        path: '/rankingList',
        name: 'rankingList',
        component: RankingList
    }, {
        path: '/myRecommend',
        name: 'myRecommend',
        component: MyRecommend
    }, {
        path: '/sceneRecommend',
        name: 'sceneRecommend',
        component: SceneRecommend
    }, {
        path: '/sceneRecommendSuccess',
        name: 'sceneRecommendSuccess',
        component: SceneRecommendSuccess
    }, {
        path: '/interactionIndex',
        name: 'interactionIndex',
        component: InteractionIndex
    }, {
        path: '/interactionInfor',
        name: 'interactionInfor',
        component: InteractionInfor
    }, {
        path: '/myInteraction',
        name: 'myInteraction',
        component: MyInteraction
    }, {
        path: '/home',
        redirect: '/'
    }]
})