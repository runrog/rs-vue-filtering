import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sidebar',
      component: require('@/layout/side-bar/').default, // eslint-disable-line
      children: [
        {
          path: '/resources',
          name: 'resources',
          component: require('@/pages/filtered-content/').default, // eslint-disable-line
          meta: {
            content: 'resources',
            format: 'json',
          },
          props: {
            default: true,
          },
        },
        {
          path: '/es/resources',
          name: 'resources-es',
          component: require('@/pages/filtered-content/').default, // eslint-disable-line
          meta: {
            lang: 'es',
            content: 'resources',
            format: 'json',
          },
          props: {
            default: true,
          },
        },
        {
          path: '/es-mx/resources',
          name: 'resources-esmx',
          component: require('@/pages/filtered-content/').default, // eslint-disable-line
          meta: {
            lang: 'es-mx',
            content: 'resources',
            format: 'json',
          },
          props: {
            default: true,
          },
        },
      ],
    },
    {
      path: '/full-page/:id',
      name: 'full',
      component: require('@/layout/full-page/').default, // eslint-disable-line
      children: [],
    },
  ],
});
