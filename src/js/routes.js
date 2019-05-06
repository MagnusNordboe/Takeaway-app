
import HomePage from '../pages/home.f7.html';
import AboutPage from '../pages/about.f7.html';

import TestingPage from '../pages/testing.f7.html';
import resturtesting from '../pages/listetesting.f7.html';
import theResturantcatalog from '../pages/resturantcatalog.f7.html';
import category from '../pages/cat.f7.html';
import theResturantcatalog_old from '../pages/resturantcatalog_old.f7.html';
import FormPage from '../pages/form.f7.html';
import CatalogPage from '../pages/catalog.f7.html';
import ProductPage from '../pages/product.f7.html';
import SettingsPage from '../pages/settings.f7.html';
import chooseresturantback from '../pages/resturantback.f7.html';
import resturantBACK from '../pages/backendresturant.f7.html';
import categoryedit from '../pages/backcat.f7.html';
import orderfromrest from '../pages/resturantorder.f7.html';

import DynamicRoutePage from '../pages/dynamic-route.f7.html';
import RequestAndLoad from '../pages/request-and-load.f7.html';
import NotFoundPage from '../pages/404.f7.html';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/testing/',
    component: TestingPage,
  },
  {
    path: '/resturantback/',
    component: chooseresturantback,
  },
  {
    path: '/listetesting/',
    component: resturtesting,
  },
  {
    path: '/resturantorder/:id/',
    component: orderfromrest,
  },
  {
    path: '/resturantcatalog/:id/',
    component: theResturantcatalog,
  },
  {
    path: '/resturantcatalog_old/:id/',
    component: theResturantcatalog_old,
  },
  {
    path: '/backendresturant/:id/',
    component: resturantBACK,
  },
  {
      path: '/cat/:id/',
      component: category,
  },
  {
      path: '/backcat/:id/',
      component: categoryedit,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
