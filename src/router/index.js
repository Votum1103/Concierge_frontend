import { createRouter, createWebHistory } from 'vue-router'
import MainWindow from '../views/MainWindow.vue';
import eConcierge from '../views/eConcierge.vue';
import ConciergeLogin from "../views/ConciergeLogin.vue";
import GiveManuallyItemCode from '@/views/GiveManuallyItemCode.vue';
import ScanItem from '@/views/ScanItem.vue';
import AddedNote from '@/views/AddedNote.vue';
import UnauthorizedUserAlert from '@/views/UnauthorizedUserAlert.vue';
import UnauthorizedUserGiveItem from '@/views/UnauthorizedUserGiveItem.vue';
import CheckReservations from '@/views/CheckReservations.vue';
import ScanConciergeCard from '@/views/ScanUserCard.vue';
import MainProcess from '@/views/MainProcess.vue';
import DeviceNote from '@/views/DeviceNote.vue';
import UserLogin from '@/views/UserLogin.vue';
import MapWindow from '@/views/MapWindow.vue';
import AcceptOperationByConcierge from '@/views/AcceptOperationByConcierge.vue';
import ConciergeLoginAcceptOperation from '@/views/ConciergeLoginAcceptOperation.vue';
import AccpetRejectionOperation from '@/views/AccpetRejectionOperation.vue';
import UpdateUACredentials from '@/views/UpdateUACredentials.vue';
import MainProcessNotes from '@/views/MainProcessNotes.vue';

const routes = [
  {
    path: '/mainwindow',
    name: 'MainWindow',
    component: MainWindow,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'eConcierge',
    component: eConcierge
  },
  {
    path: '/concierge-login',
    name: 'ConciergeLogin',
    component: ConciergeLogin
  },
  {
    path: '/giveitemmanually',
    name: 'GiveManuallyItemCode',
    component: GiveManuallyItemCode
  },
  {
    path: '/scanitem',
    name: 'ScanItem',
    component: ScanItem
  },
  {
    path: '/addednote',
    name: 'AddedNote',
    component: AddedNote
  },
  {
    path: '/unauthorizeduseralert',
    name: 'UnauthorizedUserAlert',
    component: UnauthorizedUserAlert
  },
  {
    path: '/unauthorizedusergiveitem',
    name: 'UnauthorizedUserGiveItem',
    component: UnauthorizedUserGiveItem
  },
  {
    path: '/checkreservations',
    name: 'CheckReservations',
    component: CheckReservations
  },
  {
    path: '/scanusercard',
    name: 'ScanUserCard',
    component: ScanConciergeCard
  },
  {
    path: '/mainprocess',
    name: 'MainProcess',
    component: MainProcess
  },
  {
    path: '/devicenote/:room_number',
    name: 'DeviceNote',
    component: DeviceNote
  },
  {
    path: '/mapwindow',
    name: 'MapWindow',
    component: MapWindow
  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/conciergeaccept',
    name: 'AcceptOperationByConcierge',
    component: AcceptOperationByConcierge
  },
  {
    path: '/conciergeacceptlogin',
    name: 'ConciergeLoginAcceptOperation',
    component: ConciergeLoginAcceptOperation
  },
  {
    path: '/acceptrejectionoperation',
    name: 'AccpetRejectionOperation',
    component: AccpetRejectionOperation
  },
  {
    path: '/upadateuacredentials',
    name: 'UpdateUACredentials',
    component: UpdateUACredentials
  },
  {
    path: '/mainprocessnotes',
    name: 'MainProcessNotes',
    component: MainProcessNotes
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


let isBackNavigationBlocked = true;

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('access_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'eConcierge' });
  } else {
    next();
  }
});

router.afterEach(() => {
  if (isBackNavigationBlocked) {
    window.history.pushState(null, null, window.location.href);
  }
});


window.addEventListener('popstate', () => {
  window.history.pushState(null, null, window.location.href);
});

export default router;
