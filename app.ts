import { Cross } from "./src/cross";
import { DistanceMatrix } from "./src/distance_matrix";
import { DistanceSpecimenTotal } from "./src/distance_specimen_total";
import { GeneratePopulation } from "./src/generate_population";
import { Mutation } from "./src/mutation";
import { Parser, Point } from "./src/parser";
import { Selection } from "./src/selection";

const main = (resCount: number, generations: number, specCount: number, crossProb: number, mutProb: number) => {
  Parser.parse("./input/bier127.tsp").then(points => {
    const distancesMatrix = DistanceMatrix.calculate(points);
    let population = GeneratePopulation.generate(specCount, points);
    let populationDist = DistanceSpecimenTotal.calculate(distancesMatrix, population).sort((a,b) => a.distance - b.distance);
    // console.log(populationDist.map(x => x.distance), distancesM2trix);
    while(generations > 0){
      let populationsCross = Cross.cross(populationDist, crossProb);
      // console.log(populationsCross.map(x => x.track.toString()), populationsCross.map(x => x.track.toString()).length);
      let populationsMut = Mutation.mutate(populationsCross, mutProb);
      // console.log(populationsMut.map(x => x.track.toString()),populationsMut.map(x => x.track.toString()).length);
      populationDist = Selection.select(populationsMut, distancesMatrix);
      // console.log(populationDist.map(x => x.track.toString()),populationDist.map(x => x.track.toString()).length);
      generations--;
    }
    console.log(populationDist.map(x => x.distance));
  });
  
}
// bier127
main(10, 60000, 50, 0.7, 0.1);

// pr144
// main(10, 60000, 50, 0.7, 0.1);