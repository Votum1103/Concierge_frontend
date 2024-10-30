<template>
  <div style="display: flex; width: 100%; height: 100vh;">
    <div style="display: flex; flex-direction: column; width: 100%;">
      <div style="padding: 10px; background-color: #e0e0e0;">
        <h2>Wybierz piętro</h2>
        <button v-for="floor in floors" :key="floor.value" @click="updateFloor(floor.value)">
          Piętro {{ floor.label }}
        </button>
      </div>
      <div ref="mapViewDiv" style="flex: 1; height: calc(100vh - 100px);"></div>
    </div>
    <div style="width: 25%; padding: 10px; background-color: #f0f0f0;">
      <h2>Informacje o pomieszczeniu</h2>
      <div v-if="selectedRoom && selectedRoom.nazwa_skrocona !== 'nr nieznany'">
        <p><b>Nazwa:</b> {{ selectedRoom.nazwa_skrocona }}</p>
        <p><b>Numer piętra:</b> {{ selectedRoom.pietro }}</p>
        <p><b>Poziom:</b> {{ selectedRoom.poziom }}</p>
        <p><b>Wydział:</b> {{ selectedRoom.wydzial }}</p>
        <p><b>Pojemność:</b> {{ selectedRoom.pojemnosc }}</p>
        <p><b>Status:</b> {{ selectedRoom.status }}</p>
        <p><b>Typ dostępu:</b> {{ selectedRoom.typ_dostepu }}</p>
        <p><b>Funkcja:</b> {{ selectedRoom.funkcja }}</p>
        <p><b>Organizacja:</b> {{ selectedRoom.organizacja }}</p>
      </div>
      <div v-else>
        <p>Wybierz pomieszczenie, by zobaczyć szczegóły.</p>
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

export default {
  name: "MapaPomieszczen",
  setup() {
    const mapViewDiv = shallowRef(null);
    const selectedRoom = ref(null);
    const roomStatus = ref({});
    const highlightedRoomId = ref(null);
    const selectedFloor = ref(1);
    const floors = [
      { label: 0, value: 1 },
      { label: 1, value: 2 },
      { label: 2, value: 3 },
      { label: 3, value: 4 },
      { label: 4, value: 5 },
    ];

    const fetchRoomStatus = async (deviceType = "key", version = "primary") => {
      try {
        const token = sessionStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `http://127.0.0.1:8000/devices/?dev_type=${deviceType}&dev_version=${version}`,
          { headers }
        );

        response.data.forEach((device) => {
          roomStatus.value[device.room_number] = device.is_taken;
        });
      } catch (error) {
        console.error("Error fetching room status:", error);
      }
    };

    onMounted(async () => {
      await fetchRoomStatus();

      const map = new Map({ basemap: "topo-vector" });

      const view = new MapView({
        container: mapViewDiv.value,
        map: map,
        center: [21.01028, 52.22065],
        zoom: 19,
      });

      const getRenderer = () => {
        return new UniqueValueRenderer({
          field: "nazwa_skrocona",
          uniqueValueInfos: Object.keys(roomStatus.value).map((roomNumber) => ({
            value: roomNumber,
            symbol: {
              type: "simple-fill",
              color: roomStatus.value[roomNumber] ? [167, 39, 39, 0.8] : [57, 112, 49, 0.8],
              outline: {
                color:
                  highlightedRoomId.value === roomNumber
                    ? [0, 120, 255, 1]
                    : [0, 0, 0, 0.5],
                width: highlightedRoomId.value === roomNumber ? 2 : 1,
              },
            },
          })),
          defaultSymbol: {
            type: "simple-fill",
            color: [244, 238, 177, 0.8],
            outline: { color: [0, 0, 0, 0.5], width: 1 },
          },
        });
      };

      const featureLayer = new FeatureLayer({
        url: "https://arcgis.cenagis.edu.pl/server/rest/services/SION2_Topo_MV/sion2_topo_indoor_all/MapServer/5",
        outFields: [
          "nazwa_skrocona",
          "pietro",
          "poziom",
          "wydzial",
          "pojemnosc",
          "status",
          "typ_dostepu",
          "funkcja",
          "organizacja",
        ],
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
              highlightedRoomId.value = graphic.attributes.nazwa_skrocona;
            } else {
              selectedRoom.value = null;
              highlightedRoomId.value = null;
            }
          } else {
            selectedRoom.value = null;
            highlightedRoomId.value = null;
          }
        });
      });

      watch(highlightedRoomId, () => {
        featureLayer.renderer = getRenderer();
      });
      watch(selectedFloor, () => {
        featureLayer.definitionExpression = `budynek_nazwa = 'Gmach Główny' AND poziom=${selectedFloor.value}`;
      });
    });

    const updateFloor = (floor) => {
      selectedFloor.value = floor;
    };

    return {
      mapViewDiv,
      selectedRoom,
      fetchRoomStatus,
      floors,
      updateFloor,
    };
  },
};
</script>

<style scoped>
div {
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
}

p {
  color: #333;
}

button {
  margin: 5px;
  padding: 8px;
  cursor: pointer;
}
</style>
