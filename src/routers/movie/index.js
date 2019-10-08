export default {
    path: '/movie',
    component: () => import('@/views/movie/Movie'),
    children: [
        {
            path:'/movie',
            redirect:'/movie/nowplaying'

        },
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowplaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'coming',
            component: () => import('@/components/Coming')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
    ]
}