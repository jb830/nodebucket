/*
============================================
; Title:  contact.component.ts
; Author: Professor Krasso
; Date: 1. June, 2024
; Modified by: Joanna Brumfield
; Description: Contact Component
;===========================================
*/

import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 41.1499137878418, lng: -95.91798400878906}, 
      zoom: 16,
      mapId: 'nodebucket-map-426602',
      });
      const marker = new google.maps.Marker({
        position: { lat: 41.1499137878418, lng: -95.91798400878906 },
        map: this.map,
        title: 'Bellevue University'
      });
    }
  }

