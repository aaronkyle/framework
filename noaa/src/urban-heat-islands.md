# NOAA Urban Heat Island Mapping

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>


```js
import { require } from "npm:d3-require";
// Import Leaflet first
const L = await require("leaflet@1.9.4");

// Import ESRI Leaflet, ensuring it has a reference to Leaflet
const esri = await require("esri-leaflet@3.0.12");

// Attach esri to the Leaflet instance
L.esri = esri;
```


```js
const map = (() => {
  const container = display(html`<div style="width:${width}px;height:${
    width / 1.6}px">`);
 // yield container;

  const map = L.map(container).setView([42.3145186, -71.1103678], 11);

  const controlLayers = new L.control.layers(
    {
      "Open Street Maps": OSM_Layer(),
      "World Imagery": World_Imagery(),
      "World Topo Map": World_Topo().addTo(map)
    },
    {
      morning: morning_model().addTo(map),
      afternoon: afternoon_model(),
      evening: evening_model()
    },
    { position: "topright", collapsed: false }
  );

  map.addControl(controlLayers);

})()
```


---



### Storymap Data

This notebook utilizes data featured in NOAA's ["Urban Heat Island mapping campaign cities"](https://storymaps.arcgis.com/stories/c57435110d264e1f8ccd75e35731ed5f) project.

NOAA makes available datasets for a selection of US cities from their 2017, 2018 and 2019 campaigns as map services, allowing us to create dynamic, interactive, intelligent maps.

**Predicted** afternoon (3PM), morning (6AM), and evening (7PM) ambient temperatures or heat indexes where available. The data retrieved from sensors was analyzed using a machine-learning algorithm that also incorporates local data and satellite imagery. The resulting maps show heat distribution for the entire city.

**Traverses** that were conducted by volunteer community citizens by mounting sensor equipment on the car and driving the designated routes at 7 a.m., 3 p.m., and 7 p.m. on a hot, clear day. These sensors tracked GPS location, temperature, and humidity at one-second intervals throughout each one-hour traverse. After completion, sensors were shipped back to the CAPA team for analysis.



---


**This is intended to be a collaborative notebook.**

The motivation for creating this notebook comes from our recent conversation, ["Data Science for Environmental Research (and Advocacy)"](https://observablehq.com/@ambassadors/data-science-for-environmental-research-and-advocacy). **All the heavy lifting getting these data layers to render is thanks to [@mootari](https://observablehq.com/@mootari),** who [generously invested](https://talk.observablehq.com/t/stuck-when-rendering-arcgis-wms-data-to-leaflet/4974/8) several hours into debugging (and being sucessful).

**You may see a ton of errors and no map if you're viewing from a work computer (or anything imposing an additional proxy between your requests).**  Fabian figured out a way around this, but I haven't (yet) managed to apply the lessons to all layers. Sorry about that! If you're interested to see the maps in this notebook but you're seeing some <span style="color:red">red error messsages</span>, your best bet for now would be to find a different machine / device. 


---


### Boston, MA



Morning (6 am) - https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_heat_index/ImageServer


```js
const morning_model = () =>
  L.esri.imageMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_heat_index/ImageServer",
    opacity: 0.6,
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
viewLayer(morning_model())
```


Afternoon (3 pm) - https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_afternoon_heat_index/ImageServer


```js
// https://esri.github.io/esri-leaflet/examples/simple-image-map-layer.html
const afternoon_model = () =>
  L.esri.imageMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_afternoon_heat_index/ImageServer",
    opacity: 0.6,
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
viewLayer(afternoon_model())
```


Evening (7 pm) - https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_evening_heat_index/ImageServer


```js
// https://esri.github.io/esri-leaflet/examples/simple-image-map-layer.html
const evening_model = () =>
  L.esri.imageMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_evening_heat_index/ImageServer",
    opacity: 0.6,
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
viewLayer(evening_model())
```


Traverses - Feature layers



https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_traverses/MapServer/0


```js
// https://esri.github.io/esri-leaflet/examples/simple-image-map-layer.html
const traverses_model = () =>
  L.esri.dynamicMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_traverses/MapServer/",
    opacity: 0.6,
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
viewLayer(traverses_model())
```

```js
d3.json('https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_traverses/MapServer/0?f=pjson')
```


Morning (6 am) - https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_traverses/MapServer


```js
const morning_traverses = () =>
  L.esri.dynamicMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_traverses/MapServer",
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
const morning_traverses_L = L.tileLayer.wms(
  "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_morning_traverses/MapServer",
  {
    layers: "Boston_am",
    opacity: 0.6
  }
)
```

```js
viewLayer(morning_traverses())
```


Afternoon (3 pm) - https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_afternoon_traverses/MapServer


```js
const afternoon_traverses = () =>
  L.esri.dynamicMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_afternoon_traverses/MapServer",
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
const afternoon_traverses_L = L.tileLayer.wms(
  "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_afternoon_traverses/MapServer",
  {
    layers: "Boston_pm_revised",
    opacity: 0.6
  }
)
```

```js
viewLayer(afternoon_traverses())
```



Evening (7 pm) - https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_evening_traverses/MapServer


```js
const evening_traverses = () =>
  L.esri.dynamicMapLayer({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_evening_traverses/MapServer",
    attribution: "NOAA"
    //maxZoom: 17
  })
```

```js
const evening_traverses_L = () =>
  L.tileLayer.wms({
    url:
      "https://gis.nnvl.noaa.gov/arcgis/rest/services/HINDX/Boston_evening_traverses/MapServer",
    layers: "Boston_ev",
    attribution: "NOAA",
    opacity: 0.6
  })
```

```js
viewLayer(evening_traverses())
```

```js
const OSM_Layer = () => L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    attribution: 'Wikimedia maps beta | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }
)
```

```js
viewLayer(OSM_Layer())
```

```js
const World_Imagery = () => L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 17
  }
)
```

```js
viewLayer(World_Imagery())
```

```js
const World_Topo = () => L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
      maxZoom: 17
    }
  )
```

```js
viewLayer(World_Topo())
```

<!--
### Dependencies
-->

```js
// L = {
  // Load Leaflet and it's CSS file
//  const L = await require("leaflet@latest");
//  if (!L._css) {
//    document.head.appendChild(
//      (L._css = html`
//      <link href='${await require.resolve(
//        "leaflet@latest/dist/leaflet.css"
//      )}' rel=stylesheet>
//    `)
//    );
//  }
//
  // Load plugins
//  L.esri = await require("esri-leaflet@latest");
//
//  return L;
//}
```

```js
//d3 = require('d3@6')
```


### Helpers


```js
// Helper to quickly preview a single layer
function viewLayer(layer, options = {}) {
  const {
    zoom, lat, lon, width, height,
    container = html`<div style="width:${width}px;height:${height}px">`,
  } = {...viewLayerDefaults, ...options};
  
  requestAnimationFrame(() => {
    const map = L.map(container).setView([lat, lon], zoom);
    layer.addTo(map);
  });

  return container;
}
```

```js
const viewLayerDefaults = ({
  width: 400,
  height: 250,
  lat: 42.3145186,
  lon: -71.1103678,
  zoom: 11
})
```


thanks [@mootari](https://observablehq.com/@mootari)!

