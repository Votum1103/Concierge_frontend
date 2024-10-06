import { createRouter, createWebHistory } from 'vue-router'
import MainWindow from '../components/MainWindow.vue';
import eConcierge from '../components/eConcierge.vue';
import ConciergeLogin from "../components/ConciergeLogin.vue";
import GiveManuallyItemCode from '@/components/GiveManuallyItemCode.vue';
import ScanItem from '@/components/ScanItem.vue';
import SubmitOperation from '@/components/SubmitOperation.vue';
import AddedNote from '@/components/AddedNote.vue';
import UnauthorizedUserAlert from '@/components/UnauthorizedUserAlert.vue';
import UnauthorizedUserGiveItem from '@/components/UnauthorizedUserGiveItem.vue';
import AddNote from '@/components/AddNote.vue';
import CheckReservations from '@/components/CheckReservations.vue';
import EditNote from '@/components/EditNote.vue';
import ScanConciergeCard from '@/components/ScanConciergeCard.vue';
import MainProcess from '@/components/MainProcess.vue';



const routes = [
  {
    path: '/',
    name: 'MainWindow',
    component : MainWindow
  },
  
  {
    path: '/scan',
    name: 'eConcierge',
    component : eConcierge
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
    path: '/submitoperation',
    name: 'SubmitOperation',
    component: SubmitOperation
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
    path: '/editnote',
    name: 'EditNote',
    component: EditNote
  },
  {
    path: '/scanconciergecard',
    name: 'ScanConciergeCard',
    component: ScanConciergeCard
  },
  {
    path: '/mainprocess',
    name: 'MainProcess',
    component: MainProcess
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
