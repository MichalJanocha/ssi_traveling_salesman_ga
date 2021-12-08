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
        // const c1 = Math.round(Math.random() * (specimensCount - 1));
        // const c2 = Math.round(Math.random() * (specimensCount - c1 - 1) + c1);

        const firstSpecimen = tempPopulation.splice(0, 1)[0];
        const secondSpecimen = tempPopulation.splice(Math.round(Math.random() * (tempPopulation.length - 1)), 1)[0];
        // const child = new Array(firstSpecimen.track.length);
        this.crossTracks(firstSpecimen.track, secondSpecimen.track);
        // console.log(firstSpecimen.track.toString(), secondSpecimen.track.toString());
        // const slice1 = firstSpecimen.track.slice(c1, c2)
        // const p1f = firstSpecimen.track.splice(0, 1);
        // const p2f = secondSpecimen.track.splice(0, 1);

        // const p1s = firstSpecimen.track.slice(0, cutPoint);
        // const p1e = firstSpecimen.track.slice(cutPoint, firstSpecimen.track.length);
        // // console.log(`p1leng: ${p1f.length} + ${p1s.length} + ${p1e.length}`)

        // const p2s = secondSpecimen.track.slice(0, cutPoint);
        // const p2e = secondSpecimen.track.slice(cutPoint, secondSpecimen.track.length);

        // const c1 = p1f.concat(p1s).concat(p2e.filter(x => !p1s.includes(x)));
        // const c2 = p2f.concat(p1e).concat(p2s.filter(x => !p1e.includes(x)));
        // console.log('potomek1:',c1.toString(), c1.length, 'potomeke2: ',c2.toString(), c2.length);
      }

    }

    
    

  }

  private static crossTracks(t1: string[], t2: string[]){
    // console.log(t1.toString());
    const child = new Array(t1.length + 1).fill(null);
    const specimensCount = t1.length;
    const c1 = Math.round(Math.random() * (specimensCount - 1));
    const c2 = Math.round((Math.random() * specimensCount - 1 - c1) + c1 + 1);

    t1.slice(c1, c2).forEach((trackPart, i) => child[c1+i] = trackPart);
    // t2.splice(c1, Math.abs(c1-c2));
    let i2=0;
    for(let i=c2; i<child.length; i++){
      if(!child.includes(t2[i2])){
        child[i] = t2[i2];
      }
      i2++;
    }
    console.log(child);
    // child[c1] = [...t1.slice(c1,c2)];
    // console.log(child.flat(), child.flat().length);
  }
}