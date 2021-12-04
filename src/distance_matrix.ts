import { Point } from "./parser";

export class DistanceMatrix {
  public static calculate(points: {[key: string]: Point}) {
    const distanceMatrix: {[p1: string]: {[p2: string]: number}} = {};
    const values = Object.values(points);
    values.forEach(p1 => {
      values.forEach(p2 => {
        if(distanceMatrix[p1.name.toString()] === undefined){
          distanceMatrix[p1.name.toString()] = {};
        }
        distanceMatrix[p1.name.toString()][p2.name.toString()] = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
      })
    })
    return distanceMatrix;
  }
}