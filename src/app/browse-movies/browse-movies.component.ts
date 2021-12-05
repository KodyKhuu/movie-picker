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

  counterNext: number = 0;
  counterAdd: number = 0;

  showError: boolean = false;
  showSuccess: boolean = false;

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
    console.log(prediction);
    if (prediction === "Hand Pointing") {
      this.counterNext++;

      if (this.counterNext === 3) {
        this.counterNext = 0;
        if (this.index === this.movies.length) {
          this.index = 0;
          this.currentMovie = this.movies[this.index];
        } else {
          this.currentMovie = this.movies[this.index++];
        }
        this.currentImage =
          "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
      }
    } else if (prediction === "Two Hands Pointing") {
      this.counterNext++;

      if (this.counterNext === 3) {
        this.counterNext = 0;
        if (this.index === 0) {
          this.index = this.movies.length - 1;
          this.currentMovie = this.movies[this.index];
        } else {
          this.currentMovie = this.movies[this.index--];
        }
        this.currentImage =
          "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
      }
    } else if (prediction === "Open Hand") {
      this.counterAdd++;

      if (this.counterAdd === 3) {
        this.counterAdd = 0;
        const favMoviesFromStorage = window.localStorage.getItem("favMovies");
        if (!favMoviesFromStorage) {
          const favMovies = [this.currentMovie];
          window.localStorage.setItem("favMovies", JSON.stringify(favMovies));
        } else {
          let parsedMovies = JSON.parse(favMoviesFromStorage);
          for (let i = 0; i < parsedMovies.length; i++) {
            if (parsedMovies[i].id === this.currentMovie.id) {
              this.showError = true;

              setTimeout(() => {
                this.showError = false;
              }, 2000);

              return;
            }
          }
          parsedMovies.push(this.currentMovie);
          window.localStorage.setItem(
            "favMovies",
            JSON.stringify(parsedMovies)
          );

          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
          }, 2000);
        }
      }
    } else if (prediction == "Two Closed Hands") {
      window.open("/favorites", "_self");
    } else if (prediction == "Two Hands Pinching") {
      window.open("/", "_self");
    }
  }
}
