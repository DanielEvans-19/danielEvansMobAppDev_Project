import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonFab, IonFabButton, IonIcon, IonGrid, IonCol, IonRow, IonInput, IonItem, IonList, IonCardSubtitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { cog } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonInput, IonRow, IonCol, IonGrid, IonIcon, IonFabButton, IonFab, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonCardSubtitle],
})
export class HomePage {
  constructor() {
    addIcons({ heart, cog })
  }
}
