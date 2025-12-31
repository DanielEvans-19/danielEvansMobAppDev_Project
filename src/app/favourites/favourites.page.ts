import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonFab, IonFabButton, IonIcon, IonRow, IonButton, IonCardTitle, IonItem, IonCardContent, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home, close } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonItem, IonCardTitle, IonButton, IonRow, IonIcon, IonFabButton, IonFab, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {

  constructor(private http: HttpClient, private storage: StorageService) { 
    addIcons({home,heart,cog,close,settings});
   }

   recipeIdArr: string[] = [];

  async ngOnInit() {
    this.recipeIdArr = this.storage.getFavourites();
    console.log(this.recipeIdArr);
  }

  get(Id: string): Observable<any> {
    return this.http.get("https://api.spoonacular.com/recipes/" + Id + "/information?apiKey=70759a4f7911402abcc53d3c51d3b759");
  }

  // Iterate through favouritesArray and get recipe information by ID.
  getFavourites(Id: string) {
    this.get(Id).subscribe(
    {
      next: (results) => {
        //console.log(results);
        //this.favouritesObjArray = results.results;
        //this.favTitle = results.title;
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('complete');
        return null;
      }
    }
  )
  return null;
}
}
