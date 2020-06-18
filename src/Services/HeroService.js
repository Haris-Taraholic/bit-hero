import { Hero } from "../entities/Hero";
let apiKey = '230dfef498aed52d5b84abc1f9e11d14'
export class HeroService {
  fetchAll() {
    return fetch(
      "http://gateway.marvel.com/v1/public/characters?apikey=230dfef498aed52d5b84abc1f9e11d14"
    ).then((res) => res.json());
  }

  fetch(id) {
    return fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=230dfef498aed52d5b84abc1f9e11d14`
    )
      .then((response) => response.json())
      .then((rawData) => new Hero(rawData.data.results[0]));
  }

  fetchCharComics(id) {
    return fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${apiKey}`)
      .then(response => response.json())
      .then(rawData => {
        console.log(rawData.data.results);
        return rawData.data.results;

      })
  }

  search(name) {
    return fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=230dfef498aed52d5b84abc1f9e11d14`
    ).then((res) => res.json());
  }
}
