import { Point } from "./parser";

export class Specimen {
  track!: string[];
  distance!: number;
}

export class GeneratePopulation {
  public static generate(specCount: number, points: {[key: string]: Point}) {
    const population: Specimen[] = [];
    const keys = Object.keys(points);
    for(;specCount > 0;specCount--){
      const shuffled = keys
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value);
      population.push({track: shuffled, distance: 0});
    }
    return population;
  }
}