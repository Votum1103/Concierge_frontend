<template>

  <body>
    <GoogleFonts />
    <nav>
      <div class="main-nav">
        <WUoT_Logo />
        <button class="logOut">
          <span class="userbutton">
            <span class="avatars">
              <span class="userinitials">SH</span>
            </span>
          </span> Wyloguj</button>
      </div>
    </nav>

    <div class="main-page">
      <div class="left-action-buttons">
        <ul class="sidebar">
          <li class="option">
            <RouteButton routeName="ScanUserCard" class="giveItem" buttonText="Wydaj/Odbierz">
              <template #icon>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="60" height="60" fill="url(#pattern0_352_1443)" />
                  <defs>
                    <pattern id="pattern0_352_1443" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_352_1443" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_352_1443" width="100" height="100"
                      xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </template>
            </RouteButton>
          </li>
          <li class="option">
            <RouteButton routeName="UnauthorizedUserGiveItem" class="giveItemWithoutAU"
              buttonText="Wydaj/Odbierz bez autoryzacji">
              <template #icon>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="60" height="60" fill="url(#pattern0_324_781)" />
                  <defs>
                    <pattern id="pattern0_324_781" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_324_781" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_324_781" width="100" height="100"
                      xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </template>
            </RouteButton>
          </li>
          <li class="option">
            <RouteButton class="checkReservations" routeName="CheckReservations"
              buttonText="Wydaj/Odbierz bez autoryzacji">
              <template #icon>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="60" height="60" fill="url(#pattern0_323_37)" />
                  <defs>
                    <pattern id="pattern0_323_37" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_323_37" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_323_37" width="100" height="100"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAES0lEQVR4nO2dy6tWVRTAd3ojjbhhovawUYNIMge+cuIfYDqsMCsaNLEmkiHp5Ipv0AxBlFJnQqRUk4xwVNOiQV0bdUfdfKBmXrr54tZPNh0h5Hznnn0ee6+99/rBgQsX1j5r/djft8/a55zPGEVRFEVRFEVRFEVRMgGYCawCtgGfA78A14A7xWH/Plf8byvwIjAj9HknB/A0sA/4HXfGgb3AwtB5RA8wD/gYuE17bgNHgLmh84oS4DXgD7rnKvBq6PyiAXgQOEb/HAWGQucrGuBh4Gv88ZUdM3TekmdGExljwJniGGsoZSh0/uJo8DH1BfB8SZzFwJeOsY6EyVoowAbHAr5XI+Zmx5iv+Mk2jqWty2rqkEPsww5xrwCPmdwprjPqYsUNO8R+tLh6r8vhiljPEJapojPxVmfFL0lyoeNF3ycNxjjhEP8W8FRFrB+RQT9SinaICxsbjPGO4xh7KmLZ/pgEzrUu/oBGoWtvakODcV53HOO3QQ1J4AVkMNWJhPuSs11bV95vMM6WBuOsGBBrCLiJADqRcF9ytoXuyjcNxjnbYJwPKuJ9jwBaCyhJzO5ZNFlpLHYYYwnwT4NxTlfEfBc45ekY9ynEbiQ14Qdgdo34s1usin42AiikeBPSprX+LTC/IvYC4LsW8a+YDIW03XS6DuwElgKPFMcyYBcw0TL2LZOhEBGrlQH8bTIUch65jJsMhYwil59MhkI+RS4nTYZCXPcrfLLJZChkJXJZbnITUgz4K/IYAx4wmQrZjTx2GCGEEPKEXfMjh5vAkyZXIcWgB5HDASOIUELmAhcJz8Wq+37tzRUIojchRbJrQycIvFRxfo8DN8hFSJH0RwHzOzjNuX2IMHwImWE3hgLkdqrqoR77JQ9MIou/ehdSJD/Ls5TTwEM97Gz2zVkvQv43Uw54SGr/dI+7AeuRx7Wye5p7x37J9tSiPw+sqTlbj3vcP5/usM3Ykaob+XoHmNODkDnBEkqBrm0YRYUkhc4QYagQYaiQTIXw32s4Qi9tp1v2bg/+RgqPQl4mDv50ub+5c7rOxsQvxG/rpKRQXTKRiBA/zcUBheqKCfs9kYiQcBe4PmRYVEhNfMiwqJCa+JAhlSA3OdQ4qSxlpCYkehmpCTlmEoCEhFj2mchJTUj0UlIUErWUVIVEKyVlIVFKSV1IdFJyEDJiIiJ1ISMmMlIWMmIiJFUh22uMsQj4TMC+ebjXM9XFg4zngEtEhp/qlxest48p4FngAhHip/rlReuluQgMC3m2UcZLMOvS8y7hRuBf4mPUT/XLi9aUSWB1jfhvN3wvY0je8FP98oK1YcK+jjaRmTJVvKfyTT+VH1ystkzWmSmKPyEWldIVdMekzpSe2wcNON7FOWUPsK7lBdxleyNc9oXs4Ylclx9/uYedYfNURvjZcllnhZzZorNCyGzRWSHkV97u7R/od4WiKIqiKIqiKIqiKEYudwGadC7LL4Gb5gAAAABJRU5ErkJggg==" />
                  </defs>
                </svg>
              </template>
              Sprawdź rezerwacje
            </RouteButton>
          </li>
        </ul>
      </div>
      <div class="">
        <div class="navigtionButtons">
          <RouteButton class="showMap" routeName="Mapa" buttonText="Mapa">
            <template #icon>
            </template>
          </RouteButton>

          <div class="itemTypesButtons">
            <button @click="selectItemType('microphone')" :class="{ selected: selectedItemType === 'microphone' }"
              class="microphones">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-mic-fill"
                viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
                <path
                  d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>

            <button @click="selectItemType('remote_controler')"
              :class="{ selected: selectedItemType === 'remote_controler' }" class="remote-controllers">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-file-spreadsheet"
                viewBox="0 0 16 16">
                <path
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v4h10V2a1 1 0 0 0-1-1zm9 6h-3v2h3zm0 3h-3v2h3zm0 3h-3v2h2a1 1 0 0 0 1-1zm-4 2v-2H6v2zm-4 0v-2H3v1a1 1 0 0 0 1 1zm-2-3h2v-2H3zm0-3h2V7H3zm3-2v2h3V7zm3 3H6v2h3z" />
              </svg>
            </button>

            <button @click="selectItemType('key')" :class="{ selected: selectedItemType === 'key' }" class="keys">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-key-fill"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
            </button>
          </div>

          <!-- Przyciski wyboru wersji przedmiotów -->
          <div class="itemsVersionsButtons">
            <button @click="selectItemVersion('primary')" :class="{ selected: selectedItemVersion === 'primary' }"
              class="primary-version">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-1-circle-fill"
                viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
              </svg>
            </button>

            <button @click="selectItemVersion('emergency')" :class="{ selected: selectedItemVersion === 'emergency' }"
              class="reserve-version">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-2-circle-fill"
                viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="itemsTable">
          <div class="itemsNumber">
            <table>
              <tbody>
                <tr v-for="(chunk, chunkIndex) in chunkedItems" :key="chunkIndex" class="table-row">
                  <td v-for="(item, index) in chunk" :key="index" class="table-cell">
                    <button @click="handleClick(item)" :class="{ 'blue-text': item.has_note }" class="cell-button">
                      {{ item.room_number }}
                      <component :is="item.is_taken ? 'NegativeIcon' : 'AcceptanceIcon'" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="itemsStatus">
          <div class="keysStatus" v-if="selectedItemType === 'key'">
            <p>Dostępne: {{ availableDevicesCount }}</p>
            <p>Pobrane: {{ takenDevicesCount }}</p>
          </div>
          <div class="microphonesStatus" v-if="selectedItemType === 'microphone'">
            <p>Dostępne: {{ availableDevicesCount }}</p>
            <p>Pobrane: {{ takenDevicesCount }}</p>
          </div>
          <div class="remoteControllersStatus" v-if="selectedItemType === 'remote_controler'">
            <p>Dostępne: {{ availableDevicesCount }}</p>
            <p> Pobrane: {{ takenDevicesCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>





<script>
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import AcceptanceIcon from './AcceptanceIcon.vue';
import NegativeIcon from './NegativeIcon.vue';
import axios from 'axios';

export default {
  name: 'MainWindow',
  components: {
    WUoT_Logo,
    GoogleFonts,
    RouteButton,
    AcceptanceIcon,
    NegativeIcon
  },
  data() {
    return {
      items: [], // Będziemy przechowywać wszystkie urządzenia w tej tablicy
      currentView: 'keys', // Domyślnie widok to 'keys'
      selectedItemType: 'key', // Domyślny typ to 'key'
      selectedItemVersion: 'primary', // Domyślna wersja to 'primary'
    };
  },
  computed: {
    chunkedItems() {
      const chunkSize = 5;
      const result = [];

      // Podzielenie na grupy po 5 elementów
      for (let i = 0; i < this.items.length; i += chunkSize) {
        result.push(this.items.slice(i, i + chunkSize));
      }
      return result;
    },
    takenDevicesCount() {
      return this.items.filter(device => device.is_taken).length;
    },
    availableDevicesCount() {
      console.log(this.items.filter(device => !device.is_taken).length);
      return this.items.filter(device => !device.is_taken).length;
    }
  },
  mounted() {
    // Pobranie domyślnych urządzeń przy ładowaniu komponentu
    this.fetchDevices(this.selectedItemType, this.selectedItemVersion);
  },
  methods: {
    handleClick(item) {
      console.log('Clicked on item:', item);

      if (!item || !item.room_number || !item.id || !item.dev_type) {
        console.error('Błąd: Brak jednej z właściwości w item:', item);
        return;
      }

      // Zapisz dane urządzenia do sessionStorage, aby były dostępne w notatkach
      const selectedDevice = {
        room_number: item.room_number,
        device_id: item.id, // Zakładam, że item ma pole "id", które jest device_id
        dev_type: item.dev_type
      };

      sessionStorage.setItem('selectedDevice', JSON.stringify(selectedDevice));
      this.$router.push(`/DeviceNote/${item.room_number}`);
    },

    selectItemType(type) {
      this.selectedItemType = type;
      this.currentView = type;
      this.fetchDevices(this.selectedItemType, this.selectedItemVersion);
    },

    selectItemVersion(version) {
      this.selectedItemVersion = version;
      this.fetchDevices(this.selectedItemType, this.selectedItemVersion);
    },

    async fetchDevices(deviceType, version) {
      try {
        const token = sessionStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Pobierz urządzenia z serwera
        const response = await axios.get(
          `http://127.0.0.1:8000/devices/?dev_type=${deviceType}&dev_version=${version}`,
          { headers }
        );

        // Przypisz dane do `items`
        this.items = response.data;
        console.log('Fetched devices:', response.data); // Log danych po pobraniu
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching ${deviceType}:`, error.response.data);
        } else if (error.request) {
          console.error(`Error fetching ${deviceType}: No response received`, error.request);
        } else {
          console.error(`Error fetching ${deviceType}:`, error.message);
        }
      }
    }
  }
};
</script>





<style lang="scss">
$primary-bg: black;
$secondary-bg: #050608;
$accent-color: #0083BB;
$text-color: white;
$avatar-bg: #494A4D;
$border-radius-large: 30px;
$button-height: 45px;
$font-family: 'Open Sans', sans-serif;


body {
  background: $primary-bg url('../assets/back.jpg') no-repeat top;
  background-size: 10920px 10080px;
  color: $text-color;
  margin: 0;
  font-family: $font-family;
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  border-bottom: 3px solid $accent-color;
  -webkit-text-fill-color: $text-color;
  -webkit-box-shadow: 0 0 0px 1000px $primary-bg inset;
  transition: background-color 5000s ease-in-out 0s;
}

svg.bi:focus,
svg.bi:hover {
  width: 120%;
  height: 120%;
}

*:focus {
  outline: none;
}

.logo {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

button,
.avatars,
.showMap,
.itemTypesButtons,
.itemsVersionsButtons,
.giveItem,
.giveItemWithoutAU,
.checkReservations {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: all 0.3s;
}

.logOut {
  color: $text-color;
}

.avatars,
.showMap,
.itemTypesButtons,
.itemsVersionsButtons {
  border-radius: $border-radius-large;
  background-color: $secondary-bg;
}

.avatars {
  height: 35px;
  width: 35px;
  background-color: $avatar-bg;
  border-radius: 50%;
  margin-right: 10px;
}

.main-nav,
.navigtionButtons {
  display: flex;
  align-items: center;
  height: 70px;
}

.navigtionButtons {
  justify-content: center;
  margin-right: 10px;
}

.showMap {
  width: 160px;
  height: $button-height;
  font-size: 18px;
  margin-right: 100px;
}

.itemTypesButtons,
.itemsVersionsButtons {
  justify-content: space-evenly;
  width: 160px;
  height: 50px;
}

.itemsVersionsButtons {
  width: 106px;
  margin-left: 20px;
}

button.microphones,
button.remote-controllers,
button.keys,
button.primary-version,
button.reserve-version {
  background-color: transparent;

  &:focus {
    transform: scale(1.7);
  }
}

.selected {
  transform: scale(1.7); // Powiększenie aktywnego przycisku
  transition: transform 0.2s ease-in-out; // Płynna animacja powiększenia
}

.main-page {
  display: flex;
  margin-top: 40px;
  height: 700px;
}

.left-action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: 2em;
  width: 30%;
  height: 100%;

  ul {
    position: fixed;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    list-style: none;
    margin-top: 4em;
  }
}

.giveItem,
.giveItemWithoutAU,
.checkReservations {
  width: 70%;
  height: 125px;
  font-weight: 500;
  font-size: 16px;
  margin-left: 20px;
  padding: 10px 20px;
  flex-direction: column;
  border-radius: 5px;
}

.giveItem svg,
.giveItemWithoutAU svg,
.checkReservations svg {
  margin-right: 10px;
  margin-bottom: 10px;
}

.itemsTable {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  background-color: $secondary-bg;
  height: 700px;
  width: 100%;
  border-radius: $border-radius-large;
  margin: 20px 10% 0 0;
  overflow-y: auto;
}

.itemsNumber {
  display: grid;
  height: 600px;
  width: 100%;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-items: center;
}

.table-cell {
  font-size: 32px;
  font-weight: 500;
  width: 4.5em;
  padding: 0.5em 1em;
  text-align: center;
}

.cell-button {
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 0;
  color: white;
  font: inherit;
  cursor: pointer;
}


.blue-text {
  color: #0083BB;
}

.itemsStatus {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  font-size: 1.3em;
}

td svg {
  background-color: #397031;
  border-radius: 50%;
  margin-left: 10px;
}

.keysStatus,
.microphonesStatus,
.remoteControllersStatus {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}

@media (max-width: 768px) {
  .main-page {
    flex-direction: column;
  }

  .left-sidebar {
    width: 100%;
    order: 1;
  }

  .itemsTable {
    order: 2;

    .navigtionButtons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .itemTypesButtons,
    .itemsVersionsButtons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }

  @media (max-width: 480px) {
    .navigtionButtons {
      flex-direction: column;
    }

    .itemTypesButtons,
    .itemsVersionsButtons {
      width: 100%;
    }

    .table-cell {
      font-size: 12px;
    }
  }
}
</style>