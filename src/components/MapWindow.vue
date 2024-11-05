<template>
  <GoogleFonts />
  <nav>
    <BackButton class="back-button" routeName="MainWindow" buttonText="Wróć">
      <template #icon>
        <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
        </svg>
      </template>
    </BackButton>
    <WUoT_Logo />
  </nav>
  <div id="app">
    <div class="content-wrapper">
      <div class="item-type-overlay">
        <div class="itemTypesButtons">
          <button @click="selectItemType('key')" :class="{ selected: selectedItemType === 'key' }" class="keys">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-key-fill"
              viewBox="0 0 16 16">
              <path
                d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
          </button>

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
        </div>
        <div class="itemsVersionsButtons">
          <button @click="selectItemVersion('primary')" :class="{ selected: version === 'primary' }"
            class="primary-version">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-1-circle-fill"
              viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
            </svg>
          </button>

          <button @click="selectItemVersion('backup')" :class="{ selected: version === 'backup' }"
            class="reserve-version">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-2-circle-fill"
              viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
            </svg>
          </button>
        </div>
      </div>
      <div ref="mapViewDiv" class="map-view"></div>
      <div class="floor-selection-overlay">
        <button v-for="floor in floors" :key="floor.value" @click="updateFloor(floor.value)">
          {{ floor.label }}
        </button>
      </div>
    </div>
    <div class="informations">
      <div class="room-info">
        <h2>Informacje o pomieszczeniu</h2>
        <div v-if="selectedRoom && selectedRoom.nazwa_skrocona !== 'nr nieznany'">
          <p><b>Sala:</b> {{ selectedRoom.nazwa_skrocona }}</p>
          <p><b>Piętro:</b> {{ selectedRoom.pietro }}</p>
          <p>
            <b>Pobrany:</b>
            {{ selectedRoom.is_taken === "brak" ? "brak urządzenia dla sali" : selectedRoom.is_taken ? "Tak" : "Nie" }}
          </p>
          <p v-if="selectedRoom.owner_name && selectedRoom.owner_surname">
            <b>Posiadacz klucza:</b> {{ selectedRoom.owner_name }} {{ selectedRoom.owner_surname }}
          </p>
          <p><b>Typ dostępu:</b> {{ selectedRoom.typ_dostepu }}</p>
          <p><b>Funkcja:</b> {{ selectedRoom.funkcja }}</p>
          <p><b>Organizacja:</b> {{ selectedRoom.organizacja }}</p>
        </div>
        <div v-else>
          <p>Wybierz pomieszczenie, by zobaczyć szczegóły.</p>
        </div>
      </div>
      <div class="deviceStatus">
        <p class="status available"><span class="circle"></span>{{ selectedItemType }} dostępny</p>
        <p class="status unavailable"><span class="circle"></span>{{ selectedItemType }} niedostępny</p>
        <p class="status nonexistent"><span class="circle"></span>{{ selectedItemType }} nie istnieje</p>
      </div>
    </div>
  </div>
</template>

<script>

import { shallowRef, ref, onMounted, watch, onUnmounted } from "vue";
import axios from "axios";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import BackButton from "./BackButton.vue";
import GoogleFonts from "./googleFonts.vue";
import WUoT_Logo from "./WUoT_Logo.vue";

export default {
  name: "MapWindow",
  components: {
    GoogleFonts,
    WUoT_Logo,
    BackButton,
  },
  setup() {
    const mapViewDiv = shallowRef(null);
    const selectedRoom = ref(null);
    const roomStatus = ref({});
    const highlightedRoomId = ref(null);
    const selectedFloor = ref(1);
    const selectedItemType = ref("key");
    const version = ref("primary");
    let view = null;

    const floors = [
      { label: 0, value: [1] },
      { label: 1, value: 2 },
      { label: 2, value: 3 },
      { label: 3, value: 4 },
      { label: 4, value: 5 },
    ];

    const resetRoomSelection = () => {
      selectedRoom.value = null;
      highlightedRoomId.value = null;
    };

    const fetchRooms = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://127.0.0.1:8000/rooms/`, { headers });
        roomStatus.value = {};
        response.data.forEach((room) => {
          roomStatus.value[room.number] = { is_taken: "brak", owner_name: null, owner_surname: null };
        });
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    const fetchRoomStatus = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `http://127.0.0.1:8000/devices/?dev_type=${selectedItemType.value}&dev_version=${version.value}`,
          { headers }
        );

        Object.keys(roomStatus.value).forEach((roomNumber) => {
          roomStatus.value[roomNumber].is_taken = "brak";
          roomStatus.value[roomNumber].owner_name = null;
          roomStatus.value[roomNumber].owner_surname = null;
        });
        response.data.forEach((device) => {
          if (roomStatus.value[device.room_number]) {
            roomStatus.value[device.room_number].is_taken = device.is_taken;
            roomStatus.value[device.room_number].owner_name = device.owner_name;
            roomStatus.value[device.room_number].owner_surname = device.owner_surname;
          }
        });
      } catch (error) {
        console.error("Error fetching room status:", error);
      }
    };

    const updateRenderer = () => {
      if (view) {
        view.map.layers.items[0].renderer = getRenderer();
      }
    };

    const getRenderer = () => {
      const uniqueValueInfos = Object.keys(roomStatus.value).map((roomNumber) => ({
        value: roomNumber,
        symbol: {
          type: "simple-fill",
          color:
            roomStatus.value[roomNumber].is_taken === "brak"
              ? [244, 238, 177, 0.8]
              : roomStatus.value[roomNumber].is_taken
                ? [167, 39, 39, 0.8]
                : [57, 112, 49, 0.8],
          outline: {
            color: highlightedRoomId.value === roomNumber ? [0, 120, 255, 1] : [0, 0, 0, 0.5],
            width: highlightedRoomId.value === roomNumber ? 2 : 1,
          },
        },
      }));

      uniqueValueInfos.push({
        value: "nr nieznany",
        symbol: {
          type: "simple-fill",
          color: [211, 211, 211, 0.8],
          outline: { color: [0, 0, 0, 0.5], width: 1 },
        },
      });

      return new UniqueValueRenderer({
        field: "nazwa_skrocona",
        uniqueValueInfos: uniqueValueInfos,
        defaultSymbol: {
          type: "simple-fill",
          color: [244, 238, 177, 0.8],
          outline: {
            color: [0, 0, 0, 0.5],
            width: 1,
          },
        },
      });
    };

    onMounted(async () => {
      await fetchRooms();
      await fetchRoomStatus();

      const map = new Map({ basemap: "topo-vector" });
      view = new MapView({
        container: mapViewDiv.value,
        map: map,
        center: [21.01010, 52.22072],
        zoom: 19,
        constraints: {
          minZoom: 19,
          maxZoom: 22,
        },
      });

      const featureLayer = new FeatureLayer({
        url: "https://arcgis.cenagis.edu.pl/server/rest/services/SION2_Topo_MV/sion2_topo_indoor_all/MapServer/5",
        outFields: ["nazwa_skrocona", "pietro", "typ_dostepu", "funkcja", "organizacja"],
        renderer: getRenderer(),
        definitionExpression: `budynek_nazwa = 'Gmach Główny' AND poziom=${selectedFloor.value}`,
      });

      map.add(featureLayer);

      view.on("click", (event) => {
        view.hitTest(event).then((response) => {
          const results = response.results;
          if (results.length > 0) {
            const graphic = results.filter((result) => result.graphic.layer === featureLayer)[0]?.graphic;
            if (graphic) {
              selectedRoom.value = graphic.attributes;
              const roomInfo = roomStatus.value[selectedRoom.value.nazwa_skrocona];
              if (roomInfo) {
                selectedRoom.value.is_taken = roomInfo.is_taken;
                selectedRoom.value.owner_name = roomInfo.owner_name;
                selectedRoom.value.owner_surname = roomInfo.owner_surname;
              }
              highlightedRoomId.value = graphic.attributes.nazwa_skrocona;
            } else {
              resetRoomSelection();
            }
          } else {
            resetRoomSelection();
          }
        });
      });

      watch(highlightedRoomId, updateRenderer);

      watch(selectedFloor, () => {
        resetRoomSelection();
        const floorNumbers = Array.isArray(selectedFloor.value) ? selectedFloor.value.join(", ") : selectedFloor.value;
        featureLayer.definitionExpression = `budynek_nazwa = 'Gmach Główny' AND poziom IN (${floorNumbers})`;
      });

      watch([selectedItemType, version], async () => {
        resetRoomSelection();
        await fetchRoomStatus();
        updateRenderer();
      });
    });

    onUnmounted(() => {

      const resizeHandler = () => {
        if (view) {
          view.container = mapViewDiv.value;
          view.resize();
        }
      };
      window.removeEventListener("resize", resizeHandler);
    });

    const updateFloor = (floor) => {
      selectedFloor.value = floor;
      const floorNumbers = Array.isArray(floor) ? floor.join(", ") : floor;
      FeatureLayer.definitionExpression = `budynek_nazwa = 'Gmach Główny' AND poziom IN (${floorNumbers})`;
    };

    const selectItemType = (type) => {
      selectedItemType.value = type;
    };

    const selectItemVersion = (ver) => {
      version.value = ver;
    };

    return {
      mapViewDiv,
      selectedRoom,
      floors,
      selectedItemType,
      version,
      selectItemType,
      selectItemVersion,
      updateFloor,
    };
  },
};

</script>

<style lang="scss" scoped>
$primary-bg: black;
$secondary-bg: #050608;
$accent-color: #0083BB;
$text-color: white;
$avatar-bg: #494A4D;
$border-radius-large: 30px;
$button-height: 45px;
$font-family: 'Open Sans', sans-serif;

/* Style globalne */
/* Style globalne */
html,
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
  overflow-y: hidden;
}

nav {
  text-align: left;
  height: 98px;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 75%;
  flex-shrink: 0;
  margin-left: 100px;
}

.item-type-overlay {
  position: absolute;
  top: 13vh;
  /* Umieszczone wyżej niż przyciski pięter */
  right: 45vh;
  display: flex;
  flex-direction: row;
  /* Układ w jednym rzędzie */
  gap: 15px;
  z-index: 10;
}

.map-view {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
}

.esri-view-surface canvas {
  border-radius: 100px;
}

.floor-selection-overlay {
  position: absolute;
  bottom: 15vh;
  right: 45vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 10;
}

button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  /* Wymuszenie proporcji 1:1 */
  background-color: #0d1016;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0d1016;
}

.back-button {
  text-decoration: none;
  margin: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  color: #FFFFFF;
  background-color: transparent !important;
}

button.microphones,
button.remote-controllers,
button.keys,
button.primary-version,
button.reserve-version {
  background-color: transparent;
}

.selected {
  transform: scale(1.7); // Powiększenie aktywnego przycisku
  transition: transform 0.2s ease-in-out; // Płynna animacja powiększenia
}

.back-button:hover,
button:hover {
  transform: scale(1.07);
  cursor: pointer;
}

.room-info {
  flex: 1;
  height: 55%;
  padding: 20px;
  overflow-y: auto;
  background-color: transparent;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Rozprowadza elementy równomiernie na całej wysokości kontenera */
}

.room-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.room-info div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.room-info p {
  margin: 5px 0;
  font-size: 14px;
  line-height: 1.5;
}

.deviceStatus {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 1.5em;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  padding-left: 2.5em;
}


.deviceStatus p {
  margin-bottom: 1em;
}

.status {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
}

.available .circle {
  background-color: rgba(57, 112, 49, 0.8);
  /* Zielony kolor dla "klucz dostępny" */
}

.unavailable .circle {
  background-color: rgba(167, 39, 39, 0.8);
  /* Czerwony kolor dla "klucz niedostępny" */
}

.nonexistent .circle {
  background-color: rgba(244, 238, 177, 0.8);
  /* Szary kolor dla "klucz nie istnieje" */
}

@media (max-width: 575px) {
  .content-wrapper {
    flex-direction: column;
    width: 100%;
  }

  .floor-selection-overlay {
    top: 400px;
    right: 10px;
    gap: 10px;
  }

  button {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }

  .room-info {
    padding: 8px;
  }

  .room-info h2 {
    font-size: 18px;
  }

  .room-info p {
    font-size: 10px;
  }
}

/* Dla małych urządzeń (szerokość od 576px do 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .content-wrapper {
    flex-direction: column;
    width: 100%;
  }

  .floor-selection-overlay {
    top: 450px;
    right: 20px;
    gap: 15px;
  }

  button {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .room-info {
    padding: 10px;
  }

  .room-info h2 {
    font-size: 20px;
  }

  .room-info p {
    font-size: 12px;
  }
}

/* Dla tabletów (szerokość od 768px do 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .content-wrapper {
    width: 90%;
  }

  .floor-selection-overlay {
    top: 500px;
    right: 150px;
    gap: 20px;
  }

  button {
    width: 38px;
    height: 38px;
    font-size: 15px;
  }

  .room-info {
    padding: 15px;
  }

  .room-info h2 {
    font-size: 22px;
  }

  .room-info p {
    font-size: 13px;
  }
}

/* Dla średnich ekranów (szerokość od 1025px do 1499px) */
@media (min-width: 1025px) and (max-width: 1499px) {
  .content-wrapper {
    width: 85%;
  }

  .floor-selection-overlay {
    top: 550px;
    right: 300px;
    gap: 25px;
  }

  button {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .room-info {
    padding: 18px;
  }

  .room-info h2 {
    font-size: 24px;
  }

  .room-info p {
    font-size: 14px;
  }
}
</style>
