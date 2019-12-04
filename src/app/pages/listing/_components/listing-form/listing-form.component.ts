import { Component, OnInit, ViewChild, AfterContentInit } from "@angular/core";
import { ScriptLoaderService } from "../../../../services/script-loader.service";
import googleAddressParser from "../../../../../assets/js/googleAddressParser.js";
import { NgForm } from '@angular/forms';
import { Listing } from 'src/app/models/Listing';
declare var $: any;
declare var google: any;

@Component({
  selector: "app-listing-form",
  templateUrl: "./listing-form.component.html",
  styleUrls: ["./listing-form.component.css"]
})
export class ListingFormComponent implements OnInit, AfterContentInit {
  map: any = {};
  listing: Listing;

  @ViewChild('#f', {static: true}) form: NgForm;

  constructor(private _script: ScriptLoaderService) {
    this.listing = new Listing();
  }

  ngOnInit() {
    if ($("#location-google-map").length !== 0) {
      this.setInitialLatLong();
    }

    googleAddressParser;
  }
  ngAfterContentInit(): void {
    // this._script
    //   .loadScripts("body", ["assets/js/bootstrap.min.js"], true)
    //   .then(result => {
    //     console.log(result);
    //   });
  }

  setInitialLatLong() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("pos:", position);
        this.listing.latitude = position.coords.latitude;
        this.listing.longitude = position.coords.longitude;
        this.initializeMap();
        this.getAddressFromLatLang(position);
      });
    } else {
      this.listing.latitude = 43.653226;
      this.listing.longitude = -79.38318429999998;
      this.initializeMap();
      this.getAddressFromLatLang({coords: {latitude: this.listing.latitude, longitude: this.listing.longitude}});
    }
  }

  onSubmit(form: NgForm){

  }

  initializeMap() {
    this.setInitialLatLong();
    let searchInput = $(".location-google-map-search");
    let mapCanvas = $("#location-google-map");
    // let latitude = $("#listing_location_latitude");
    // let longitude = $("#listing_location_longitude");
    let latLng = new google.maps.LatLng(this.listing.latitude, this.listing.longitude);
    let zoom = 5;

    // If we have saved values, let's set the position and zoom level
    if (this.listing.latitude.toString().length > 0 && this.listing.longitude.toString().length > 0) {
      latLng = new google.maps.LatLng(this.listing.latitude, this.listing.longitude);
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

    if (this.listing.latitude.toString().length > 0 && this.listing.longitude.toString().length > 0) {
      marker.setPosition(latLng);
    }

    // Search
    let autocomplete = new google.maps.places.Autocomplete(searchInput[0]);
    autocomplete.bindTo("bounds", this.map);

    google.maps.event.addListener(autocomplete, "place_changed", () => {
      console.log(
        googleAddressParser(
          autocomplete.getPlace().formatted_address
        ).getAddress()
      );
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

      // latitude.val(place.geometry.location.lat());
      // longitude.val(place.geometry.location.lng());

      this.listing.latitude = place.geometry.location.lat();
      this.listing.longitude = place.geometry.location.lng();
    });

    $(searchInput).keypress(event => {
      if (13 === event.keyCode) {
        event.preventDefault();
      }
    });

    // Allow marker to be repositioned
    google.maps.event.addListener(marker, "drag", () => {
      // latitude.val(marker.getPosition().lat());
      // longitude.val(marker.getPosition().lng());
      this.listing.latitude = marker.getPosition().lat();
      this.listing.longitude = marker.getPosition().lng();
    });
  }

  getAddressFromLatLang(position) {
    var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
            this.listing.address = results[0].formatted_address;
            console.log(this.listing.address);
        }
      } else {
          console.error("Geocode was not successfulfor the following reason: " + status);
      }
    });
  }
}
