import Main from './views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['./views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['./views/error_page/404.vue'], resolve);
    }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => {
        require(['./views/error_page/401.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => {
        require(['./views/error_page/500.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['./views/main_components/locking-page.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [{
        path: 'home',
        name: 'home_index',
        title: '首页',
        component: resolve => {
            require(['./views/home/home.vue'], resolve);
        }
    }]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/question',
        icon: 'android-lock',
        name: 'question',
        title: '题目管理',
        component: Main,
        children: [{
            path: 'questionList',
            title: '题目管理',
            icon: 'android-lock',
            name: 'questionList',
            component: resolve => {
                require(['./views/tables/questionList.vue'], resolve);
            }
        }, {
            path: 'addQuestion',
            title: '添加题目',
            icon: 'android-lock',
            name: 'addQuestion',
            component: resolve => {
                require(['./views/tables/addQuestion.vue'], resolve);
            }
        }, ]
    },
     {
        path: '/article',
        icon: 'android-lock',
        name: 'article',
        title: '文章管理',
        component: Main,
        children: [{
            path: 'article-publish',
            title: '发布文章',
            icon: 'android-lock',
            name: 'article-publish',
            component: resolve => {
                require(['./views/article-publish/article-publish.vue'], resolve);
            }
        }]
    },
 ];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page401,
    page404
];