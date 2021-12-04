import * as fs from 'fs';
import * as readline from 'readline';

export class Point {
  name!: number;
  x!: number;
  y!: number;
}

export class Parser {
  public static async parse(path: string){
    const points: {[key: string]: Point} = {};
    const stream = fs.createReadStream(path);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });
    let isInCoordsSection = false;
    for await (const line of rl) {
      if(line.includes("EOF")){
        isInCoordsSection = false;
      }
      if(isInCoordsSection){
        const lineDivide = line.trim().split(" ");
        const parsedLine: number[] = lineDivide.map(strChunk => {
          const intChunk = parseInt(strChunk);
          if(Number.isInteger(intChunk)){
            return intChunk as number;
          }else{
            return -1;
          }
        }).filter(x => x !== -1);

        points[parsedLine[0].toString()] = {
          name: parsedLine[0],
          x: parsedLine[1],
          y: parsedLine[2]
        }
        
      }
      if(line.includes("NODE_COORD_SECTION")){
        isInCoordsSection = true;
      }
    }
    return points;
  }
}