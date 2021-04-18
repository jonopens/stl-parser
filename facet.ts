interface IVertex {
  x: number,
  y: number,
  z: number,
}

export default class Facet {
  public v1: IVertex;
  public v2: IVertex;
  public v3: IVertex;
  public surfaceArea: number;

  constructor (v1: IVertex, v2: IVertex, v3: IVertex) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.surfaceArea = this.calcSurfaceArea();
  }

  calcSurfaceArea(): number {
    const v1 = this.v1;
    const v2 = this.v2;
    const v3 = this.v3;

    const vecA = [v2.x - v1.x, v2.y - v1.y, v2.z - v1.z];
    const vecB = [v3.x - v1.x, v3.y - v1.y, v3.z - v1.z];

    const crossProduct = this.crossProduct(vecA, vecB);
    
    return 0.5 * Math.sqrt(
      crossProduct[0] * crossProduct[0] + crossProduct[1] * crossProduct[1] + crossProduct[2] * crossProduct[2],
      
    )
    // 1/2 sqrt(crossx^2 + crossy^2 + crossz^2)
  }

  crossProduct(
    a: number[],
    b: number[],
  ): number[] {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ]
  }
}