import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import {
  Entity,
  EntityDescription,
  CesiumWidget,
  Viewer,
  Globe,
  Scene,
  Camera,
  ImageryLayer,
  ImageryLayerCollection,
  Cesium3DTileset,
} from "resium";
import {
  Cartesian3,
  WebMapServiceImageryProvider,
  IonResource,
  Ion,
} from "cesium";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlODFiNzFkOC01Y2VkLTQzMzUtYjFkYi0yOTRhNDkyNDg5MzkiLCJpZCI6MzEwODEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ4MDY5Njl9.eM9Y6E3wuMjFcUoCxhnAbDH5ATjSHQIOIykE95HFeII";

const position = Cartesian3.fromDegrees(18.592764, 54.351614, 30);
const pointGraphics = { pixelSize: 10 };

function App() {
  const [cameraPosition, setCameraPosition] = useState(
    Cartesian3.fromDegrees(18.592764, 54.351614, 3000)
  );
  const [cameraDirection, setCameraDirection] = useState(
    Cartesian3.fromDegrees(18, 54, 100)
  );

  let viewer;

  const handleReady = (tileset) => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };

  return (
    <>
      <CesiumWidget
        ref={(e) => {
          viewer = e && e.cesiumElement;
        }}
      >
        <ImageryLayerCollection>
          <ImageryLayer
            imageryProvider={
              new WebMapServiceImageryProvider({
                url: "http://figeo.geopartner.gda.pl/geoserver/wms",
                layers: "GDDKIA:S7_zad2_38000-39000_2015-10-30_projekt",
                parameters: { format: "image/png", TRANSPARENT: true },
              })
            }
          ></ImageryLayer>
          <ImageryLayer
            imageryProvider={
              new WebMapServiceImageryProvider({
                url: "http://figeo.geopartner.gda.pl/geoserver/wms",
                layers: "GDDKIA:S7_zad2_38000-39000_2019-05-24",
                parameters: { format: "image/png", TRANSPARENT: true },
              })
            }
          ></ImageryLayer>
          <Cesium3DTileset
            url={IonResource.fromAssetId(124872)}
            onReady={handleReady}
          />
        </ImageryLayerCollection>
        <Entity position={position} name="Geopartner" point={pointGraphics}>
          <EntityDescription>
            <h1>Best Job in the world!</h1>
            <p>but they pay nothing</p>
          </EntityDescription>
        </Entity>
        {/* <button onClick={setSecondCesium(!secondCesium)}></button> */}
      </CesiumWidget>
    </>
  );
}

export default hot(App);
