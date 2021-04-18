import ModelFile from './model-file.ts';
import Facet from './facet.ts';
import Validator from './validator.ts';
import { facetRegexp, vertexRegexp } from './constants.ts';


if (!Validator.areValidArgs(Deno.args)) {
  console.error('No arguments given. Please reference a file path.')
  Deno.exit();
}
const stlFile: string = Deno.args[0];
if (!Validator.hasCorrectExt(stlFile)) {
  console.error('File is not an ASCII format STL. Please try again.');
  Deno.exit();
}

try {
  const stlAsString: string | undefined = await Deno.readTextFile(stlFile);
  const rawFacets: RegExpMatchArray | [] = stlAsString.match(facetRegexp) || [];
  const cleanedFacets: Facet[] = [];
  if (rawFacets.length > 0) {
    rawFacets.forEach((facet) => {
      // this is where I would handle the facet normal if I needed to
      const rawVertices: RegExpMatchArray | [] = facet.match(vertexRegexp) || [];

      const vertices = rawVertices.map(
        (vertex) => {
          const cleaned = vertex.trim().split(' ').slice(1, 4);
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
    throw new Error('No matches found. Please ensure your file properly formatted.')
  }

  // split the string with regex (?)
  // make a bunch of vertices
  // do math
  // send her back!


}
catch (err) {
  console.error('Failed to open file. Deno will now close. Please check the path and re-run again.', err);
  throw err;
}
finally {
  Deno.exit();
}
