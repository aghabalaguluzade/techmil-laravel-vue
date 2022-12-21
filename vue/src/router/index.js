import { createRouter, createWebHistory } from "vue-router";
import {nextTick} from 'vue';

import Dashboard from "../views/Dashboard.vue";

// Site
import SiteIndex from "../views/sites/siteIndex.vue";
import SiteCreate from "../views/sites/siteCreate.vue";
import SiteEdit from "../views/sites/siteEdit.vue";

// Portfolio
import PortfolioCreate from "../views/portfolios/portfolioCreate.vue";
import PortfolioIndex from "../views/portfolios/portfolioIndex.vue";
import PortfolioEdit from "../views/portfolios/portfolioEdit.vue";

// Workers
import WorkerCreate from "../views/workers/workersCreate.vue";
import WorkerIndex from "../views/workers/workersIndex.vue";
import WorkerEdit from "../views/workers/workersEdit.vue";

// Banners
import BannerCreate from "../views/banner/bannerCreate.vue";
import BannerIndex from "../views/banner/bannerIndex.vue";
import BannerEdit from "../views/banner/bannerEdit.vue";

// Contact
import ContactIndex from "../views/contact/contactIndex.vue";

const routes = [
          {
               path : "/",
               name : "Dashboard",
               component : Dashboard,
               meta: { title: "Admin Panel" }
          },
          {
               path : "/sites/index",
               name : "sites.index",
               component : SiteIndex,
               meta: { title: "Saytlar - Siyahı", reload: true, }
          },
          {
               path : "/sites/create",
               name : "sites.create",
               component : PortfolioCreate,
               meta : { title : "Saytlar - Əlavə et" }
          },
          {
               path : "/sites/edit/:id",
               name : "sites.edit",
               component : SiteEdit,
               meta : { title : "Saytlar - Redaktə et" },
               props : true
          },
          {
               path : "/portfolios/index",
               name : "portfolios.index",
               component : PortfolioIndex,
               meta: { title: "Portfolio - Siyahı" }
          },
          {
               path : "/portfolios/create",
               name : "portfolios.create",
               component : PortfolioCreate,
               meta : { title : "Portfolio - Əlavə et" }
          },
          {
               path : "/portfolios/edit/:id",
               name : "portfolios.edit",
               component : PortfolioEdit,
               meta : { title : "Portfolio - Redaktə et" },
               props : true
          },
          {
               path : "/workers/index",
               name : "workers.index",
               component : WorkerIndex,
               meta: { title: "İşçilər - Siyahı" }
          },
          {
               path : "/workers/create",
               name : "workers.create",
               component : WorkerCreate,
               meta : { title : "İşçilər - Əlavə et" }
          },
          {
               path : "/workers/edit/:id",
               name : "workers.edit",
               component : WorkerEdit,
               meta : { title : "İşçilər - Redaktə et" },
               props : true
          },
          {
               path : "/banners/index",
               name : "banners.index",
               component : BannerIndex,
               meta: { title: "Banner - Siyahı" }
          },
          {
               path : "/banners/create",
               name : "banners.create",
               component : BannerCreate,
               meta : { title : "Banner - Əlavə et" }
          },
          {
               path : "/banners/edit/:id",
               name : "banners.edit",
               component : BannerEdit,
               meta : { title : "Banner - Redaktə et" },
               props : true
          },
          {
               path : "/contacts/index",
               name : "contacts.index",
               component : ContactIndex,
               meta: { title: "Əlaqə - Siyahı" }
          },
     ];


const router = createRouter({
     history : createWebHistory(),
     routes
});

router.beforeEach((to,from,next) => {
     document.title = `${to.meta.title}`;
     next();
});

export default router;