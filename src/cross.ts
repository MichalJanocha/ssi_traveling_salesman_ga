import { DistanceSpecimenTotal } from "./distance_specimen_total";
import { Specimen } from "./generate_population";

export class Cross {
  public static cross(population: Specimen[], prob: number){
    const specimensCount = population[0].track.length;
    const tempPopulation = population;
    const pairs: Specimen[][] = [];
    const finalPopulation: Specimen[] = [];

    while(tempPopulation.length > 1){
      const shouldCross = Math.random();
      
      if(shouldCross <= prob){
        const firstSpecimen = tempPopulation.splice(0, 1)[0];
        const secondSpecimen = tempPopulation.splice(Math.round(Math.random() * (tempPopulation.length - 1)), 1)[0];

        const spec1: Specimen = {
          track: this.crossTracks(firstSpecimen.track, secondSpecimen.track).filter(x => x !== null),
          distance: 0
        };
        const spec2: Specimen = {
          track: this.crossTracks(secondSpecimen.track, firstSpecimen.track).filter(x => x !== null),
          distance: 0
        };
        finalPopulation.push(spec1, spec2);
      }else{
        const firstSpecimen = tempPopulation.splice(0, 1)[0];
        const secondSpecimen = tempPopulation.splice(Math.round(Math.random() * (tempPopulation.length - 1)), 1)[0];
        finalPopulation.push(firstSpecimen, secondSpecimen);
      }
    }
    return finalPopulation;
  }

  private static crossTracks(t1: string[], t2: string[]){
    const child = new Array(t1.length).fill(null);
    const specimensCount = t1.length;
    const c1 = Math.round(Math.random() * (specimensCount - 1));
    const c2 = Math.round((Math.random() * (specimensCount - c1 - 1)) + c1);

    t1.slice(c1, c2+1).forEach((trackPart, i) => child[c1+i] = trackPart);

    let secondPartHasNulls = true;
    let firstPartHasNulls = true;
    let i2 = c2+2 > specimensCount ? 0 : c2+1;
    let i=c2+1;
    let trys = 0;
    while(secondPartHasNulls && trys < 20){
      if(i2 == specimensCount){
        i2 = 0;
      }
      if(!child.includes(t2[i2])){
        child[i] = t2[i2];
        i++;
      }
      if((!child.slice(c2).includes(null) && firstPartHasNulls) || i > specimensCount-1){
        i=0;
        firstPartHasNulls = false;
      }
      if(!child.includes(null)){
        secondPartHasNulls = false;
        break;
      }
      i2++;
      trys++;
    }

    return child;
  }
}