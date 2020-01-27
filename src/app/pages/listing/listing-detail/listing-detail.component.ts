import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

declare const $: any;
declare const google: any;
declare const RichMarker: any;
import { ScriptLoaderService } from "../../../services/script-loader.service";
import { Listing } from "../../../models/Listing";
import { ListingService } from "../../../services/listing.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-listing-detail",
  templateUrl: "./listing-detail.component.html",
  styleUrls: ["./listing-detail.component.css"]
})
export class ListingDetailComponent implements OnInit {
  @Input() listing_id: number;
  map: any;
  bound: any;
  zoom: number = 15;

  listing: Listing;

  constructor(
    private _script: ScriptLoaderService,
    private listingService: ListingService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.listing_id = params.id;
      this.fetchData();
    });
  }

  ngOnInit() {
    this._script
      .loadScripts("body", ["assets/js/explorer.js"], true)
      .then(result => {
        console.log(result);
      });
  }

  initMap() {
    const markerCenter = new google.maps.LatLng(
          this.listing["latitude"],
          this.listing["longitude"]
        );
    this.map = new google.maps.Map(document.getElementById("map-details"), {
      zoom: this.zoom,
      scrollwheel: false,
      center: markerCenter,
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
    // const component = this;
    // component.bound = new google.maps.LatLngBounds();

    // this.listing["latitude"] = 30.7333;
    // this.listing["longitude"] = 76.7794;

    // if (this.listing["latitude"] && this.listing["longitude"]) {
    //   console.log("latitude", this.listing["latitude"], this.map);
    //   const markerCenter = new google.maps.LatLng(
    //     this.listing["latitude"],
    //     this.listing["longitude"]
    //   );

      const markerVerified = this.listing["is_active"]
        ? '<div class="marker-verified"><i class="fa fa-check"></i></div>'
        : "";

      const markerPrice =
        this.listing["price"] && this.listing["price"] != "false"
          ? '<div class="marker-price">' + this.listing["price"] + "</div>"
          : "";

      const markerContent =
        '<div class="marker">' +
        '<div class="marker-inner">' +
        '<span class="marker-image" style="background-image: url(' +
        this.listing["thumbnail"] +
        ');"></span>' +
        "</div>" +
        markerVerified +
        markerPrice +
        "</div>";

      const marker = new RichMarker({
        id: this.listing["id"],
        data: this.listing,
        flat: true,
        position: markerCenter,
        map: this.map,
        shadow: 0,
        content: markerContent
      });


    //   component.bound.extend(
    //     new google.maps.LatLng(
    //       this.listing["latitude"],
    //       this.listing["longitude"]
    //     )
    //   );
    // }
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

  fetchData() {
    this.listingService
      .getListing(this.listing_id)
      .subscribe((listing: any) => {
        this.listing = listing;
        this.initMap();
      });
  }

  getAddress(listing) {
    if (!listing) return "";
    return `${listing.addressLineOne} ${listing.city} ${listing.state}`;
  }

  buildRating(rating) {
    let template = "";

    for (let i = 0; i < rating; i++) {
      template += '<i class="fa fa-star"></i>';
    }

    for (let i = rating; i < 5; i++) {
      template += '<i class="fa fa-star-o"></i>';
    }

    return template;
  }
}
