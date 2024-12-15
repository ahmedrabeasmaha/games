import { Ui } from "./ui.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();
    this.closeButton = document.querySelector("#btnClose");
    this.gamesLayout = document.querySelector(".games");
    this.gameDetails = document.querySelector(".details");
    this.closeButton.addEventListener("click", () => {
      this.gamesLayout.classList.remove("d-none");
      this.gameDetails.classList.add("d-none");
    });

    this.getDetails(id);
  }

  async getDetails(id) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "66df0fc8dfmsheae57321e6a2f2bp13429bjsncde87f930e72",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        options
      );
      const result = await response.json();
      this.ui.displayGameDetails(result);
    } catch (error) {
      console.error(error);
    }
    loading.classList.add("d-none");
  }
}
