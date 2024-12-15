import { Details } from "./details.js";
import { Ui } from "./ui.js";

export class Games {
  constructor() {
    this.getGames("mmorpg");
    this.navItems = document.querySelectorAll(".menu a");
    this.navItems.forEach((link) => {
      link.addEventListener("click", (e) => {
        const activeItem = document.querySelector(".menu .active");
        activeItem.classList.remove("active");
        e.target.classList.add("active");
        console.log(e.target.dataset.category);
        this.getGames(e.target.dataset.category);
      });
    });
    this.ui = new Ui();
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "66df0fc8dfmsheae57321e6a2f2bp13429bjsncde87f930e72",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      const result = await response.json();
      console.log(result);
      this.ui.displayGames(result);
      this.startEvent();
    } catch (error) {
      console.error(error);
    }

    loading.classList.add("d-none");
  }

  startEvent() {
    const gameCard = document.querySelectorAll(".card");
    gameCard.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        this.showDetails(id);
      });
    });
  }

  showDetails(id) {
    const details = new Details(id);
    details.gamesLayout.classList.add("d-none");
    details.gameDetails.classList.remove("d-none");
  }
}
