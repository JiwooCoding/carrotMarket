import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
    longitude:number;
    latitude: number;
    //detailPage에서는 
    setCustomValue?: (id:string, value: number) => void;
    detailPage?: boolean;
}

const KakaoMap = ({longitude, latitude, setCustomValue, detailPage=false}:KakaoMapProps) => {
    
    const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
        //detailPage일 때는 setCustomValue에 도달하지 않도록 return 안해주고 
        //아닐때는 항상 있다고 setCustomValue! 느낌표 붙이기
        if(detailPage) return;
        setCustomValue!('latitude',mouseEvent.latLng.getLat());
        setCustomValue!('longitude',mouseEvent.latLng.getLng());
    }

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "280px" }}
      //카카오 맵에서 제공하는 지도 클릭 이벤트
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}>
    
      </MapMarker>
    </Map>
  )
}

export default KakaoMap