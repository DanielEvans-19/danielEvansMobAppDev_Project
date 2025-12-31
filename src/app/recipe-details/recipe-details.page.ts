import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonFabList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home, close } from 'ionicons/icons';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonFabList, IonCardContent, IonButton, IonCardTitle, IonCardHeader, IonCard, IonItem, IonList, IonIcon, IonFabButton, IonFab, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  testVariable: string = "x";
  recipeId: string = "";
  recipeObjectArr: any[] = [];
  private apiKey: string = "apiKey=70759a4f7911402abcc53d3c51d3b759";
  private url: string = "https://api.spoonacular.com/recipes/";
  private informationParam: string = "/information?";

  //favourites and settings
  isFavourite: boolean = false;
  unitOfMeasurement: string = "";

  //Recipe Information to be shown on page
  recipeImageSrc: string = "";
  recipeTitle: string = "";
  recipeIngredients: any[] = [];
  recipeSteps: any[] = [];

  constructor(private http: HttpClient, private router: Router, private storage: StorageService) {
    addIcons({home,heart,cog,close,settings});
    this.storage.initKey("favourites", []);
  }

  async ngOnInit() {
    this.setId();
    this.getRecipe(this.recipeId);

    console.log(this.recipeId);
    console.log(this.storage.getFavourites());
    
    if (this.storage.getFavourites().some(f => f.id == this.recipeId) == true) {
      this.isFavourite = true;
      console.log(this.isFavourite);
    } else {
      this.isFavourite = false;
    }

    console.log(this.storage.getMeasurementSettings("unitOfMeasure"));
    this.unitOfMeasurement = this.storage.getMeasurementSettings("unitOfMeasure");

  }

  setToMetric() {
    this.storage.set("unitOfMeasure", "Metric");
    this.ngOnInit();
  }

  setToUs() {
    this.storage.set("unitOfMeasure", "US");
    this.ngOnInit();
  }

  rdpAddToFave() {
    this.storage.addFavourite({
      id: this.recipeId,
      title: this.recipeTitle,
      image: this.recipeImageSrc
  });
    this.ngOnInit();
  }

  rdpRemoveFromFave() {
    this.storage.removeFavourite(this.recipeId);
    this.ngOnInit();
  }

  //getting json methods
  setId() {
    var url = this.router.url;
    this.recipeId = url.slice(url.indexOf("?") + 1, url.length - 1);
  }

  get(Id: string): Observable<any> {
    return this.http.get(this.url + Id + this.informationParam + this.apiKey);
  }

  getRecipe(Id: string) {
    this.get(Id).subscribe(
      {
        next: (results) => {
          //console.log(results);
          this.recipeObjectArr = results.results;
          this.recipeImageSrc = results.image;
          this.recipeTitle = results.title;
          this.recipeIngredients = results.extendedIngredients;
          this.recipeSteps = results.analyzedInstructions[0].steps;
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          return this.recipeObjectArr;
        }
      }
    )
    return this.recipeObjectArr;
  }
}

//ID url with test ID
// https://api.spoonacular.com/recipes/644387/information?apiKey=70759a4f7911402abcc53d3c51d3b759
