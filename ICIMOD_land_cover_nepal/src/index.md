# ICIMOD | Land Cover of Nepal 2000-2019

**Data Source** [ICIMOD Regional Database System](http://rds.icimod.org/Home/DataDetail?metadataId=1972729). 
</br>**Archive Version Date:** 4/21/2022 3:48:22 PM.

The annual land cover data of Nepal (2000-2019) have been created through the National Land Cover Monitoring System (NLCMS) for Nepal. The system uses freely available remote-sensing data (Landsat) and a cloud-based machine learning architecture in the Google Earth Engine (GEE) platform to generate land cover maps on an annual basis using a harmonized and consistent classification system. The NLCMS is developed by the Forest Research and Training Centre (FRTC), Ministry of Forests and Environment, Government of Nepal with support from the International Centre for Integrated Mountain Development (ICIMOD) through SERVIR Hindu Kush Himalaya (SERVIR-HKH), a joint initiative in partnership with the National Aeronautics and Space Administration (NASA) and the United States Agency for International Development (USAID). Collaborators include SERVIR–Mekong at the Asian Disaster Preparedness Center (ADPC), SilvaCarbon, Global Land Analysis and Discovery (GLAD) group at the University of Maryland, and the US Forest Service.

---



```js echo
const archive_select = view(Inputs.select(archives, {
  multiple: false,
  label: "Select Archive",
  value: archives.slice(-1)[0],
  format: (url) => {
    // From: https://befused.com/javascript/get-filename-url/ 
    return url.substring(url.lastIndexOf("/") + 1);
  }
}))
```


```js echo
var count = 0;

function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}

function uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

function context2d(width, height, dpi) {
  if (dpi == null) dpi = devicePixelRatio;
  var canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.maxWidth = "100%";
  var context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return context;
}
```

```js echo
const canvas_upper = (() => {
  const context = context2d(width, height);

  //context.style.maxWidth = "100%";

  const plot = new plotty.plot({
    context,
    data: image_data[0],
    width,
    height,
    domain: [0, 11],
    colorScale: "viridis"
  });

  plot.render();

  return display(context.canvas);
})()
```

---

```js echo
const feature = view(Inputs.checkbox(featureBitmap, {
  label: "Feature",
  value: [featureBitmap.get("Forest")]
}))
```

```js echo
const canvas_lower = (() => {
  const context = context2d(width, height);

  // context.style.maxWidth = "100%";

  const plot = new plotty.plot({
    context,
    data: featureArray,
    width,
    height,
    domain: [1, 0],
    colorScale: "greys"
  });

  plot.render();

  display(context.canvas);
})()
```


```js echo
const archives = [
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2000.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2001.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2002.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2003.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2004.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2005.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2006.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2007.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2008.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2009.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2010.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2011.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2013.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2014.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2015.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2016.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2017.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2018.zip",
  "https://s3.amazonaws.com/geospatial.data/nepal/icimod/nlcms_2019.zip",
]
```

```js echo
import JSZip from "npm:jszip";
```

```js echo
const zip = display(new JSZip());
```

```js echo
const zipreader = display((fileDescriptor, { type = "string" } = {}) =>
  fileDescriptor
    .arrayBuffer()
    .then(d => zip.loadAsync(d))
    .then(
      ({ files }) =>
        new Map(Object.keys(files).map(f => [f, files[f].async(type)]))
    ))
```

```js echo
const archive_reader = display(await fetch(archive_select).then((z) => zipreader(z, { type: "arraybuffer" })))
```

```js echo
const tiff_file_buffer = display(await archive_reader.get("data/LandCover_NP_" + extractYearFromURL(archive_select) + ".tif"))
```

```js echo
const tiff = display(await GeoTIFF.fromArrayBuffer(tiff_file_buffer))
```

```js echo
function extractYearFromURL(url) {
  var parts = url.split('/');
  var fileName = parts[parts.length - 1];
  var yearMatch = fileName.match(/\d{4}/);
  
  if (yearMatch) {
    return yearMatch[0];
  }
  
  return null; // or any other default value you prefer
}
```

```js echo
const image = display(await tiff.getImage())
```

```js echo
const image_data = display(await image.readRasters({ width, height }))
```

```js echo
const imageAspectRatio = display(image.getWidth() / image.getHeight())
```

```js echo
const height = display(Math.floor(width / imageAspectRatio))
```

```js echo
import * as GeoTIFF from "npm:geotiff";
```

```js echo
const plotty = display(await import("https://cdn.skypack.dev/plotty@0.4.9?min"))
```

```js echo
const featureArray = display(image_data[0].map((d) => (feature.includes(d) ? 1 : 0)))
```

```js echo
const featureBitmap = new Map([
  ["Waterbody", 1],
  ["Glacier", 2],
  ["Snow", 3],
  ["Forest", 4],
  ["Riverbed", 5],
  ["Built-up area", 6],
  ["Cropland", 7],
  ["Bare soil", 8],
  ["Bare rock", 9],
  ["Grassland", 10],
  ["Other wooded land", 11]
])
```

---

### Source: ICIMOD | [Land cover of Nepal](http://rds.icimod.org/Home/DataDetail?metadataId=1972729)

```html
<!--original: "http://rds.icimod.org/Content/metadataImage/1972700-1972799/1972729/public/MicrosoftTeams-image.png"-->
<figure>
  <img src=${await FileAttachment("image.png").url()} alt="Map showing land usage and cover of Nepal">
  <figcaption>Land cover of Nepal. <strong>Credit:</strong> <a href="http://rds.icimod.org/Content/metadataImage/1972700-1972799/1972729/public/MicrosoftTeams-image.png">ICIMOD</a></figcaption>
</figure>

```

```html
<div class="metadata-table">
	<div class="two-tables info">
		<table class="table table-striped">
      <thead>
				<tr>
					<th colspan="2" class="upper">Metadata Record Info</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2 col-sm-2">Schema</td>
					<td class="col-md-10 col-sm-10">iso19139</td>
				</tr>

				<tr>
					<td class="col-md-2">Purpose</td>
					<td class="col-md-10">
						The annual land cover data of Nepal (2000–2019) developed using a harmonized and consistent classification system will support assessment and monitoring of land cover change in the country and will serve as key
						dataset in various thematic applications.
					</td>
				</tr>
				<tr>
					<td class="col-md-2">Descriptive Keyword</td>
					<td class="col-md-10">
						<span> Land cover, Land use, GIS, spatial data, Landsat, GEE, Google Earth Engine, Earth Observation, NLCMS (theme)</span>
						<span> Nepal, FRTC, ICIMOD, SERVIR-HKH (place)</span>
					</td>
				</tr>
				<tr>
					<td class="col-md-2">Language</td>
					<td class="col-md-10" style="text-transform: capitalize">eng</td>
				</tr>
				<tr>
					<td class="col-md-2">Charset</td>
					<td class="col-md-10" style="text-transform: capitalize">utf8</td>
				</tr>
				<tr>
					<td class="col-md-2">Hierarchy Level</td>
					<td class="col-md-10">dataset</td>
				</tr>
				<tr>
					<td class="col-md-2">Date</td>
					<td class="col-md-10">2022-04-21T15:48:22</td>
				</tr>
				<tr>
					<td class="col-md-2">Standard Name</td>
					<td class="col-md-10">North American Profile of ISO 19115:2003</td>
				</tr>
			</tbody>
		</table>
		<table class="metadata table table-striped" style="">
			<thead>
				<tr>
					<th colspan="2" class="upper">Contact</th>
				</tr>
			</thead>
			<tbody>
				<tr class="align-left">
					<td class="col-md-2">Name</td>
					<td class="col-md-4">Mr. Raja Ram Aryal</td>
					<td class="col-md-2 odd">Email</td>
					<td class="col-md-4">raja.aryal@nepal.gov.np</td>
				</tr>

				<tr>
					<td class="col-md-2 odd">Organization Name</td>
					<td class="col-md-4">FRTC</td>
					<td class="col-md-2 odd">Voice</td>
					<td class="col-md-4"></td>
				</tr>

				<tr>
					<td class="col-md-2 odd">Position name</td>
					<td class="col-md-4"></td>
					<td class="col-md-2 odd">Address</td>
					<td class="col-md-4"></td>
				</tr>
				<tr>
					<td class="col-md-2 odd">Role</td>
					<td class="col-md-4">author</td>
					<td class="col-md-2 odd"></td>
					<td class="col-md-4"></td>
				</tr>
			</tbody>
		</table>
		<div class="clear sep"></div>
		<table class="table table-striped" style="">
			<thead>
				<tr>
					<th colspan="2" class="upper">
						Identification Info
					</th>
				</tr>
			</thead>
			<tbody style="text-align:left">
				<tr class="">
					<td class="col-md-2">Title</td>
					<td class="col-md-10">Land cover of Nepal</td>
				</tr>
				<tr>
					<td class="col-md-2">Date</td>
					<td class="col-md-10">2021-02-10</td>
				</tr>
				<tr>
					<td class="col-md-2">Date Type</td>
					<td class="col-md-10">publication</td>
				</tr>
				<tr>
					<td class="col-md-2">Purpose</td>
					<td class="col-md-10">
						The annual land cover data of Nepal (2000–2019) developed using a harmonized and consistent classification system will support assessment and monitoring of land cover change in the country and will serve as key
						dataset in various thematic applications.
					</td>
				</tr>

				<tr>
					<td class="col-md-2">Status</td>
					<td class="col-md-10">completed</td>
				</tr>
				<tr>
					<td class="col-md-2">Charset</td>
					<td class="col-md-10" style="text-transform: capitalize">
						utf8
					</td>
				</tr>
				<tr>
					<td class="col-md-2">Topic Category</td>
					<td class="col-md-10">
						geoscientificInformation
					</td>
				</tr>
				<tr>
					<td class="col-md-2">Spatial Representation Type</td>
					<td class="col-md-10">
						grid
					</td>
				</tr>
				<tr>
					<td class="col-md-2">Spatial Resolution</td>
					<td class="col-md-10">
						30
					</td>
				</tr>
			</tbody>
		</table>

		<table class="metadata table table-striped" style="">
			<thead>
				<tr>
					<th colspan="2" class="upper">Cited Responsible Parties</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Name</td>
					<td class="col-md-4">Mr. Raja Ram Aryal</td>
					<td class="col-md-2">Email</td>
					<td class="col-md-4">raja.aryal@nepal.gov.np</td>
				</tr>

				<tr>
					<td class="col-md-2">Organization Name</td>
					<td class="col-md-4">FRTC</td>
					<td class="col-md-2">Voice</td>
					<td class="col-md-4"></td>
				</tr>

				<tr>
					<td class="col-md-2">Position name</td>
					<td class="col-md-4"></td>
					<td class="col-md-2">Address</td>
					<td class="col-md-4">Nepal</td>
				</tr>
				<tr>
					<td class="col-md-2">Role</td>
					<td class="col-md-4">author</td>
					<td class="col-md-2"></td>
					<td class="col-md-4"></td>
				</tr>
			</tbody>
		</table>
		<table class="metadata table table-striped" style="">
			<thead>
				<tr></tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Name</td>
					<td class="col-md-4">Mr. Kabir Uddin</td>
					<td class="col-md-2">Email</td>
					<td class="col-md-4">kabir.uddin@icimod.org</td>
				</tr>

				<tr>
					<td class="col-md-2">Organization Name</td>
					<td class="col-md-4">ICIMOD</td>
					<td class="col-md-2">Voice</td>
					<td class="col-md-4">977-1-5275222</td>
				</tr>

				<tr>
					<td class="col-md-2">Position name</td>
					<td class="col-md-4">GIS and Remote Sensing Specialist</td>
					<td class="col-md-2">Address</td>
					<td class="col-md-4"></td>
				</tr>
				<tr>
					<td class="col-md-2">Role</td>
					<td class="col-md-4">author</td>
					<td class="col-md-2"></td>
					<td class="col-md-4"></td>
				</tr>
			</tbody>
		</table>
		<div class="clear sep"></div>

		<div class="clear sep"></div>
		<table class="metadata table table-striped">
			<thead>
				<tr>
					<th colspan="2" class="upper">Geographic Extent</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Geographic Extent East</td>
					<td class="col-md-4">88.169</td>

					<td class="col-md-2">Geographic Extent West</td>
					<td class="col-md-4">80.03</td>
				</tr>

				<tr>
					<td class="col-md-2">Geographic Extent North</td>
					<td class="col-md-4">30.417</td>
					<td class="col-md-2">Geographic Extent South</td>
					<td class="col-md-4">26.344</td>
				</tr>
			</tbody>
		</table>
		<table class="table table-striped">
			<thead>
				<tr>
					<th colspan="2" class="upper">Resource Maintenance Information</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Maintenance and update frequency</td>
					<td class="col-md-10" style="text-transform: capitalize; font-weight: bold">asNeeded</td>
				</tr>

				<tr>
					<td class="col-md-2">User Defined Maintenance Frequency</td>
					<td class="col-md-10">
						<span style="text-transform: capitalize;font-weight: bold"> </span>
					</td>
				</tr>

				<tr>
					<td class="col-md-2">Date of Next Update</td>
					<td class="col-md-10">
						<span style="text-transform: capitalize;font-weight: bold"> </span>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="clear sep"></div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th colspan="2" class="upper">Legal Constraints</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Use Limitation</td>
					<td class="col-md-10">Free to use with attribution to the source. Suggested citation: FRTC. (2022). Land cover of Nepal [Data set]. FRTC. https://doi.org/10.26066/RDS.1972729</td>
				</tr>

				<tr>
					<td class="col-md-2">Access Constraints</td>
					<td class="col-md-10">copyright</td>
				</tr>
				<tr>
					<td class="col-md-2">Use Constraints</td>
					<td class="col-md-10">copyright</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="clear sep"></div>
	<div class="two-tables info">
		<table class="table table-striped">
			<thead>
				<tr>
					<th colspan="2" class="upper">Reference System Information</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Code</td>
					<td class="col-md-10">Lambert Conformal Conic</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="clear sep"></div>

	<div class="two-tables info">
		<table class="table table-striped">
			<thead>
				<tr>
					<th colspan="2" class="upper">Data Quality Info</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2">Hierarchy level</td>
					<td class="col-md-10">dataset</td>
				</tr>

				<tr></tr>
			</tbody>
		</table>
	</div>

	<div class="two-tables info">
		<table class="table table-striped">
			<thead>
				<tr>
					<th colspan="2" class="upper">Distributor Info</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-md-2 odd">Email</td>
					<td class="col-md-4">metadata@icimod.org</td>
					<td class="col-md-2 odd">Organization Name</td>
					<td class="col-md-4">ICIMOD</td>
				</tr>

				<tr>
					<td class="col-md-2 odd">Voice</td>
					<td class="col-md-4"></td>
					<td class="col-md-2 odd">Position name</td>
					<td class="col-md-4"></td>
				</tr>

				<tr>
					<td class="col-md-2 odd">Address</td>
					<td class="col-md-4"></td>
					<td class="col-md-2 odd">Role</td>
					<td class="col-md-4">distributor</td>
				</tr>
			</tbody>
		</table>
	</div>

</div>

```

---

<!-- ## Imports & Helpers -->
