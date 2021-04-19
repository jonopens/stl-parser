import Facet from './facet.ts'

export default class ModelFile {
  public facets: Facet[];
  public triangleCount: number;
  public totalSurfaceArea: number;

  constructor(facets: Facet[]) {
    this.facets = facets;
    this.triangleCount = facets.length;
    this.totalSurfaceArea = facets.reduce((acc, facet) => facet.surfaceArea + acc, 0);
  }
}
