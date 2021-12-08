import { DistanceSpecimenTotal } from "./distance_specimen_total";
import { Specimen } from "./generate_population";

export class Selection {
  public static select(population: Specimen[], distMatrix: {
    [p1: string]: {
        [p2: string]: number;
    };
  }){
    return new Array(population.length).fill(
      DistanceSpecimenTotal
        .calculate(distMatrix, population)
        .sort((a,b) => a.distance - b.distance)[0]
    );
  }
}