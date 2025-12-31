import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonFab, IonFabButton, IonIcon, IonFabList, IonRow, IonGrid } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonIcon, IonFabButton, IonFab, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  constructor() { 
    addIcons({home,heart,cog,settings});
  }

  ngOnInit() {
  }

}
