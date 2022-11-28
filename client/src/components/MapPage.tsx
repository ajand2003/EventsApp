import { EventProps } from "./EventsPage";
import UserContext from "./UserContext";
import {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RSVPList from "./RSVPList";
import Invite from "./Invite";




export default function MapPage() {


    const[events, setEvents] = useState<any>([]);
    const [location, getLocation] = useState('')
    const [eventClicked, setEventClicked] = useState(0);
    const[isEditing, setIsEditing] = useState(false)
    const [active, setActive] = useState(-1);
    const [update,setUpdate] = useState(false);
    const [pageNumbers, setPageNumbers] = useState<any>([]);
    const [currPage, setCurrPage] = useState(0);
    const [currPages, setCurrPages] = useState<any>([]);
    const navigate = useNavigate();


return (
    <div>
  <body>
    <h3>My Google Maps Demo</h3>
    <title>Add Map</title>
    <script src="https://polyfill.io/v3/polyfill.js?features=default"></script>

    <link rel="stylesheet" type="text/css" href="./App.css" />
    <script type="module" src='./InitMap.js'></script>
    <div id="map"></div>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAU5sC9Y2JMa-XckX8Ie2p0ByS2nDT363s&callback=initMap&v=weekly"
      defer
    ></script>
  </body>
  </div>
)
/* <body>
    <div id="map"></div>

    <script src="./keys.js"></script>
    <script>
        let map;
        document.addEventListener("DOMContentLoaded", () => {
            let s = document.createElement("script");
            document.head.appendChild(s);
            s.addEventListener("load", () => {
                //script has loaded
                console.log("script has loaded");
                map = new google.maps.Map(document.getElementById("map"), {
                    center: {
                        lat: 45.3496711,
                        lng: -75.7569551
                    },
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            });
            s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPKEY}`;
        });
    </script>
    </body> */
}