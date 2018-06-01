import { Component, OnInit } from '@angular/core';
import { marker, icon, Marker, tileLayer } from 'leaflet';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  center: { lat: number, lng: number };
  markers: Array<Marker>;
  options = {
    layers: [
      tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=${environment.mapboxApiKey}`,
        { minZoom: 12, maxZoom: 18, attribution: '...' })
    ],
    zoom: 17,
    center: [51.505, -0.09],
    zoomControl: false
  };

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.markers = [
      this.createMarker()
        .on('click', this.showDialog.bind(this))
    ];
  }

  click() {
    console.log('Yo');
  }

  createMarker() {
    return marker([51.505, -0.09], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: `assets/marker-icon-red.png`,
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }

  showDialog(): void {
    const infoDialogRef = this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      height: '50vh',
      minWidth: '100%',
      position: {
        bottom: '0px',
      },
      data: {
        message: 'Hello'
      }
    });

  }
}
