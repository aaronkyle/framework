# NOAA Sea Level Rise

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

This notebook loads [sea level rise data](https://coast.noaa.gov/slrdata/) from the US [National Oceanic and Atmospheric Administration](https://noaa.gov) (NOAA).  NOAA provides a [very nice website](https://coast.noaa.gov/slr/) for viewing these data.  This notebook was created to demonstrate loading and rendering of web mapping service (wms) data [layers](https://coast.noaa.gov/arcgis/rest/services/dc_slr/) in a notebook to inform custom visualizations.


_NOAA Disclaimer:_

The data and maps in this tool illustrate the scale of potential flooding, not the exact location, and do not account for erosion, subsidence, or future construction. Water levels are relative to Mean Higher High Water (MHHW) (excludes wind driven tides). The data, maps, and information provided should be used only as a screening-level tool for management decisions. As with all remotely sensed data, all features should be verified with a site visit. The data and maps in this tool are provided “as is,” without warranty to their performance, merchantable state, or fitness for any particular purpose. The entire risk associated with the results and performance of these data is assumed by the user. This tool should be used strictly as a planning reference tool and not for navigation, permitting, or other legal purposes.



---

Here's the primary prediction model:


```js
const map_slr = (() => {
  const container = display(html`<div style="width:${width}px;height:${
    width / 1.6
  }px">`);
  //yield container;

  const map = L.map(container).setView([42.3650074, -71.0247722], 14);

  const controlLayers = new L.control.layers(
    {
      "Open Street Maps": OSM_Layer(),
      "World Imagery": World_Imagery(),
      "World Topo Map": World_Topo().addTo(map)
    },
    {
      slr_0ft: slr_0ft(),
      slr_1ft: slr_1ft(),
      slr_2ft: slr_2ft().addTo(map),
      slr_3ft: slr_3ft(),
      slr_4ft: slr_4ft(),
      slr_5ft: slr_5ft().addTo(map),
      slr_6ft: slr_6ft(),
      slr_7ft: slr_7ft(),
      slr_8ft: slr_8ft(),
      slr_9ft: slr_9ft(),
      slr_10ft: slr_10ft()
    },
    { position: "topright", collapsed: false }
  );

  map.addControl(controlLayers);
})()
```


And here's an exploration of variations in confidence levels within the model:


```js
const map_conf = (() => {
  const container = display(html`<div style="width:${width}px;height:${
    width / 1.6
  }px">`);
  // yield container;

  const map = L.map(container).setView([42.3650074, -71.0247722], 14);

  const controlLayers = new L.control.layers(
    {
      "Open Street Maps": OSM_Layer(),
      "World Imagery": World_Imagery(),
      "World Topo Map": World_Topo().addTo(map)
    },
    {
      conf_0ft: conf_0ft().addTo(map),
      conf_1ft: conf_1ft(),
      conf_2ft: conf_2ft(),
      conf_3ft: conf_3ft(),
      conf_4ft: conf_4ft(),
      conf_5ft: conf_5ft().addTo(map),
      conf_6ft: conf_6ft(),
      conf_7ft: conf_7ft(),
      conf_8ft: conf_8ft(),
      conf_9ft: conf_9ft(),
      conf_10ft: conf_10ft()
    },
    { position: "topright", collapsed: false }
  );

  map.addControl(controlLayers);
})()
```


Data prepended with \`slr\` were from a projection model:


```js
viewLayer(conf_10ft())
```

```js
const slr_0ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_0ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_0ft())
```

```js
const slr_1ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_1ft())
```

```js
const slr_2ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_2ft())
```

```js
const slr_3ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_3ft())
```

```js
const slr_4ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_4ft())
```

```js
const slr_5ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_5ft())
```

```js
const slr_6ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_6ft())
```

```js
const slr_7ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_7ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_7ft())
```

```js
const slr_8ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_8ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_8ft())
```

```js
const slr_9ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_9ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_9ft())
```

```js
const slr_10ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_10ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(slr_10ft())
```


Data prepended with \`conf\` were created to help identfy errors in the SLR dataset:


```js
const conf_0ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_0ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_0ft())
```

```js
const conf_1ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_1ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_1ft())
```

```js
const conf_2ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_2ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_2ft())
```

```js
const conf_3ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_3ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_3ft())
```

```js
const conf_4ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_4ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_4ft())
```

```js
const conf_5ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_5ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_5ft())
```

```js
const conf_6ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_6ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_6ft())
```

```js
const conf_7ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_7ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_7ft())
```

```js
const conf_8ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_8ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_8ft())
```

```js
const conf_9ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_9ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
```

```js
viewLayer(conf_9ft())
```

```js
const conf_10ft = () =>
  L.tileLayer(
    "https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_10ft/MapServer/tile/{z}/{y}/{x}",
    {
      size: "256,256",
      format: "jpgpng",
      bboxSR: "3857",
      imageSR: "3857",
      transparent: "true",
      f: "image",
      opacity: 0.6
    }
  )
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
const World_Imagery = () =>
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 17
    }
  )
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


### Not Yet Rendered

* [dc_slr/Data_Extent](https://coast.noaa.gov/arcgis/rest/services/dc_slr/Data_Extent/MapServer) (MapServer)
* [dc_slr/Flood_Frequency](https://coast.noaa.gov/arcgis/rest/services/dc_slr/Flood_Frequency/MapServer) (MapServer)
* [dc_slr/HistoricMaps_3ftSLR](https://coast.noaa.gov/arcgis/rest/services/dc_slr/HistoricMaps_3ftSLR/MapServer) (MapServer)
* [dc_slr/HistoricMaps](https://coast.noaa.gov/arcgis/rest/services/dc_slr/HistoricMaps/MapServer) (MapServer)
* [dc_slr/marsh_000](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_000/MapServer) (MapServer)
* [dc_slr/marsh_050](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_050/MapServer) (MapServer)
* [dc_slr/marsh_1000](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_1000/MapServer) (MapServer)
* [dc_slr/marsh_100](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_100/MapServer) (MapServer)
* [dc_slr/marsh_150](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_150/MapServer) (MapServer)
* [dc_slr/marsh_200](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_200/MapServer) (MapServer)
* [dc_slr/marsh_250](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_250/MapServer) (MapServer)
* [dc_slr/marsh_300](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_300/MapServer) (MapServer)
* [dc_slr/marsh_350](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_350/MapServer) (MapServer)
* [dc_slr/marsh_400](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_400/MapServer) (MapServer)
* [dc_slr/marsh_450](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_450/MapServer) (MapServer)
* [dc_slr/marsh_500](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_500/MapServer) (MapServer)
* [dc_slr/marsh_550](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_550/MapServer) (MapServer)
* [dc_slr/marsh_600](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_600/MapServer) (MapServer)
* [dc_slr/marsh_650](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_650/MapServer) (MapServer)
* [dc_slr/marsh_700](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_700/MapServer) (MapServer)
* [dc_slr/marsh_750](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_750/MapServer) (MapServer)
* [dc_slr/marsh_800](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_800/MapServer) (MapServer)
* [dc_slr/marsh_850](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_850/MapServer) (MapServer)
* [dc_slr/marsh_900](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_900/MapServer) (MapServer)
* [dc_slr/marsh_950](https://coast.noaa.gov/arcgis/rest/services/dc_slr/marsh_950/MapServer) (MapServer)
* [dc_slr/Point_Layers](https://coast.noaa.gov/arcgis/rest/services/dc_slr/Point_Layers/MapServer) (MapServer)


### Rendered

* [dc_slr/conf_0ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_0ft/MapServer) (MapServer)
* [dc_slr/conf_10ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_10ft/MapServer) (MapServer)
* [dc_slr/conf_1ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_1ft/MapServer) (MapServer)
* [dc_slr/conf_2ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_2ft/MapServer) (MapServer)
* [dc_slr/conf_3ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_3ft/MapServer) (MapServer)
* [dc_slr/conf_4ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_4ft/MapServer) (MapServer)
* [dc_slr/conf_5ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_5ft/MapServer) (MapServer)
* [dc_slr/conf_6ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_6ft/MapServer) (MapServer)
* [dc_slr/conf_7ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_7ft/MapServer) (MapServer)
* [dc_slr/conf_8ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_8ft/MapServer) (MapServer)
* [dc_slr/conf_9ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/conf_9ft/MapServer) (MapServer)

* [dc_slr/slr_0ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_0ft/MapServer) (MapServer)
* [dc_slr/slr_10ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_10ft/MapServer) (MapServer)
* [dc_slr/slr_1ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer) (MapServer)
* [dc_slr/slr_2ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer) (MapServer)
* [dc_slr/slr_3ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer) (MapServer)
* [dc_slr/slr_4ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer) (MapServer)
* [dc_slr/slr_5ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer) (MapServer)
* [dc_slr/slr_6ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer) (MapServer)
* [dc_slr/slr_7ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_7ft/MapServer) (MapServer)
* [dc_slr/slr_8ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_8ft/MapServer) (MapServer)
* [dc_slr/slr_9ft](https://coast.noaa.gov/arcgis/rest/services/dc_slr/slr_9ft/MapServer) (MapServer)
* [dc_slr/SOVI](https://coast.noaa.gov/arcgis/rest/services/dc_slr/SOVI/MapServer) (MapServer)


---
## Helpers


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
  lat: 42.3650074,
  lon: -71.0247722,
  zoom: 12
})
```

```js
//L = {
//  const L = require("leaflet@1.7.1");
//  const n = html`<link href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css" rel=stylesheet>`;
//  document.head.appendChild(n);
//  invalidation.then(() => n.remove());
//  return L;
//}
```

---
## References

* https://observablehq.com/@ambassadors/3band_cir_8bit_imagery


---
## Acknowledgements

The motivation for creating this notebook comes from the conversation, ["Data Science for Environmental Research (and Advocacy)"](https://observablehq.com/@ambassadors/data-science-for-environmental-research-and-advocacy). **All the heavy lifting getting these data layers to render is thanks to [@mootari](https://observablehq.com/@mootari).**