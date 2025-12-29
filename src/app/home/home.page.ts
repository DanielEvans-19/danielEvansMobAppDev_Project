import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonFab, IonFabButton, IonIcon, IonGrid, IonCol, IonRow, IonInput, IonItem, IonList, IonCardSubtitle, IonFabList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home } from 'ionicons/icons';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonFabList, IonInput, IonRow, IonCol, IonGrid, IonIcon, IonFabButton, IonFab, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonCardSubtitle],
})

export class HomePage {

  //Full example URL
  //https://api.spoonacular.com/recipes/complexSearch?query=carrots&apiKey=70759a4f7911402abcc53d3c51d3b759

  //API Key
  //apiKey=70759a4f7911402abcc53d3c51d3b759

  //Query Parameter
  //?query=<exampleIngredient>&
  
  private url: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=70759a4f7911402abcc53d3c51d3b759";
  recipesListArr:string[] = [];

  constructor(private http: HttpClient) {
    addIcons({ heart, cog, home, settings })
  }

  get(url:string): Observable<any> {
    return this.http.get(url);
  }

  getRecipe(): string[] {
    this.get(this.url).subscribe(
      {
        next: (results) => {
          console.log(results);
          this.recipesListArr = results.results;
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          console.log(this.recipesListArr);
          return this.recipesListArr;
        }
      }
    )
    return this.recipesListArr;
  }

}
