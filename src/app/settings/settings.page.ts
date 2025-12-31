import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonFab, IonFabButton, IonIcon, IonFabList, IonRow, IonGrid, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, cog, home } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton, IonGrid, IonRow, IonIcon, IonFabButton, IonFab, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  constructor(private storage: StorageService) { 
    addIcons({home,heart,cog,settings});
    this.storage.initKey("unitOfMeasure", "");
  }
  
  unitOfMeasure: string = "";

  ngOnInit() {
    if (this.storage.getMeasurementSettings("unitOfMeasure") == "US") {
      this.storage.set("unitOfMeasure", "US");
      this.unitOfMeasure = "US";
    } else {
      this.storage.set("unitOfMeasure", "Metric");
      this.unitOfMeasure = "Metric";
    }

    if (this.unitOfMeasure == "") {
      this.storage.set("unitOfMeasure", "Metric");
      this.setMetric();  
    }

    this.unitOfMeasure = this.storage.getMeasurementSettings("unitOfMeasure");
    console.log(this.storage.getMeasurementSettings("unitOfMeasure"));
  }

  setMetric() {
    console.log("Setting to Metric");
    this.storage.set("unitOfMeasure", "Metric");
    this.ngOnInit();
  }

  setUs() {
    console.log("Setting to US");
    this.storage.set("unitOfMeasure", "US");
    this.ngOnInit();
  }

}
