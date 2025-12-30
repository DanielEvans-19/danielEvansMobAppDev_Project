import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonFab, IonFabButton, IonIcon, IonRow, IonFabList, IonButton, IonCardTitle, IonList, IonItem, IonCardContent, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home } from 'ionicons/icons';
import { FavouritesService } from '../services/favourites.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonItem, IonList, IonCardTitle, IonButton, IonFabList, IonRow, IonIcon, IonFabButton, IonFab, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {

  favouritesArray: string[] = [];
  favouritesObjArray: any[] = [];

  favTitle: string = "";
  titlesList: string[] = [];

  imageSrcList: string[] = [];
  favImageSource: string = "";

  constructor(private favourites: FavouritesService, private http: HttpClient) { 
    addIcons({home,heart,cog,settings});
   }

  async ngOnInit() {
    this.favouritesArray = await this.favourites.getAll();
    
    for (var i = 0; i < this.favouritesArray.length; i++) {
      this.getFavourites(this.favouritesArray[i]);
    }

    console.log(this.imageSrcList);
    console.log(this.titlesList);

  }

  get(Id: string): Observable<any> {
    return this.http.get("https://api.spoonacular.com/recipes/" + Id + "/information?apiKey=70759a4f7911402abcc53d3c51d3b759");
  }

  // Iterate through favouritesArray and get recipe information by ID.
  getFavourites(Id: string) {
    this.get(Id).subscribe(
    {
      next: (results) => {
        console.log(results);
        this.favouritesObjArray = results.results;
        this.favTitle = results.title;
        this.favImageSource = results.image;
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('complete');
        this.titlesList.push(this.favTitle);
        this.imageSrcList.push(this.favImageSource);
        return this.favouritesObjArray;
      }
    }
  )
  return this.favouritesObjArray;
}
}
