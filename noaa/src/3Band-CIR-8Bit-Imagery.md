# 3Band_CIR_8Bit_Imagery 

<!--
This notebook explores how to render a web map from NOAA's web map service. We'll use [this image layer](https://coast.noaa.gov/arcgis/rest/services/Imagery/3Band_CIR_8Bit_Imagery/ImageServer) as our example.-->

<!--The motivation for creating this notebook comes from our recent conversation, ["Data Science for Environmental Research (and Advocacy)"](https://observablehq.com/@ambassadors/data-science-for-environmental-research-and-advocacy). **All the heavy lifting getting these data layers to render is thanks to [@mootari](https://observablehq.com/@mootari),** who [generously invested](https://talk.observablehq.com/t/stuck-when-rendering-arcgis-wms-data-to-leaflet/4974/8) several hours into debugging (and being sucessful). -->

<!-- No longer is the following statement needed! Thanks yet again, @mootari! -->
<!--**You may see a ton of errors and no map if you're viewing from a work computer (or anything imposing an additional proxy between your requests).**  We haven't yet found a way around this (yet).  If you're interested to see the notebook, your best bet would be to find a different machine / device.-->



```js
const map =(() => {
  const container = display(html`<div style="width:${width}px;height:${
    width / 1.6
  }px">`);
  //yield container;

  const map = L.map(container).setView([41.3570701, -72.0923688], 16);

  const controlLayers = new L.control.layers(
    {
      "Open Street Maps": OSM_Layer(),
      "World Imagery": World_Imagery(),
      "World Topo Map": World_Topo().addTo(map)
    },
    {
      "3 Band_CIR": Band_CIR_image_wms().addTo(map)
    },
    { position: "topright", collapsed: false }
  );

  map.addControl(controlLayers);
})()
```

---
## Layers


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

```js
// URL: https://coast.noaa.gov/arcgis/rest/services/Imagery/3Band_CIR_8Bit_Imagery/ImageServer/exportImage
// Fixed params:
// - format: "jpgpng"
// - bboxSR: "3857"
// - imageSR: "3857"
// - transparent: "true"
// - f: "image"
//
// Dynamic params:
// - bbox: "-8026259.0049080765,5065617.3687773645,-8024785.203456453,5064695.347123674"
// - size: "617,386" (should be "256,256" for tiles)
const Band_CIR_image_wms = () =>
  L.tileLayer.wms(
    "https://coast.noaa.gov/arcgis/rest/services/Imagery/3Band_CIR_8Bit_Imagery/ImageServer/exportImage",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image"
    }
  )
```

```js
viewLayer(Band_CIR_image_wms())
```

<!--
---
## Helpers
-->

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
  lat: 41.3570701,
  lon: -72.0923688,
  zoom: 13
})
```

<!--
---
## Dependencies
-->

```js
// const L = {
//  const L = require("leaflet@1.7.1");
//  const n = html`<link href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css" rel=stylesheet>`;
//  document.head.appendChild(n);
//  invalidation.then(() => n.remove());
//  return L;
//}
```


---

## Acknowledgements

**All the heavy lifting getting these data layers to render is thanks to [@mootari](https://observablehq.com/@mootari),** who [generously invested](https://talk.observablehq.com/t/stuck-when-rendering-arcgis-wms-data-to-leaflet/4974/8) several hours into debugging (and being sucessful).