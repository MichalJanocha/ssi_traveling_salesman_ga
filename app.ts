import { Cross } from "./src/cross";
import { DistanceMatrix } from "./src/distance_matrix";
import { DistanceSpecimenTotal } from "./src/distance_specimen_total";
import { GeneratePopulation, Specimen } from "./src/generate_population";
import { Mutation } from "./src/mutation";
import { Parser, Point } from "./src/parser";
import { Selection } from "./src/selection";
var fs = require('fs');

function trackLen(spec: Specimen, distMatrix: {
  [p1: string]: {
      [p2: string]: number;
  };
}) {
  let resultString = '';
  spec.track.forEach((v, i, arr) => {
    if(arr[i+1] !== undefined){
      resultString += ` ${arr[i]}:${arr[i+1]}=>${distMatrix[arr[i]][arr[i+1]]}`;
    }
  })
  return resultString;
}

const main = (resCount: number, generations: number, specCount: number, crossProb: number, mutProb: number) => {
  fs.writeFile('results.txt', '', () => {});
  Parser.parse("./input/test.tsp").then(points => {
    while(resCount > 0){
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
      populationDist.sort((a,b) => a.distance - b.distance);
      populationDist[0].track.push(populationDist[0].track[0]);
      fs.appendFile(
        'results.txt',
        `${populationDist[0].track.join().replace(/,/g, " ")} ${populationDist[0].distance} DISTANCES: ${trackLen(populationDist[0], distancesMatrix)}\r\n`,
        () => {}
      );
      resCount--;
    }

  });
  
}
// bier127
main(10, 60000, 50, 0.7, 0.1);


// pr144
// main(10, 60000, 50, 0.7, 0.1);