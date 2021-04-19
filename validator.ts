export default class Validator {

  static areValidArgs(args: string[]): boolean {
    return !!args && !!args.length && args.length >= 1;
  }

  static hasCorrectExt(filename: string): boolean {
    return filename.endsWith('.stl');
  }

  static naiveContentIsStl(document: string): boolean {
    return (
      document.includes('solid') &&
      document.includes('endsolid') &&
      document.includes('facet normal') &&
      document.includes('endfacet') &&
      document.includes('outer loop') &&
      document.includes ('endloop')
    );
  }

  static isFacetValid(): boolean {
    // contains all the correct markup
    return true;
  }

  static isVertexValid(): boolean {
    // has three separate values, maybe check they are 32-bit floats as per spec?
    return true;
  }

  static isThreeDimensional(): boolean {
    // struck me that we would need to check that the provided triangles
    // can actually be assembled as a three dimensional object
    // unsure of the maths here, so I'm just stubbing with true to show thought process
    return true;
  }
}
