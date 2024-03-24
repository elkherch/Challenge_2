import './Map.css';
import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

function Map() {
    const cities = [
        { ville: "Aïoun", latitude: 16.8366893287323, longitude: -9.27583480330441 },
        { ville: "Akjoujt", latitude: 19.9420143167071, longitude: -14.6440193516613 },
        { ville: "Aleg", latitude: 17.1728009990846, longitude: -13.9023810848904 },
        { ville: "Atar", latitude: 20.6190971368345, longitude: -13.4188043441809 },
        { ville: "Kaédi", latitude: 16.0455219912174, longitude: -13.1873050779235 },
        { ville: "Kiffa", latitude: 16.678771880566, longitude: -11.4111923888962 },
        { ville: "Néma", latitude: 16.3926143684381, longitude: -7.34328812930029 },
        { ville: "Nouadhibou", latitude: 21.0200766331283, longitude: -15.9151199295992 },
        { ville: "Nouakchott", latitude: 18.0783994226296, longitude: -15.885155269477 },
        { ville: "Rosso", latitude: 16.6264755333439, longitude: -15.6941505288147 },
        { ville: "Sélibaby", latitude: 15.4729996284158, longitude: -12.1965786387684 },
        { ville: "Tidjikja", latitude: 18.6315729894793, longitude: -11.5524434053275 },
        { ville: "Zoueratt", latitude: 23.4958870003132, longitude: -10.1376367144798 }
    ];

// Exemple d'accès aux données :
    console.log(cities[0].ville); // Sortie : "Aïoun"
    console.log(cities[0].latitude); // Sortie : 16.8366893287323
    console.log(cities[0].longitude); // Sortie : -9.27583480330441

    return (
        <div className="App">
            <MapContainer center={[18.031,-15.963]} zoom={6} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker key={city.ville} position={[city.latitude, city.longitude]}>
                        <Popup>
                            Ville : {city.ville}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
let DefaultIcon = L.icon({
    iconUrl:"https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png"
})
L.Marker.prototype.options.icon=DefaultIcon

export default Map;
