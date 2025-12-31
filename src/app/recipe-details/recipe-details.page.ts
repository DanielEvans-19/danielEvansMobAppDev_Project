import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonButton, IonCardTitle, IonCardHeader, IonCard, IonItem, IonList, IonIcon, IonFabButton, IonFab, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  testVariable: string = "x";
  recipeId: string = "";
  recipeObjectArr: any[] = [];
  private apiKey: string = "apiKey=70759a4f7911402abcc53d3c51d3b759";
  private url: string = "https://api.spoonacular.com/recipes/";
  private informationParam: string = "/information?";

  isFavourite: boolean = false;

  //Recipe Information to be shown on page
  recipeImageSrc: string = "";
  recipeTitle: string = "";
  recipeIngredients: any[] = [];
  recipeSteps: any[] = [];

  constructor(private http: HttpClient, private router: Router, private favourites: FavouritesService) {
    addIcons({ home, heart, cog, settings });
  }

  /*
  addToFavourites() {
    this.favourites.add(this.recipeId);
    console.log(this.recipeId);
  }

  async removeFromFavourites() {
    await this.favourites.remove(this.recipeId);
  }
    */

  setId() {
    var url = this.router.url;
    this.recipeId = url.slice(url.indexOf("?") + 1, url.length - 1);
  }

  async ngOnInit() {
    this.setId();
    console.log(this.recipeId);
    this.getRecipe(this.recipeId);
    //this.isFavourite = await this.favourites.isFavourite(this.recipeId);
    console.log(this.isFavourite);
  }

  get(Id: string): Observable<any> {
    return this.http.get(this.url + Id + this.informationParam + this.apiKey);
  }


  getRecipe(Id: string) {
    this.get(Id).subscribe(
      {
        next: (results) => {
          console.log(results);
          this.recipeObjectArr = results.results;
          this.recipeImageSrc = results.image;
          this.recipeTitle = results.title;
          this.recipeIngredients = results.extendedIngredients;
          this.recipeSteps = results.analyzedInstructions[0].steps;
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          console.log(this.recipeObjectArr);
          console.log(this.recipeIngredients);
          console.log(this.recipeSteps);
          return this.recipeObjectArr;
        }
      }
    )
    return this.recipeObjectArr;
  }
}

//ID url with test ID
// https://api.spoonacular.com/recipes/644387/information?apiKey=70759a4f7911402abcc53d3c51d3b759
