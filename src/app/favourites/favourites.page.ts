import { Component, OnInit, Testability } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonFab, IonFabButton, IonIcon, IonRow, IonButton, IonCardTitle, IonItem, IonCardContent, IonCardHeader, IonCard, IonFabList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home, close } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonItem, IonCardTitle, IonButton, IonRow, IonIcon, IonFabButton, IonFab, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {

  constructor(private storage: StorageService) {
    addIcons({ home, heart, cog, close, settings });
  }

  removeFromFav(id: string) {
    this.storage.removeFavourite(id);
    this.ngOnInit();
  }

  favouritesArray: any[] = [];

  async ngOnInit() {
    this.favouritesArray = this.storage.getFavourites();
    console.log(this.storage.getFavourites());
  }

}
