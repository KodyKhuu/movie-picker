import { Component, OnInit } from "@angular/core";
import { MoviedbService } from "../moviedb.service";
import { PredictionEvent } from "../prediction-event";
import { ActivatedRoute } from "@angular/router";
import { FavoriteMoviesComponent } from "../favorite-movies/favorite-movies.component";

@Component({
  selector: "app-browse-movies",
  templateUrl: "./browse-movies.component.html",
  styleUrls: ["./browse-movies.component.css"],
  providers: [MoviedbService],
})
export class BrowseMoviesComponent implements OnInit {
  movies: any;
  index: number = 0;

  currentMovie: any;
  currentImage: string;

  browseType: string;

  counter: number = 0;

  constructor(
    private moviedbService: MoviedbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.browseType = this.route.snapshot.paramMap.get("type") as string;

    this.moviedbService.getMovies(this.browseType).then((data: any) => {
      this.movies = data.results;
      console.log(this.movies);
      this.currentMovie = this.movies[this.index];
      this.currentImage =
        "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
    });
  }

  prediction(event: PredictionEvent) {
    const prediction = event.getPrediction();
    if (prediction === "Hand Pointing") {
      this.counter++;

      if (this.counter === 2) {
        this.counter = 0;
        if (this.index === this.movies.length) {
          this.index = 0;
          this.currentMovie = this.movies[this.index];
        } else {
          this.currentMovie = this.movies[this.index++];
        }
        this.currentImage =
          "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
      }
    } else if (prediction === "Open Hand") {
      // JUST USE LOCAL STORAGE
      if (!FavoriteMoviesComponent.movies) {
        FavoriteMoviesComponent.movies = [];
      }
      FavoriteMoviesComponent.movies.push(this.currentMovie);
      console.log(FavoriteMoviesComponent.movies);
    } else if (prediction == "Two Closed Hands") {
      window.open("/favorites", "_self");
    }
  }
}
