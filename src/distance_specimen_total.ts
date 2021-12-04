import { Specimen } from "./generate_population";

export class DistanceSpecimenTotal{
  public static calculate(
    distMatrix: {
      [p1: string]: {
          [p2: string]: number;
      };
    },
    population: Specimen[]
  ){
    return population.map(pop => DistanceSpecimenTotal.calculateSingle(distMatrix, pop))
  }

  public static calculateSingle(
    distMatrix: {
      [p1: string]: {
          [p2: string]: number;
      };
    },
    population: Specimen
  ){
    population.distance = population.track.reduce((prev, cur, idx, arr) => {
      if(arr[idx+1] !== undefined){
        return prev + distMatrix[cur][arr[idx+1]]
      }else{
        return prev + distMatrix[cur][arr[0]]
      }
    }, 0)
    return population;
  }
}