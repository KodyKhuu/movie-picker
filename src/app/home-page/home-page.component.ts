import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../prediction-event";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  browseTypes: string[] = [
    "Popular",
    "Now Playing",
    "Top Rated",
    "Upcoming",
    "Adventure",
    "Action",
    "Comedy",
    "Horror",
    "Romance",
    "Family",
  ];
  index: number = 0;

  currentBrowseType: String = this.browseTypes[this.index];

  constructor() {}

  ngOnInit(): void {}

  prediction(event: PredictionEvent) {
    const prediction = event.getPrediction();
    if (prediction === "Hand Pointing") {
      if (this.index === this.browseTypes.length) {
        this.index = 0;
        this.currentBrowseType = this.browseTypes[this.index];
      } else {
        this.index = this.index + 1;
        this.currentBrowseType = this.browseTypes[this.index];
      }
    } else if (prediction === "Open Hand") {
      const type = this.currentBrowseType.toLowerCase().replace(" ", "_");
      window.open("/browse/" + type, "_self");
    } else if (prediction == "One Open One Closed") {
      window.open("/favorites", "_self");
    }
  }
}
