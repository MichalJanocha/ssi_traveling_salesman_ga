import { Cross } from "./src/cross";
import { DistanceMatrix } from "./src/distance_matrix";
import { DistanceSpecimenTotal } from "./src/distance_specimen_total";
import { GeneratePopulation } from "./src/generate_population";
import { Parser, Point } from "./src/parser";

const main = (specCount: number, crossProb: number) => {
  Parser.parse("./input/test.tsp").then(points => {
    const distancesMatrix = DistanceMatrix.calculate(points);
    let population = GeneratePopulation.generate(specCount, points);
    let populationDist = DistanceSpecimenTotal.calculate(distancesMatrix, population).sort((a,b) => a.distance - b.distance);
    Cross.cross(populationDist, crossProb);
  });
  
}
main(15, 0.7);