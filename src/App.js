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
  TerrainProvider,
  CesiumTerrainProvider,
  createWorldTerrain,
  SceneMode,
} from "cesium";

// Ion.defaultAccessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlODFiNzFkOC01Y2VkLTQzMzUtYjFkYi0yOTRhNDkyNDg5MzkiLCJpZCI6MzEwODEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ4MDY5Njl9.eM9Y6E3wuMjFcUoCxhnAbDH5ATjSHQIOIykE95HFeII";

const position = Cartesian3.fromDegrees(18.592764, 54.351614, 30);
const pointGraphics = { pixelSize: 10 };
// const terrainProvider = createWorldTerrain();
const terrainProvider = new CesiumTerrainProvider({
  url: IonResource.fromAssetId(124939),
});

function App() {
  const [cameraPosition, setCameraPosition] = useState(
    Cartesian3.fromDegrees(18.592764, 54.351614, 3000)
  );
  const [cameraDirection, setCameraDirection] = useState(
    Cartesian3.negate(Cartesian3.UNIT_Z, new Cartesian3())
  );
  const [terrain3D, setTerrain3D] = useState(false);
  const [sceneMode, setSceneMode] = useState(SceneMode.SCENE2D);

  function handleClick(e) {
    e.preventDefault();
    setTerrain3D(!terrain3D);
  }

  function handleSceneModeTo3D(e) {
    e.preventDefault();
    setSceneMode(SceneMode.SCENE3D);
  }
  function handleSceneModeTo2D(e) {
    e.preventDefault();
    setSceneMode(SceneMode.SCENE2D);
  }

  return (
    <>
      <CesiumWidget
        terrainProvider={terrain3D ? terrainProvider : createWorldTerrain()}
      >
        <Camera
          position={cameraPosition}
          up={Cartesian3.clone(Cartesian3.UNIT_Y)}
          direction={cameraDirection}
          onChange={() => {
            console.log(cameraPosition);
            console.log(cameraDirection);
          }}
        />
        <Scene mode={sceneMode} />
        <ImageryLayerCollection>
          <ImageryLayer
            imageryProvider={
              new WebMapServiceImageryProvider({
                url: "http://figeo.geopartner.gda.pl/geoserver/wms",
                layers: "2020-03_s6_z2_6_500-7_200_orto",
                parameters: { format: "image/png", TRANSPARENT: true },
              })
            }
          ></ImageryLayer>
          <ImageryLayer
            imageryProvider={
              new WebMapServiceImageryProvider({
                url: "http://figeo.geopartner.gda.pl/geoserver/wms",
                layers: "2020-03_s6_z2_5_500-6_500_orto",
                parameters: { format: "image/png", TRANSPARENT: true },
              })
            }
          ></ImageryLayer>
        </ImageryLayerCollection>
        <Entity position={position} name="Geopartner" point={pointGraphics}>
          <EntityDescription>
            <h1>Best Job in the world!</h1>
            <p>but they pay nothing</p>
          </EntityDescription>
        </Entity>
        <button onClick={handleClick}>Show terrain 3d</button>
        <button onClick={handleSceneModeTo2D}>2d</button>
        <button onClick={handleSceneModeTo3D}>3d</button>
      </CesiumWidget>
    </>
  );
}

export default hot(App);
