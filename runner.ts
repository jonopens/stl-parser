import Validator from './validator.ts';
import { facetRegexp, vertexRegexp } from './regex.ts';
import Facet from './facet.ts'
import ModelFile from './model-file.ts';

export default class Runner {
  static validateOrExit(args: string[]): void {
    if (!Validator.areValidArgs(args)) {
      console.error('No arguments given. Please reference a file path.')
      Deno.exit();
    }
    if (!Validator.hasCorrectExt(args[0])) {
      console.error('File is not an ASCII format STL. Please try again.');
      Deno.exit();
    }
  }

  static run(stl: string) {
    try {
      const rawFacets: RegExpMatchArray | [] = stl.match(facetRegexp) || [];
      const cleanedFacets: Facet[] = [];
      if (rawFacets.length > 0) {
        rawFacets.forEach((facet) => {
          // this is where I would handle the facet normal if I needed to
          const rawVertices: RegExpMatchArray | [] = facet.match(vertexRegexp) || [];
          const vertices = rawVertices.map(
            (vertex) => {
              const cleaned = vertex.trim().split(/\s{1,}/gm).slice(1, 4);
              return {
                x: parseFloat(cleaned[0]),
                y: parseFloat(cleaned[1]),
                z: parseFloat(cleaned[2]),
              };
            }
          );
          cleanedFacets.push(
            new Facet(vertices[0], vertices[1], vertices[2]),
          );
        });
        const modelFile = new ModelFile(cleanedFacets);

        console.log('Number of Triangles: ', modelFile.triangleCount)
        console.log('Surface Area: ', modelFile.totalSurfaceArea)
      } else {
        throw new Error('No matches found. Please ensure your file is properly formatted.')
      }
    }
    catch (err) {
      console.error('Failed to open file. Deno will now close. Please check the path and re-run again.', err);
      throw err;
    }
    finally {
      Deno.exit();
    }
  }
}
