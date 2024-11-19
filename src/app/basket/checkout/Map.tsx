'use client'

import React, { useState } from "react";
import Mapir from "mapir-react-component";

const Map = Mapir.setToken({
  transformRequest: (url: any) => {
    return {
      url: url,
      headers: {
        "x-api-key": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzMWJhMDY4YzgwMmE4ZDdhYWMxMjVhZDc3ZTY0YjNlMWFjOGMwNjA3ZTIzOTg5MGY2NTNlYTRhMTcwODc4NWU0OTZmNzM4NWZlN2FiMmY3In0.eyJhdWQiOiIyOTY0NiIsImp0aSI6IjUzMWJhMDY4YzgwMmE4ZDdhYWMxMjVhZDc3ZTY0YjNlMWFjOGMwNjA3ZTIzOTg5MGY2NTNlYTRhMTcwODc4NWU0OTZmNzM4NWZlN2FiMmY3IiwiaWF0IjoxNzMxOTEyOTg2LCJuYmYiOjE3MzE5MTI5ODYsImV4cCI6MTczNDQxODU4Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.SduX5zGIV-TCo5_pvExENvOYDGutDzbpGbETv8JZvfULqOoduuMzKjy2a3EI3QuD0A3iF8a2KpV4WebQT7SRP2h4q4zKq8fHW2UPPdnI_nBjeEDvZ6HGoN8fxIKJH_ZrmFALlRzK9hZh8WjhRbGXiE2Qm2FEDoPlEHuDMYGYZedXM_cNZrOxURvn4Fef-_gSTQFYk7B0-qu4PxqH7lay6ABjrZoL7ibFWJKk-lshxT-7eM8u_k1XpNYOw5GI3Tu6K4MRWmubWSzOzJIiMHKWmKlPOc62sc0QWX_QWyWSfQm3QzsmxwWgSdcF2G_qXX4xQBnNpFNc7uGSbZwQffWadw',
        "Mapir-SDK": "reactjs"
      }
    };
  }
});

const MapComponent = ({ handleMap }: { handleMap: (data: any) => void }) => {
  const [markerArray, setMarkerArray] = useState(<></>);
  const [coord, setCoord] = useState([51.42, 35.72]);
  function reverseFunction(map: any, e: { lngLat: { lat: any; lng: any; }; }) {
    var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${
      e.lngLat.lng
    }`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzMWJhMDY4YzgwMmE4ZDdhYWMxMjVhZDc3ZTY0YjNlMWFjOGMwNjA3ZTIzOTg5MGY2NTNlYTRhMTcwODc4NWU0OTZmNzM4NWZlN2FiMmY3In0.eyJhdWQiOiIyOTY0NiIsImp0aSI6IjUzMWJhMDY4YzgwMmE4ZDdhYWMxMjVhZDc3ZTY0YjNlMWFjOGMwNjA3ZTIzOTg5MGY2NTNlYTRhMTcwODc4NWU0OTZmNzM4NWZlN2FiMmY3IiwiaWF0IjoxNzMxOTEyOTg2LCJuYmYiOjE3MzE5MTI5ODYsImV4cCI6MTczNDQxODU4Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.SduX5zGIV-TCo5_pvExENvOYDGutDzbpGbETv8JZvfULqOoduuMzKjy2a3EI3QuD0A3iF8a2KpV4WebQT7SRP2h4q4zKq8fHW2UPPdnI_nBjeEDvZ6HGoN8fxIKJH_ZrmFALlRzK9hZh8WjhRbGXiE2Qm2FEDoPlEHuDMYGYZedXM_cNZrOxURvn4Fef-_gSTQFYk7B0-qu4PxqH7lay6ABjrZoL7ibFWJKk-lshxT-7eM8u_k1XpNYOw5GI3Tu6K4MRWmubWSzOzJIiMHKWmKlPOc62sc0QWX_QWyWSfQm3QzsmxwWgSdcF2G_qXX4xQBnNpFNc7uGSbZwQffWadw'
      }
    })
      .then(response => response.json())
      .then(handleMap);
    const marker = (
      <Mapir.Marker
        coordinates={[e.lngLat.lng, e.lngLat.lat]}
        anchor="bottom"
      />
    );
    setMarkerArray(marker);
    
  }
  return (
      <Mapir center={coord} Map={Map} onClick={reverseFunction}>
        {markerArray}
      </Mapir>
  );
};

export default MapComponent;