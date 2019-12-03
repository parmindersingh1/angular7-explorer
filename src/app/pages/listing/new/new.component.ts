import { Component, OnInit, AfterContentInit } from "@angular/core";
import { ScriptLoaderService } from "../../../services/script-loader.service";
import googleAddressParser from "../../../../assets/js/googleAddressParser.js"
declare var $: any;
declare var google: any;

@Component({
  selector: "listing-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent implements OnInit, AfterContentInit {
  map: any = {};
  latitude: number;
  longitude: number;

  constructor(private _script: ScriptLoaderService) {}

  ngOnInit() {
    if ($("#location-google-map").length !== 0) {
      this.setInitialLatLong();
    }

    googleAddressParser
  }
  ngAfterContentInit(): void {
    this._script
      .loadScripts(
        "body",
        ["assets/js/bootstrap.min.js"],
        true
      )
      .then(result => {
        console.log(result);
      });
  }

  setInitialLatLong() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("pos:", position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.initializeMap();
      });
    } else {
      this.latitude = 43.653226;
      this.longitude = -79.38318429999998;
      this.initializeMap();
    }
  }

  initializeMap() {
    this.setInitialLatLong();
    let searchInput = $(".location-google-map-search");
    let mapCanvas = $("#location-google-map");
    let latitude = $("#listing_location_latitude");
    let longitude = $("#listing_location_longitude");
    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    let zoom = 5;

    // If we have saved values, let's set the position and zoom level
    if (latitude.val().length > 0 && longitude.val().length > 0) {
      latLng = new google.maps.LatLng(latitude.val(), longitude.val());
      zoom = 17;
    }

    // Map
    let mapOptions = {
      center: latLng,
      zoom: zoom
    };

    this.map = new google.maps.Map(mapCanvas[0], mapOptions);

    // Marker
    let markerOptions = {
      map: this.map,
      draggable: true,
      title: "Drag to set the exact location"
    };
    let marker = new google.maps.Marker(markerOptions);

    if (latitude.val().length > 0 && longitude.val().length > 0) {
      marker.setPosition(latLng);
    }

    // Search
    let autocomplete = new google.maps.places.Autocomplete(searchInput[0]);
    autocomplete.bindTo("bounds", this.map);

    google.maps.event.addListener(autocomplete, "place_changed", () => {
      console.log(googleAddressParser(autocomplete.getPlace().formatted_address).getAddress());
      let place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);

      latitude.val(place.geometry.location.lat());
      longitude.val(place.geometry.location.lng());
    });

    $(searchInput).keypress(event => {
      if (13 === event.keyCode) {
        event.preventDefault();
      }
    });

    // Allow marker to be repositioned
    google.maps.event.addListener(marker, "drag", () => {
      latitude.val(marker.getPosition().lat());
      longitude.val(marker.getPosition().lng());
    });
  }
}
