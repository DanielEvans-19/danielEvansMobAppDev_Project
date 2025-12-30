import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonFab, IonFabButton, IonIcon, IonRow, IonFabList, IonButton, IonCardTitle, IonList, IonItem, IonCardContent, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home } from 'ionicons/icons';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonItem, IonList, IonCardTitle, IonButton, IonFabList, IonRow, IonIcon, IonFabButton, IonFab, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {

  private favouritesArray: string[] = [];

  constructor(private favourites: FavouritesService) { 
    addIcons({home,heart,cog,settings});
   }

  async ngOnInit() {
    this.favouritesArray = await this.favourites.getAll();
    console.log(this.favouritesArray);
  }

}
