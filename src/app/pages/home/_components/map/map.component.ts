import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  Output,
  Input,
  SimpleChanges
} from "@angular/core";
import { Listing } from "src/app/models/Listing";

declare const $: any;
declare const google: any;
declare const InfoBox: any;
declare const MarkerClusterer: any;
declare const RichMarker: any;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() listings: Listing[] = [];
  @Input() listing_id: number = null;
  @Output() onListingChange = new EventEmitter<number>();

  markers: any[] = [];
  map: any;
  bound: any;
  zoom: number = 13;

  constructor() {}

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById("map-object"), {
      zoom: this.zoom,
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 18 }]
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 16 }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#dedede" }, { lightness: 21 }]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" },
            { lightness: 16 }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
        },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#fefefe" }, { lightness: 20 }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
        }
      ]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("listing_id" in changes) {
      this.listings.forEach(listing => {
        if (listing["id"] === this.listing_id) {
          this.map.setCenter(
            new google.maps.LatLng(listing["latitude"], listing["longitude"])
          );
        }
      });
    }

    if ("listings" in changes) {
      const component = this;
      component.bound = new google.maps.LatLngBounds();

      this.markers.forEach(marker => {
        marker.setMap(null);
      });

      const infobox = new InfoBox({
        content: "empty",
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-250, -330),
        zIndex: null,
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        isOpen: false,
        pane: "floatPane",
        enableEventPropagation: false
      });

      infobox.addListener("domready", () => {
        $(".infobox-close").on("click", function() {
          infobox.close(component.map, this);
          infobox.isOpen = false;
        });
      });

      this.listings.forEach(listing => {
        if (listing["latitude"] && listing["longitude"]) {
          const markerCenter = new google.maps.LatLng(
            listing["latitude"],
            listing["longitude"]
          );

          const markerVerified = listing["is_active"]
            ? '<div class="marker-verified"><i class="fa fa-check"></i></div>'
            : "";

          const markerPrice =
            listing["price"] && listing["price"] != "false"
              ? '<div class="marker-price">' + listing["price"] + "</div>"
              : "";

          const markerContent =
            '<div class="marker">' +
            '<div class="marker-inner">' +
            '<span class="marker-image" style="background-image: url(' +
            listing["thumbnail"] +
            ');"></span>' +
            "</div>" +
            markerVerified +
            markerPrice +
            "</div>";

          const marker = new RichMarker({
            id: listing["id"],
            data: listing,
            flat: true,
            position: markerCenter,
            map: this.map,
            shadow: 0,
            content: markerContent
          });

          marker.addListener("click", () => {
            component.map.setCenter(
              new google.maps.LatLng(listing["latitude"], listing["longitude"])
            );
            component.changeListing(listing["id"]);
          });

          this.markers.push(marker);

          // google.maps.event.addListener(marker, "click", function() {
          //   let c =
          //     '<div class="infobox"><div class="infobox-close"><i class="fa fa-close"></i></div>' +
          //     '<h3 class="infobox-title"><a href="listing.html">' +
          //     marker.data.title +
          //     "</a></h3>" +
          //     '<h4 class="infobox-address">' +
          //     marker.data.addressLineOne +
          //     " " +
          //     marker.data.city +
          //     " " +
          //     marker.data.state +
          //     "</h4>" +
          //     '<div class="infobox-content">' +
          //     '<div class="infobox-image" style="background-image: url(' +
          //     marker.data.thumbnail +
          //     ');">' +
          //     '<ul><li><a href="#"><i class="fa fa-facebook"></i></a></li><li><a href="#"><i class="fa fa-twitter"></i></a></li><li><a href="#"><i class="fa fa-google"></i></a></li></ul>' +
          //     "</div>" +
          //     '<div class="infobox-body"><div class="infobox-body-inner"><div class="infobox-price">' +
          //     marker.data.price +
          //     "</div>" +
          //     // '<div class="infobox-category tag">' + marker.data.category + '</div>' +
          //     // "<p><strong>Class aptent taciti sociosqu ad litora torquent per conubia nostra.</strong></p><p>Etiam vehicula nisi sem, a volutpat diam lacinia eu. Vivamus lorem est, eleifend et urna sed.</p>"+
          //     "<p><strong>"+ (marker.data.description? marker.data.description: 'No Description Found') +"</strong></p>"+
          //     "</div>" +
          //     '<div class="infobox-more"><a href="#">Read More <i class="fa fa-chevron-right"></i></a></div>' +
          //     "</div>" +
          //     "<div>";

          //   if (!infobox.isOpen) {
          //     infobox.setContent(c);
          //     infobox.open(component.map, this);
          //     infobox.isOpen = true;
          //     infobox.markerId = marker.id;
          //   } else {
          //     if (infobox.markerId == marker.id) {
          //       infobox.close(component.map, this);
          //       infobox.isOpen = false;
          //     } else {
          //       infobox.close(component.map, this);
          //       infobox.isOpen = false;

          //       infobox.setContent(c);
          //       infobox.open(component.map, this);
          //       infobox.isOpen = true;
          //       infobox.markerId = marker.id;
          //     }
          //   }
          // });

          component.bound.extend(
            new google.maps.LatLng(listing["latitude"], listing["longitude"])
          );
        }
      });

      if ("map" in this) {
        this.map.fitBounds(component.bound);
      }

      new MarkerClusterer(this.map, this.markers, {
        styles: [
          {
            url: "assets/img/cluster.png",
            height: 36,
            width: 36
          }
        ]
      });
    }
  }

  changeListing(listing_id: number) {
    this.onListingChange.emit(listing_id);
  }

  actionZoomIn() {
    this.map.setZoom(this.map.getZoom() + 1);
  }

  actionZoomOut() {
    this.map.setZoom(this.map.getZoom() - 1);
  }

  actionType(type: string) {
    if (type === "HYBRID") {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    } else if (type === "SATELLITE") {
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    } else if (type === "TERRAIN") {
      this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    } else if (type === "ROADMAP") {
      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }
  }
}
