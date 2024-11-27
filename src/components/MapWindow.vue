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
      <div ref="mapViewDiv" class="map-view"></div>
      <div class="floor-selection-overlay">
        <button v-for="floor in floors" :key="floor.label" @click="updateFloor(floor.value)"
          :class="['floor-button', { selected: isSelectedFloor(floor.value) }]">
          {{ floor.label }}
        </button>
      </div>
    </div>
    <div class="informations">
      <div v-if="areOverlaysVisible" class="item-type-overlay">
        <div class="itemTypesButtons">
          <button @click="selectItemType('klucz')" :class="{ selectedButton: selectedItemType === 'klucz' }"
            class="keys">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-key-fill"
              viewBox="0 0 16 16">
              <path
                d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
          </button>
          <button @click="selectItemType('mikrofon')" :class="{ selectedButton: selectedItemType === 'mikrofon' }"
            class="microphones">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-mic-fill"
              viewBox="0 0 16 16">
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
              <path
                d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
          <button @click="selectItemType('pilot')" :class="{ selectedButton: selectedItemType === 'pilot' }"
            class="remote-controllers">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-file-spreadsheet"
              viewBox="0 0 16 16">
              <path
                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v4h10V2a1 1 0 0 0-1-1zm9 6h-3v2h3zm0 3h-3v2h3zm0 3h-3v2h2a1 1 0 0 0 1-1zm-4 2v-2H6v2zm-4 0v-2H3v1a1 1 0 0 0 1 1zm-2-3h2v-2H3zm0-3h2V7H3zm3-2v2h3V7zm3 3H6v2h3z" />
            </svg>
          </button>
        </div>
        <div class="itemsVersionsButtons">
          <button @click="selectItemVersion('podstawowa')" :class="{ selectedButton: version === 'podstawowa' }"
            class="primary-version">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-1-circle-fill"
              viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
            </svg>
          </button>
          <button @click="selectItemVersion('zapasowa')" :class="{ selectedButton: version === 'zapasowa' }"
            class="reserve-version">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-2-circle-fill"
              viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="room-info">
        <h2>Informacje o pomieszczeniu</h2>
        <div
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
            {{ selectedRoom.is_taken == null || selectedRoom.is_taken == "brak" ? "brak urządzenia" :
              selectedRoom.is_taken ? "tak" : "nie" }}
          </p>
          <p v-if="selectedRoom.owner_name && selectedRoom.owner_surname && areOverlaysVisible">
            <b>Pobierający:</b> {{ selectedRoom.owner_name }} {{ selectedRoom.owner_surname }}
          </p>
          <p v-if="selectedRoom.issue_time !== null && selectedRoom.owner_name && areOverlaysVisible">
            <b>Dzień pobrania: </b>
            {{ new Date(selectedRoom.issue_time).toLocaleDateString([], {
              year: 'numeric', month: '2-digit', day:
            '2-digit' }) }}
          </p>
          <p v-if="selectedRoom.issue_time !== null && selectedRoom.owner_name && areOverlaysVisible">
            <b>Godzina pobrania: </b>
            {{ new Date(selectedRoom.issue_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </p>
          <p v-if="!areOverlaysVisible"><b>Funkcja:</b> {{ selectedRoom.funkcja }}</p>
          <p v-if="!areOverlaysVisible"><b>Klasa:</b> {{ selectedRoom.klasa }}</p>
        </div>
        <div v-else class="no-room-info">
          <p>Wybierz pomieszczenie, by zobaczyć szczegóły.</p>
        </div>
      </div>
      <h2>Legenda</h2>
      <div v-if="areOverlaysVisible" class="deviceStatus">
        <p class="status available"><span class="circle"></span>{{ selectedItemType }} dostępny</p>
        <p class="status unavailable"><span class="circle"></span>{{ selectedItemType }} niedostępny</p>
        <p class="status nonexistent"><span class="circle"></span>{{ selectedItemType }} nie istnieje</p>
      </div>
      <div v-else class="functionStatus">
        <p class="status admin"><span class="circle"></span>Administracyjny</p>
        <p class="status education"><span class="circle"></span>Działalność edukacyjna lub badawcza</p>
        <p class="status storage"><span class="circle"></span>Przechowywanie</p>
        <p class="status recreational"><span class="circle"></span>Rekreacyjny</p>
        <p class="status sanitary"><span class="circle"></span>Sanitarne</p>
        <p class="status communication"><span class="circle"></span>Komunikacja</p>
        <p class="status functional"><span class="circle"></span>Funkcyjny</p>
        <p class="status business"><span class="circle"></span>Biznes lub handel</p>
        <p class="status conference"><span class="circle"></span>Konferencyjny</p>
        <p class="status food"><span class="circle"></span>Dostarczanie żywności</p>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef, ref, onMounted, watch } from "vue";
import axios from "axios";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import BackButton from "./BackButton.vue";
import GoogleFonts from "./googleFonts.vue";
import WUoT_Logo from "./WUoT_Logo.vue";
import Graphic from "@arcgis/core/Graphic";
import Zoom from "@arcgis/core/widgets/Zoom";
import ScaleBar from "@arcgis/core/widgets/ScaleBar"

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
    const isSearchHighlightActive = ref(false); // Śledzenie zaznaczenia po wyszukiwaniu
    let view = null;
    const isFilterApplied = ref(false);
    const areOverlaysVisible = ref(true);
    const loading = ref(true)


    const floors = [
      { label: 0, value: [9, 1] },
      { label: 1, value: [2] },
      { label: 2, value: [3, 6] },
      { label: 3, value: [4, 8] },
      { label: 4, value: [5] },
    ];


    const updateOutline = (geometry) => {
      view.graphics.removeAll(); // Usuń poprzednie zaznaczenie

      // Sprawdź, czy obramowanie powinno być rysowane
      if (
        selectedRoom.value &&
        selectedRoom.value.nazwa_skrocona === "nr nieznany" &&
        selectedRoom.value.nazwa_pelna === null
      ) {
        return; // Nie rysuj obramowania
      }

      if (geometry) {
        const highlightGraphic = new Graphic({
          geometry,
          symbol: {
            type: "simple-fill",
            color: [0, 0, 0, 0], // Przezroczysty wypełniacz
            outline: {
              color: [0, 0, 0, 1], // Czarny obrys
              width: 3, // Pogrubiony obrys
            },
          },
        });

        view.graphics.add(highlightGraphic);
      }
    };

    const applyClassFilter = () => {
      isFilterApplied.value = !isFilterApplied.value;
      areOverlaysVisible.value = !isFilterApplied.value;

      if (isFilterApplied.value) {
        filterButtonText.value = "Dostępność urządzeń";

        // Mapa kolorów dla funkcji
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


        // Ustawienie renderer
        const renderer = new UniqueValueRenderer({
          field: "klasa", // Używamy pola `klasa` zamiast `funkcja`
          uniqueValueInfos
        });

        // Zastosowanie renderer do warstwy
        if (view && view.map && view.map.layers.items.length > 0) {
          const featureLayer = view.map.layers.items[0];
          featureLayer.renderer = renderer;
          console.log("Renderer ustawiony na funkcję pomieszczeń.");
        }
      } else {
        // Powrót do poprzedniego renderera
        filterButtonText.value = "Klasy pomieszczeń";
        updateRenderer();
        console.log("Renderer ustawiony na dostępność urządzeń.");
      }
    };

    const isSelectedFloor = (floorValue) => {
      if (Array.isArray(selectedFloor.value)) {
        return selectedFloor.value.some(val => Array.isArray(floorValue) ? floorValue.includes(val) : val === floorValue);
      }
      return Array.isArray(floorValue) ? floorValue.includes(selectedFloor.value) : selectedFloor.value === floorValue;
    };

    const resetRoomSelection = () => {
      selectedRoom.value = null;
      highlightedRoomId.value = null;
      loading.value = false; // Resetuj stan ładowania po usunięciu pokoju
      view.graphics.removeAll();
    };


    const fetchRooms = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://127.0.0.1:8000/rooms/`, { headers });
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

    const updateRenderer = () => {
      if (isFilterApplied.value) {
        console.log("Filtr klasy jest aktywny - pomijam zmianę renderera.");
        return; // Nie zmieniaj renderera, jeśli filtr klasy jest aktywny
      }

      if (view) {
        view.map.layers.items[0].renderer = getRenderer(); // Aktualizuj renderer na podstawie nowego stanu
      }
    };

    const getRenderer = () => {
      const uniqueValueInfos = Object.keys(roomStatus.value).map((roomNumber) => ({
        value: roomNumber,
        symbol: {
          type: "simple-fill",
          color:
            roomStatus.value[roomNumber].is_taken === "brak"
              ? [224, 182, 90, 1]
              : roomStatus.value[roomNumber].is_taken
                ? [223, 128, 128, 1]
                : [167, 203, 188, 1],
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

    onMounted(async () => {
      // Pobierz dane o pokojach i ich statusie
      await fetchRooms();
      await fetchRoomStatus();

      // Utwórz mapę i widok
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
        ui: {
          components: ["attribution"],
        },
      });

      // Tworzenie kontenera na niestandardowe widgety
      let widgetContainer = document.createElement("div");
      widgetContainer.style.position = "absolute";
      widgetContainer.style.bottom = "70px";
      widgetContainer.style.left = "15px";
      widgetContainer.style.display = "flex";
      widgetContainer.style.flexDirection = "column";
      widgetContainer.style.gap = "10px";
      widgetContainer.id = "widgetContainer";

      // Dodaj kontener do interfejsu mapy
      view.ui.add(widgetContainer, "manual");

      // Dodanie widgetów Zoom, Home i ScaleBar bezpośrednio do mapy
      const zoomWidget = new Zoom({ view });
      const homeWidget = new Home({ view });
      const scaleBarWidget = new ScaleBar({ view });

      // Dodaj ScaleBar do mapy

      view.ui.add([zoomWidget, homeWidget], "manual");

      widgetContainer.appendChild(homeWidget.container);
      widgetContainer.appendChild(zoomWidget.container);

      // Dodanie niestandardowego przycisku "Zmień filtr"
      const customButton = document.createElement("button");
      customButton.classList.add("filter-button");

      // Tworzymy statyczną strukturę HTML
      customButton.innerHTML = `
  <span class="filter-icon">
    <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="black" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
    </svg>
  </span>
  <span class="filter-text" style="display:none;">Klasy pomieszczeń</span>
`;
      customButton.style.display = "flex"; // Użycie flexboxa do rozmieszczenia elementów
      customButton.style.alignItems = "center"; // Wyrównanie w pionie
      customButton.style.justifyContent = "flex-start"; // Wyrównanie do lewej strony
      customButton.style.backgroundColor = "#ffffff";
      customButton.style.gap = "10px";
      customButton.style.height = "32px"
      customButton.style.width = "32px"
      customButton.style.cursor = "pointer";

      watch(filterButtonText, (newValue) => {
        const filterTextElement = customButton.querySelector(".filter-text");
        if (filterTextElement) {
          filterTextElement.textContent = newValue; // Aktualizuje tylko tekst
        }
      });

      let enterTimeout, leaveTimeout;

      customButton.addEventListener("mouseenter", () => {
        // Anulowanie zdarzenia `mouseleave`, jeśli już zostało ustawione
        clearTimeout(leaveTimeout);
        // Rozszerzenie przycisku i wyświetlenie tekstu
        enterTimeout = setTimeout(() => {
          customButton.style.width = "180px";
          const filterText = customButton.querySelector(".filter-text");
          filterText.style.whiteSpace = "nowrap";
          filterText.style.transition = "opacity 0.2s ease-in-out";
          filterText.style.pointerEvents = "none";

          filterText.style.display = "inline";
        }, 100); // Opóźnienie dla płynnej animacji
      });

      customButton.addEventListener("mouseleave", () => {
        clearTimeout(enterTimeout);

        // Ukrycie tekstu i zwężenie przycisku
        leaveTimeout = setTimeout(() => {
          const filterText = customButton.querySelector(".filter-text");
          filterText.style.display = "none";
          customButton.style.width = "32px";
        }, 100);
      });

      // Kliknięcie obsługuje logikę filtra
      customButton.addEventListener("click", () => {
        applyClassFilter(); // Obsługa logiki filtra
      });


      // Dodanie przycisku do kontenera widgetów
      view.ui.add(customButton, "bottom-left");
      view.ui.add(scaleBarWidget, "bottom-left");

      // Dodanie widgetów Zoom i Home do kontenera widgetów
      const zoomNode = document.createElement("div");
      zoomNode.style.display = "inline-block";
      zoomNode.appendChild(zoomWidget.container || document.createElement("div"));
      widgetContainer.appendChild(zoomNode);

      const homeNode = document.createElement("div");
      homeNode.style.display = "inline-block";
      homeNode.appendChild(homeWidget.container || document.createElement("div"));
      widgetContainer.appendChild(homeNode);

      const itemTypeOverlayNode = document.querySelector(".item-type-overlay");
      if (itemTypeOverlayNode) {
        view.ui.add(itemTypeOverlayNode, "top-right");
      }

      // Dodanie .deviceStatus do prawego dolnego rogu mapy
      const deviceStatusNode = document.querySelector(".floor-selection-overlay");
      if (deviceStatusNode) {
        view.ui.add(deviceStatusNode, "bottom-right");
      }

      // Obsługa wyszukiwania
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
          },
        ],
      });

      view.ui.add(searchWidget, "top-left");


      // Obsługa zdarzenia wyszukiwania
      // Obsługa zdarzenia wyszukiwania
      searchWidget.on("search-complete", (event) => {
        resetRoomSelection();
        view.graphics.removeAll();

        event.results.forEach((result) => {
          result.results.forEach((feature) => {
            const roomAttributes = feature.feature.attributes;
            const roomKey = roomAttributes.nazwa_skrocona;
            const roomFloor = feature.feature.attributes.poziom;

            // Znajdź odpowiadający label na podstawie poziomu (roomFloor)
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

              // Wywołanie funkcji aktualizującej obrys
              updateOutline(graphic.geometry);
            } else {
              resetRoomSelection();
            }
          } else {
            resetRoomSelection();
          }
        });
      });
      // Aktualizacja renderera przy zmianie podświetlonego pokoju
      watch(highlightedRoomId, updateRenderer);

      // Aktualizacja warstwy przy zmianie piętra
      watch(selectedFloor, (newFloor) => {
        if (!isAutoFloorChange.value) {
          resetRoomSelection();
          view.graphics.removeAll();
          isSearchHighlightActive.value = false;
        } else {
          isAutoFloorChange.value = false; // Resetuj flagę
        }

        const floorNumbers = newFloor.join(", ");
        featureLayer.definitionExpression = `budynek_nazwa = 'Gmach Główny' AND poziom IN (${floorNumbers})`;

        console.log("Ustawiono definitionExpression:", featureLayer.definitionExpression);

        // Wymuś odświeżenie warstwy
        featureLayer.refresh();
      });

      // Aktualizacja warstwy przy zmianie typu i wersji urządzenia
      watch([selectedItemType, version], async () => {
        resetRoomSelection();
        await fetchRoomStatus();
        updateRenderer();
      });
    });

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
      fetchRoomStatus().then(() => updateRenderer()); // Aktualizuj status pokoi i renderer po wyborze typu urządzenia
    };

    const selectItemVersion = (ver) => {
      resetRoomSelection();
      version.value = ver;
      fetchRoomStatus().then(() => updateRenderer()); // Aktualizuj status pokoi i renderer po wyborze wersji urządzenia
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
  flex: 1;
  justify-content: center;
  /* Utrzymuje mapę wyśrodkowaną */
}

.informations {
  width: 400px;
  /* Ustaw stałą szerokość dla panelu bocznego */
  flex-shrink: 0;
  /* Zapobiega zmniejszaniu panelu bocznego */
  overflow-y: auto;
  /* Umożliwia przewijanie dłuższych treści */
  margin-right: 2%;
}

.item-type-overlay {
  display: flex;
  flex-direction: row;
  pointer-events: auto;
  /* Zapewnia, że kliknięcia są przekazywane */
  position: relative;
  gap: 15px;
  z-index: 10;
}

.map-view {
  width: 95%;
  /* Dopasuj szerokość mapy, zmniejszając ją o szerokość paneli bocznych */
  height: 80%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  /* Aby upewnić się, że elementy wewnętrzne są poprawnie pozycjonowane */
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
  transition: background-color 0.3s;
}

.itemsVersionsButtons,
.itemsTypesButtons {
  height: 50px;
}

button:hover {
  background-color: #0d1016;
}

.floor-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #0d1016;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
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
  flex: 1;
  height: 45%;
  overflow-y: auto;
  background-color: transparent;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.room-info div {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.room-info p {
  margin: 5px 0;
  font-size: 14px;
  line-height: 1.5;
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

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
}

.available .circle {
  background-color: rgba(167, 203, 188, 1);
}

.unavailable .circle {
  background-color: rgba(223, 128, 128, 1);
}

.nonexistent .circle {
  background-color: rgba(224, 182, 90, 1);
}

.functionStatus,
.deviceStatus {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  border: 1px solid #292323;
  max-height: 230px;
  overflow-y: auto;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}


.functionStatus::-webkit-scrollbar {
  width: 10px;
}

.functionStatus::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.functionStatus::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.functionStatus::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
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

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
}

.admin .circle {
  background-color: rgba(101, 166, 185, 1);
}

.education .circle {
  background-color: rgba(167, 203, 188, 1);
}

.storage .circle {
  background-color: rgba(161, 167, 166, 1);
}

.recreational .circle {
  background-color: rgba(204, 146, 114, 1);
}

.sanitary .circle {
  background-color: rgba(230, 209, 90, 1);
}

.communication .circle {
  background-color: rgba(202, 205, 207, 1);
}

.functional .circle {
  background-color: rgba(161, 167, 166, 1);
}

.business .circle {
  background-color: rgba(224, 182, 90, 1);
}

.conference .circle {
  background-color: rgba(204, 146, 114, 1);
}

.food .circle {
  background-color: rgba(176, 178, 217, 1);
}

.no-room-info {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 200px;
}
</style>