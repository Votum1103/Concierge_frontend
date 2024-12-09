import { createRouter, createWebHistory } from 'vue-router'
import MainWindow from '../components/MainWindow.vue';
import eConcierge from '../components/eConcierge.vue';
import ConciergeLogin from "../components/ConciergeLogin.vue";
import GiveManuallyItemCode from '@/components/GiveManuallyItemCode.vue';
import ScanItem from '@/components/ScanItem.vue';
import AddedNote from '@/components/AddedNote.vue';
import UnauthorizedUserAlert from '@/components/UnauthorizedUserAlert.vue';
import UnauthorizedUserGiveItem from '@/components/UnauthorizedUserGiveItem.vue';
import AddNote from '@/components/AddNote.vue';
import CheckReservations from '@/components/CheckReservations.vue';
import ScanConciergeCard from '@/components/ScanUserCard.vue';
import MainProcess from '@/components/MainProcess.vue';
import DeviceNote from '@/components/DeviceNote.vue';
import UserLogin from '@/components/UserLogin.vue';
import MapWindow from '@/components/MapWindow.vue';
import AcceptOperationByConcierge from '@/components/AcceptOperationByConcierge.vue';
import ConciergeLoginAcceptOperation from '@/components/ConciergeLoginAcceptOperation.vue';
import AccpetRejectionOperation from '@/components/AccpetRejectionOperation.vue';
import UpdateUACredentials from '@/components/UpdateUACredentials.vue';

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
    path: '/addnote',
    name: 'AddNote',
    component: AddNote
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Blokowanie cofania na poziomie routera
let isBackNavigationBlocked = true;  // Od razu blokujemy cofnienie

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('access_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'eConcierge' });
  } else {
    next();
  }
});

router.afterEach(() => {
  // Zabezpieczamy przed powrotem w historii
  if (isBackNavigationBlocked) {
    window.history.pushState(null, null, window.location.href);
  }
});

// Przechwytywanie akcji 'cofania' przyciskiem wstecz
window.addEventListener('popstate', () => {
  window.history.pushState(null, null, window.location.href); // Zapobiegamy cofaniu
  // Przechwytywanie cofnicia będzie działać zawsze
});

export default router;
