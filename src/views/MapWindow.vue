<template>
  <div class="main-container">
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
        <div ref="mapViewDiv" class="map-view"></div>
        <div v-if="loading" class="floor-selection-overlay">
          <button v-for="floor in floors" :key="floor.label" @click="updateFloor(floor.value)"
            :class="['floor-button', { selected: isSelectedFloor(floor.value) }]">
            {{ floor.label }}
          </button>
        </div>
      </div>
      <div class="informations">
        <div v-if="loading" class="item-type-overlay">
          <div class="itemTypesButtons">
            <button @click="selectItemType('klucz')" :class="{ selectedButton: selectedItemType === 'klucz' }"
              class="keys">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-key"
                viewBox="0 0 16 16">
                <path
                  d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </button>
            <button @click="selectItemType('mikrofon')" :class="{ selectedButton: selectedItemType === 'mikrofon' }"
              class="microphones">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-mic"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
              </svg>
            </button>
            <button @click="selectItemType('pilot')" :class="{ selectedButton: selectedItemType === 'pilot' }"
              class="remote-controllers">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-phone"
                viewBox="0 0 16 16">
                <path
                  d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
            </button>
          </div>
          <div class="itemsVersionsButtons">
            <button @click="selectItemVersion('podstawowa')" :class="{ selectedButton: version === 'podstawowa' }"
              class="primary-version">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-1-circle"
                viewBox="0 0 16 16">
                <path
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z" />
              </svg>
            </button>
            <button @click="selectItemVersion('zapasowa')" :class="{ selectedButton: version === 'zapasowa' }"
              class="reserve-version">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-2-circle"
                viewBox="0 0 16 16">
                <path
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306" />
              </svg>
            </button>
          </div>
        </div>
        <div class="room-info">
          <h2>Informacje o pomieszczeniu</h2>
          <div class="room-info-content"
            v-if="selectedRoom && (selectedRoom.nazwa_skrocona !== 'nr nieznany' || selectedRoom.nazwa_pelna !== null)">
            <h3>
              <template v-if="selectedRoom.nazwa_skrocona !== 'nr nieznany'">
                {{ selectedRoom.nazwa_pelna
                  ? `${selectedRoom.nazwa_skrocona} - ${selectedRoom.nazwa_pelna}`
                  : selectedRoom.nazwa_skrocona }}
              </template>
              <template v-else>
                {{ selectedRoom.nazwa_pelna }}
              </template>
            </h3>
            <p><b>Piętro:</b> {{ selectedRoom.pietro }}</p>
            <p v-if="areOverlaysVisible">
              <b>Pobrany:</b>
              {{ selectedRoom.is_taken == null || selectedRoom.is_taken == "brak" ? "brak przedmiotu" :
                selectedRoom.is_taken ? "tak" : "nie" }}
            </p>
            <p v-if="selectedRoom.owner_name && selectedRoom.owner_surname && areOverlaysVisible">
              <b>Pobierający:</b> {{ selectedRoom.owner_name }} {{ selectedRoom.owner_surname }}
            </p>
            <p v-if="selectedRoom.issue_time !== null && selectedRoom.owner_name && areOverlaysVisible">
              <b>Dzień pobrania: </b>
              {{ new Date(selectedRoom.issue_time).toLocaleDateString([], {
                year: 'numeric', month: '2-digit', day:
                  '2-digit'
              }) }}
            </p>
            <p v-if="selectedRoom.issue_time !== null && selectedRoom.owner_name && areOverlaysVisible">
              <b>Godzina pobrania: </b>
              {{ new Date(selectedRoom.issue_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </p>
            <p v-if="!areOverlaysVisible && selectedRoom.funkcja"><b>Funkcja:</b> {{ selectedRoom.funkcja }}</p>
            <p v-if="!areOverlaysVisible"><b>Klasa:</b> {{ selectedRoom.klasa }}</p>
          </div>
        </div>
        <div class="legend">
          <h2>Legenda</h2>
          <div v-if="areOverlaysVisible" class="deviceStatus">
            <p class="status available"><span class="rect"></span>{{ selectedItemType }} dostępny</p>
            <p class="status unavailable"><span class="rect"></span>{{ selectedItemType }} niedostępny</p>
            <p class="status nonexistent"><span class="rect"></span>{{ selectedItemType }} nie istnieje</p>
            <p class="status green">
              <span class="circle green"><span class="text">AB</span></span>Pobrany 0–1 godziny temu
            </p>
            <p class="status yellow">
              <span class="circle yellow"><span class="text">AB</span></span>Pobrany 1–2 godziny temu
            </p>
            <p class="status orange">
              <span class="circle orange"><span class="text">AB</span></span>Pobrany 2–3 godziny temu
            </p>
            <p class="status red">
              <span class="circle red"><span class="text">AB</span></span>Pobrany 3–10 godzin temu
            </p>
            <p class="status maroon">
              <span class="circle maroon"><span class="text">AB</span></span>Pobrany 10+ godzin temu
            </p>

          </div>
          <div v-else class="functionStatus">
            <p class="status admin"><span class="rect"></span>Administracyjny</p>
            <p class="status education"><span class="rect"></span>Działalność edukacyjna lub badawcza</p>
            <p class="status storage"><span class="rect"></span>Przechowywanie</p>
            <p class="status recreational"><span class="rect"></span>Rekreacyjny</p>
            <p class="status sanitary"><span class="rect"></span>Sanitarne</p>
            <p class="status communication"><span class="rect"></span>Komunikacja</p>
            <p class="status functional"><span class="rect"></span>Funkcyjny</p>
            <p class="status business"><span class="rect"></span>Biznes lub handel</p>
            <p class="status conference"><span class="rect"></span>Konferencyjny</p>
            <p class="status food"><span class="rect"></span>Dostarczanie żywności</p>
            <p class="status green">
              <span class="circle green"><span class="text">AB</span></span>Pobrany 0–1 godziny temu
            </p>
            <p class="status yellow">
              <span class="circle yellow"><span class="text">AB</span></span>Pobrany 1–2 godziny temu
            </p>
            <p class="status orange">
              <span class="circle orange"><span class="text">AB</span></span>Pobrany 2–3 godziny temu
            </p>
            <p class="status red">
              <span class="circle red"><span class="text">AB</span></span>Pobrany 3–10 godzin temu
            </p>
            <p class="status maroon">
              <span class="circle maroon"><span class="text">AB</span></span>Pobrany 10+ godzin temu
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';
import { shallowRef, ref, onMounted, watch } from "vue";
import api from "../api";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import Graphic from "@arcgis/core/Graphic";
import Zoom from "@arcgis/core/widgets/Zoom";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Circle from "@arcgis/core/geometry/Circle";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export default {
  name: "MapWindow",
  components: {
    GoogleFonts,
    WUoT_Logo,
    BackButton,
  },
  setup() {
    const filterButtonText = ref("Klasy pomieszczeń");
    const isAutoFloorChange = ref(false);
    const mapViewDiv = shallowRef(null);
    const selectedRoom = ref(null);
    const roomStatus = ref({});
    const highlightedRoomId = ref(null);
    const selectedFloor = ref([9, 1]);
    const selectedItemType = ref("klucz");
    const version = ref("podstawowa");
    const isSearchHighlightActive = ref(false);
    let view = null;
    const isFilterApplied = ref(false);
    const areOverlaysVisible = ref(true);
    const loading = ref(true)

    const addOwnerInitialsGraphics = async (featureLayer) => {
      if (!view || !roomStatus.value || !selectedFloor.value) return;
      
      ownerGraphicsLayer.removeAll();

      const floorCondition = Array.isArray(selectedFloor.value)
        ? `poziom IN (${selectedFloor.value.join(", ")})`
        : `poziom = ${selectedFloor.value}`;

      const buildingCondition = `budynek_nazwa = 'Gmach Główny'`;
      const whereCondition = `${buildingCondition} AND ${floorCondition}`;

      const features = await featureLayer.queryFeatures({
        where: whereCondition,
        outFields: ["nazwa_skrocona", "poziom"],
        returnGeometry: true,
      });

      const currentTime = new Date();

      features.features.forEach((feature) => {
        const roomKey = feature.attributes.nazwa_skrocona;
        const roomInfo = roomStatus.value[roomKey];

        if (roomInfo?.is_taken !== "brak" && roomInfo?.owner_name && roomInfo?.owner_surname) {
          const initials = `${roomInfo.owner_name[0]}${roomInfo.owner_surname[0]}`.toUpperCase();

          const issueTime = new Date(roomInfo.issue_time);
          const timeDiffInHours = (currentTime - issueTime) / (1000 * 60 * 60); 

          let backgroundColor;
          if (timeDiffInHours <= 1) {
            backgroundColor = [46, 219, 130, 1]; 
          } else if (timeDiffInHours > 1 && timeDiffInHours <= 2) {
            backgroundColor = [255, 239, 174, 1]; 
          } else if (timeDiffInHours > 2 && timeDiffInHours <= 3) {
            backgroundColor = [255, 154, 59, 1]; 
          } else if (timeDiffInHours > 3 && timeDiffInHours <= 10) {
            backgroundColor = [204, 52, 52, 1];
          } else {
            backgroundColor = [139, 0, 0, 1];
          }

          const geometry = feature.geometry;
          let insidePoint;

          let areaInSquareMeters = 0;

          if (geometry.type === "polygon") {
            areaInSquareMeters = geometry.extent.width * geometry.extent.height;
          }

          const isSmallRoom = areaInSquareMeters > 0 && areaInSquareMeters < 5;
          if (!isSmallRoom) {
            if (geometry.type === "polygon") {
              const rings = geometry.rings[0];
              const centroid = geometry.centroid;

              const [x1, y1] = rings[0];
              insidePoint = {
                type: "point",
                spatialReference: geometry.spatialReference,
                x: x1 + (centroid.x - x1) * 0.5,
                y: y1 + (centroid.y - y1) * 0.5,
              };
            } else if (geometry.type === "extent") {
              insidePoint = {
                type: "point",
                spatialReference: geometry.spatialReference,
                x: geometry.xmin + (geometry.xmax - geometry.xmin) * 0.4,
                y: geometry.ymin + (geometry.ymax - geometry.ymin) * 0.4,
              };
            } else {
              insidePoint = geometry;
            }

            const circleGraphic = new Graphic({
              geometry: insidePoint,
              symbol: {
                type: "simple-marker",
                style: "circle",
                color: backgroundColor,
                size: 16,
                outline: {
                  color: [0, 0, 0, 0.5],
                  width: 2,
                },
              },
            });

            const textGraphic = new Graphic({
              geometry: insidePoint,
              symbol: {
                type: "text",
                text: initials,
                color: "black",
                font: {
                  size: 8,
                  weight: "bold",
                  family: "Arial",
                },
                horizontalAlignment: "center",
                verticalAlignment: "middle",
              },
            });

            ownerGraphicsLayer.add(circleGraphic);
            ownerGraphicsLayer.add(textGraphic);
          }
        }
      });
    };

    onMounted(async () => {
      if (!checkConnection()) {
        loading.value = false;
        return;
      }
      await fetchRooms();
      await fetchRoomStatus();

      let map = await initializeMap();
      let featureLayer = await addFeatureLayer(map)
      map.add(ownerGraphicsLayer);

      addCustomButton();
      createWidgetContainer();
      await addOwnerInitialsGraphics(featureLayer);
      await searchRooms();

      const itemTypeOverlayNode = document.querySelector(".item-type-overlay");
      if (itemTypeOverlayNode) {
        view.ui.add(itemTypeOverlayNode, "top-right");
      }

      const deviceStatusNode = document.querySelector(".floor-selection-overlay");
      if (deviceStatusNode) {
        view.ui.add(deviceStatusNode, "bottom-right");
      }

      view.on("click", (event) => {
        resetRoomSelection();
        view.graphics.removeAll();
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
                selectedRoom.value.issue_time = roomInfo.issue_time;
              }
              highlightedRoomId.value = graphic.attributes.nazwa_skrocona;

              updateOutline(graphic.geometry);
            } else {
              resetRoomSelection();
            }
          } else {
            resetRoomSelection();
          }
        });
      });
      watch(highlightedRoomId, updateRenderer);

      watch(selectedFloor, async (newFloor) => {
        if (!isAutoFloorChange.value) {
          resetRoomSelection();
          view.graphics.removeAll();
          isSearchHighlightActive.value = false;
        } else {
          isAutoFloorChange.value = false;
        }

        const floorNumbers = newFloor.join(", ");
        featureLayer.definitionExpression = `budynek_nazwa = 'Gmach Główny' AND poziom IN (${floorNumbers})`;

        featureLayer.refresh();
        await addOwnerInitialsGraphics(featureLayer);
      });

      watch([selectedItemType, version], async () => {
        resetRoomSelection();
        await fetchRoomStatus();
        updateRenderer();
        await addOwnerInitialsGraphics(featureLayer);
      });
    });

    const checkConnection = () => {
      return navigator.onLine;
    };

    const floors = [
      { label: 0, value: [9, 1] },
      { label: 1, value: [2] },
      { label: 2, value: [3, 6] },
      { label: 3, value: [4, 8] },
      { label: 4, value: [5] },
    ];

    const fetchRooms = async () => {
      try {
        const response = await api.get(`/rooms/`);
        roomStatus.value = {};
        response.data.forEach((room) => {
          roomStatus.value[room.number] = { is_taken: "brak", owner_name: null, owner_surname: null, issue_time: null };
        });
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    const fetchRoomStatus = async () => {
      try {
        const response = await api.get(`/devices/?dev_type=${selectedItemType.value}&dev_version=${version.value}`);

        Object.keys(roomStatus.value).forEach((roomNumber) => {
          roomStatus.value[roomNumber].is_taken = "brak";
          roomStatus.value[roomNumber].owner_name = null;
          roomStatus.value[roomNumber].owner_surname = null;
          roomStatus.value[roomNumber].issue_time = null;
        });
        response.data.forEach((device) => {
          if (roomStatus.value[device.room_number]) {
            roomStatus.value[device.room_number].is_taken = device.is_taken;
            roomStatus.value[device.room_number].owner_name = device.owner_name;
            roomStatus.value[device.room_number].owner_surname = device.owner_surname;
            roomStatus.value[device.room_number].issue_time = device.issue_time;
          }
        });
      } catch (error) {
        console.error("Error fetching room status:", error);
      }
    };

    const applyClassFilter = () => {
      isFilterApplied.value = !isFilterApplied.value;
      areOverlaysVisible.value = !isFilterApplied.value;

      if (isFilterApplied.value) {
        filterButtonText.value = "Dostępność urządzeń";

        const classColorMapping = {
          "administracyjny": [101, 166, 185, 1],
          "działalności edukacyjnej lub badawczej": [167, 203, 188, 1],
          "przechowywania": [161, 167, 166, 1],
          "rekreacyjny": [204, 146, 114, 1],
          "sanitarne": [230, 209, 90, 1],
          "funkcyjny": [161, 167, 166, 1],
          "biznesu lub handlu": [224, 182, 90, 1],
          "konferencyjny": [204, 146, 114, 1],
          "komunikacji": [202, 205, 207, 1],
          "dostarczanie żywności": [176, 178, 217, 1],
        };

        const uniqueValueInfos = Object.entries(classColorMapping).map(([key, color]) => ({
          value: key,
          symbol: {
            type: "simple-fill",
            color,
            outline: {
              color: [0, 0, 0, 0.5],
              width: 1,
            },
          },
        }));


        const renderer = new UniqueValueRenderer({
          field: "klasa",
          uniqueValueInfos
        });

        if (view && view.map && view.map.layers.items.length > 0) {
          const featureLayer = view.map.layers.items[0];
          featureLayer.renderer = renderer;
        }
      } else {
        filterButtonText.value = "Klasy pomieszczeń";
        updateRenderer();
      }
      const featureLayer = view.map.layers.items[0];
      addOwnerInitialsGraphics(featureLayer);
    };

    const isSelectedFloor = (floorValue) => {
      if (Array.isArray(selectedFloor.value)) {
        return selectedFloor.value.some(val => Array.isArray(floorValue) ? floorValue.includes(val) : val === floorValue);
      }
      return Array.isArray(floorValue) ? floorValue.includes(selectedFloor.value) : selectedFloor.value === floorValue;
    };

    const updateOutline = (geometry) => {
      view.graphics.removeAll();

      if (
        selectedRoom.value &&
        selectedRoom.value.nazwa_skrocona === "nr nieznany" &&
        selectedRoom.value.nazwa_pelna === null
      ) {
        return;
      }

      if (geometry) {
        const highlightGraphic = new Graphic({
          geometry,
          symbol: {
            type: "simple-fill",
            color: [0, 0, 0, 0],
            outline: {
              color: [0, 0, 0, 1],
              width: 3,
            },
          },
        });

        view.graphics.add(highlightGraphic);
      }
    };

    const resetRoomSelection = () => {
      selectedRoom.value = null;
      highlightedRoomId.value = null;
      view.graphics.removeAll();
    };


    const updateRenderer = () => {
      if (isFilterApplied.value) {
        return;
      }

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
              ? [246, 222, 184, 1]
              : roomStatus.value[roomNumber].is_taken
                ? [165, 0, 36, 1]
                : [31, 115, 75, 1],
          outline: {
            color: highlightedRoomId.value = [0, 0, 0, 0.5],
            width: highlightedRoomId.value = 1,
          },
        },
      }));

      uniqueValueInfos.push({
        value: "nr nieznany",
        symbol: {
          type: "simple-fill",
          color: [202, 205, 207, 1],
          outline: { color: [0, 0, 0, 0.5], width: 1 },
        },
      });

      return new UniqueValueRenderer({
        field: "nazwa_skrocona",
        uniqueValueInfos: uniqueValueInfos,
        defaultSymbol: {
          type: "simple-fill",
          color: [244, 240, 187, 0.8],
          outline: {
            color: [0, 0, 0, 0.5],
            width: 1,
          },
        },
      });
    };
    const ownerGraphicsLayer = new GraphicsLayer({ minScale: 2000, });
    const initializeMap = async () => {
      const map = new Map({ basemap: "topo-vector" });
      view = new MapView({
        container: mapViewDiv.value,
        map: map,
        center: [21.01010, 52.22072],
        zoom: 19,
        constraints: {
          minZoom: 18,
          maxZoom: 22,
          geometry: new Circle({
            center: [21.01010, 52.22072],
            radius: 300,
            radiusUnit: "meters",
          })
        },
        ui: {
          components: ["attribution"],
        },
      });
      return map;
    };

    const addFeatureLayer = async (map) => {
      const featureLayer = new FeatureLayer({
        url: "https://arcgis.cenagis.edu.pl/server/rest/services/SION2_Topo_MV/sion2_topo_indoor_all/MapServer/5",
        outFields: ["nazwa_skrocona", "nazwa_pelna", "pietro", "funkcja", "klasa"],
        renderer: getRenderer(),
        labelingInfo: [
          {
            labelExpressionInfo: {
              expression: "IIF($feature.nazwa_skrocona != 'nr nieznany', $feature.nazwa_skrocona, '')"
            },
            symbol: {
              type: "text",
              color: "#000000",
              font: {
                size: 10,
                weight: "bold",
                family: "Arial",
              },
              haloColor: "#ffffff",
              haloSize: 0.7,
            },
            minScale: 1000,
            maxScale: 0,
          },
        ],
        definitionExpression: `budynek_nazwa = 'Gmach Główny' AND poziom IN (${Array.isArray(selectedFloor.value) ? selectedFloor.value.join(", ") : selectedFloor.value})`,
      });

      map.add(featureLayer);
      return featureLayer
    }

    const createWidgetContainer = () => {
      const widgetContainer = document.createElement("div");
      widgetContainer.style.position = "absolute";
      widgetContainer.style.bottom = "70px";
      widgetContainer.style.left = "15px";
      widgetContainer.style.display = "flex";
      widgetContainer.style.flexDirection = "column";
      widgetContainer.style.gap = "10px";
      widgetContainer.id = "widgetContainer";

      view.ui.add(widgetContainer, "manual");

      const zoomWidget = new Zoom({ view });
      const homeWidget = new Home({ view });
      const scaleBarWidget = new ScaleBar({ view });

      view.ui.add([zoomWidget, homeWidget], "manual");
      view.ui.add(scaleBarWidget, "bottom-left");

      widgetContainer.appendChild(homeWidget.container);
      widgetContainer.appendChild(zoomWidget.container);

      const zoomNode = document.createElement("div");
      zoomNode.style.display = "inline-block";
      zoomNode.appendChild(zoomWidget.container || document.createElement("div"));
      widgetContainer.appendChild(zoomNode);

      const homeNode = document.createElement("div");
      homeNode.style.display = "inline-block";
      homeNode.appendChild(homeWidget.container || document.createElement("div"));
      widgetContainer.appendChild(homeNode);
    };

    const addCustomButton = () => {
      const customButton = document.createElement("button");
      customButton.classList.add("filter-button");

      customButton.innerHTML = `
        <span class="filter-icon">
          <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
          </svg>
        </span>
        <span class="filter-text" style="display:none;">Klasy pomieszczeń</span>
      `;
      customButton.style.display = "flex";
      customButton.style.alignItems = "center";
      customButton.style.justifyContent = "flex-start";
      customButton.style.backgroundColor = "#ffffff";
      customButton.style.gap = "10px";
      customButton.style.height = "32px"
      customButton.style.width = "32px"
      customButton.style.cursor = "pointer";
      customButton.style.border = "none";
      customButton.style.padding = "2px 0px 0px 8.5px"

      watch(filterButtonText, (newValue) => {
        const filterTextElement = customButton.querySelector(".filter-text");
        if (filterTextElement) {
          filterTextElement.textContent = newValue;
        }
      });

      let enterTimeout, leaveTimeout;

      customButton.addEventListener("mouseenter", () => {
        clearTimeout(leaveTimeout);
        enterTimeout = setTimeout(() => {
          customButton.style.width = "180px";
          const filterText = customButton.querySelector(".filter-text");
          filterText.style.whiteSpace = "nowrap";
          filterText.style.transition = "opacity 0.2s ease-in-out";
          filterText.style.pointerEvents = "none";

          filterText.style.display = "inline";
        }, 100);
      });

      customButton.addEventListener("mouseleave", () => {
        clearTimeout(enterTimeout);

        leaveTimeout = setTimeout(() => {
          const filterText = customButton.querySelector(".filter-text");
          filterText.style.display = "none";
          customButton.style.width = "32px";
        }, 100);
      });

      customButton.addEventListener("click", () => {
        applyClassFilter();
      });

      view.ui.add(customButton, "bottom-left");

    }

    const searchRooms = async () => {
      const searchWidget = new Search({
        view,
        allPlaceholder: "Szukaj pokoju",
        popupEnabled: false,
        resultGraphicEnabled: false,
        includeDefaultSources: false,
        sources: [
          {
            layer: new FeatureLayer({
              url: "https://arcgis.cenagis.edu.pl/server/rest/services/SION2_Topo_MV/sion2_topo_indoor_all/MapServer/5",
              outFields: ["nazwa_skrocona", "pietro"],
            }),
            searchFields: ["nazwa_skrocona"],
            displayField: "nazwa_skrocona",
            exactMatch: true,
            outFields: ["*"],
            name: "Pokoje",
            placeholder: "Wyszukaj pokój",
            filter: { where: "UPPER(budynek_nazwa) = 'GMACH GŁÓWNY'" },
            suggestionTemplate: "{nazwa_skrocona}",
          },
        ],
      });

      view.ui.add(searchWidget, "top-left");

      setTimeout(() => {
        const searchInput = document.querySelector(".esri-input");
        if (searchInput) {
          searchInput.style.outline = "none";
        }
      }, 100);

      searchWidget.on("search-complete", (event) => {
        resetRoomSelection();
        view.graphics.removeAll();

        event.results.forEach((result) => {
          result.results.forEach((feature) => {
            const roomAttributes = feature.feature.attributes;

            if (roomAttributes.nazwa_skrocona === "242") {
              searchWidget.clear();
              const secondFloor = floors.find((floor) => floor.label === 2);
              if (secondFloor) {
                isAutoFloorChange.value = true;
                selectedFloor.value = secondFloor.value;
              }
              return;
            }

            const roomKey = roomAttributes.nazwa_skrocona;
            const roomFloor = feature.feature.attributes.poziom;

            const floorMapping = floors.find((floor) =>
              Array.isArray(floor.value)
                ? floor.value.includes(roomFloor)
                : floor.value === roomFloor
            );

            if (!isSelectedFloor(roomFloor)) {
              isAutoFloorChange.value = true;
              selectedFloor.value = floorMapping ? floorMapping.value : [roomFloor];
            }

            const graphic = new Graphic({
              geometry: feature.feature.geometry,
              symbol: {
                type: "simple-fill",
                color: [0, 0, 0, 0],
                outline: { color: [0, 0, 0, 0.8], width: 3 },
              },
            });
            view.graphics.add(graphic);

            selectedRoom.value = roomAttributes;

            const roomInfo = roomStatus.value[roomKey];
            if (roomInfo) {
              selectedRoom.value.is_taken = roomInfo.is_taken;
              selectedRoom.value.owner_name = roomInfo.owner_name;
              selectedRoom.value.owner_surname = roomInfo.owner_surname;
              selectedRoom.value.issue_time = roomInfo.issue_time;
            }

            highlightedRoomId.value = roomKey;
            isSearchHighlightActive.value = true;
          });
        });

      });
    }

    const updateFloor = (floorValue) => {
      resetRoomSelection();
      if (isSearchHighlightActive.value) {
        view.graphics.removeAll();
        isSearchHighlightActive.value = false;
      }
      selectedFloor.value = Array.isArray(floorValue) ? floorValue : [floorValue];
    };
    const selectItemType = (type) => {
      resetRoomSelection();
      selectedItemType.value = type;
      fetchRoomStatus().then(() => updateRenderer());
    };

    const selectItemVersion = (ver) => {
      resetRoomSelection();
      version.value = ver;
      fetchRoomStatus().then(() => updateRenderer());
    };

    return {
      mapViewDiv,
      selectedRoom,
      floors,
      selectedFloor,
      selectedItemType,
      version,
      selectItemType,
      selectItemVersion,
      updateFloor,
      isSelectedFloor,
      applyClassFilter,
      areOverlaysVisible,
      filterButtonText,
      loading
    };
  },
};
</script>


<style lang="scss" scoped>
@import '../assets/style/variables.scss';


.main-container {
  background: $background-color url('../assets/back.jpg') no-repeat top;
  background-size: cover;
  color: $text-color;
  font-family: $font-main;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  overflow-y: hidden;
}

nav {
  text-align: left;
  height: 100px;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.content-wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
}

.informations {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  width: 400px;
  flex-shrink: 0;
  overflow-y: auto;
  margin-right: 2%;
}

.legend {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 38%;
}

.item-type-overlay {
  display: flex;
  flex-direction: row;
  pointer-events: auto;
  position: relative;
  gap: 15px;
  z-index: 10;
}

.map-view {
  width: 95%;
  height: 80%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.esri-ui .esri-component,
.esri-ui .esri-widget {
  background: none;
  border: none;
  box-shadow: none;
}


.floor-selection-overlay {
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
  background-color: #ffffff;
  color: #0d1016;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color $transition-duration;
  outline: none;
}

.itemsVersionsButtons,
.itemTypesButtons {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 30px;
  height: 50px;
}

.itemsVersionsButtons {
  width: 100px;
}

.itemTypesButtons {
  width: 150px;
}

button:hover {
  background-color: $background-color;
}

.floor-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #0d1016;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color $transition-duration;
}

.floor-button:hover {
  background-color: #dcdee4;
}

.floor-button.selected {
  transform: scale(1.3);
  transition: transform 0.1s ease-in-out;
}

.back-button {
  text-decoration: none;
  margin: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  color: $text-color;
  background-color: transparent !important;
}

button.microphones,
button.remote-controllers,
button.keys,
button.primary-version,
button.reserve-version {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
}

.selected {
  transform: scale(1.3);
  transition: transform 0.1s ease-in-out;
}

.selectedButton {
  transform: scale(1.6);
  transition: transform 0.2s ease-in-out;
}

.back-button:hover {
  transform: scale(1.07);
  cursor: pointer;
}

.custom-widget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.room-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 62%;
  overflow-y: auto;
  background-color: transparent;
  color: $text-color;
}

.room-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.room-info div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  gap: 20px;
}

.room-info p {
  margin: 5px 0;
  font-size: 14px;
  line-height: 1.5;
}

.room-info-content {
  text-align: center
}

.deviceStatus p {
  width: 300px;
  margin-bottom: 1em;
  text-align: left;
}

.status {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.rect {
  width: 20px;
  height: 10px;
  margin-right: 8px;
}

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
  outline: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &.green {
    background-color: rgb(46, 219, 130);
  }

  &.yellow {
    background-color: rgb(255, 239, 174);
  }

  &.orange {
    background-color: rgb(255, 154, 59);
  }

  &.red {
    background-color: rgb(204, 52, 52);
  }

  &.maroon {
    background-color: rgb(139, 0, 0);
  }

  .text {
    color: black;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
  }
}

.available .rect {
  background-color: rgba(31, 115, 75, 1);
}

.unavailable .rect {
  background-color: rgba(165, 0, 36, 1);
}

.nonexistent .rect {
  background-color: rgba(246, 222, 184, 1);
}

.functionStatus,
.deviceStatus {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $text-color;
  font-size: 15px;
  border: 1px solid #4d4d4d;
  max-height: 230px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: $background-color;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 10px;
  border: 2px solid grey;
}

.functionStatus p {
  width: 300px;
  margin-bottom: 1em;
  text-align: left;
}

.status {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.admin .rect {
  background-color: rgba(101, 166, 185, 1);
}

.education .rect {
  background-color: rgba(167, 203, 188, 1);
}

.storage .rect {
  background-color: rgba(161, 167, 166, 1);
}

.recreational .rect {
  background-color: rgba(204, 146, 114, 1);
}

.sanitary .rect {
  background-color: rgba(230, 209, 90, 1);
}

.communication .rect {
  background-color: rgba(202, 205, 207, 1);
}

.functional .rect {
  background-color: rgba(161, 167, 166, 1);
}

.business .rect {
  background-color: rgba(224, 182, 90, 1);
}

.conference .rect {
  background-color: rgba(204, 146, 114, 1);
}

.food .rect {
  background-color: rgba(176, 178, 217, 1);
}

@media (max-width: 1100px) {

  #app {
    display: flex;
    flex-direction: column;
  }

  .informations {
    display: none;
  }
}

@media (max-width: 678px) {
  #app {
    width: 678px;
  }
}
</style>