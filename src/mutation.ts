import { Specimen } from "./generate_population";

export class Mutation {
  public static mutate(population: Specimen[], mutProb: number){
    return population.map(spec => {
      const shouldMutate = Math.random();
      if(shouldMutate <= mutProb){
        const chrsToChange = Math.round(Math.random() * (spec.track.length/3));

        for(let i=0; i<chrsToChange; i++){
          const chrIdx = Math.round(Math.random() * (spec.track.length - 1));
          let chrIdx2 = chrIdx;
          while(chrIdx === chrIdx2){
            chrIdx2 = Math.round(Math.random() * (spec.track.length - 1));
          }
          const tmpChr1 = spec.track[chrIdx];
          spec.track[chrIdx] = spec.track[chrIdx2];
          spec.track[chrIdx2] = tmpChr1;
        }
        return spec;
      }else{
        return spec;
      }
    })
  }
}