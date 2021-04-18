# STL Parser - Basic

## Goals
- print the number of triangles and surface area of the entire solid
- provide clear instructions for how to run code
- discuss performance improvements or approaches for much larger files (millions of facets)
- discuss reasoning for code design choices

## How to Run Code
- if MacOS/Linux => `curl -fsSL https://deno.land/x/install/install.sh | sh`
- add the following to `.bash_profile` or `.bashrc`
```bash
export DENO_INSTALL="/Users/jonopens/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

- run `source ~/YOUR_BASH_CONFIG_HERE` to refresh into your current session
- test Deno is installed correctly with `deno --version`
- clone down repo and cd into repo root `cd STL_ROOT_DIR`
- in terminal `deno run --allow-read index.ts PATH_TO_STL_FILE` where PATH_TO_STL_FILE is the location of an ASCII STL file

## Design Choices

There are a few things that I chose to make my life a bit easier that I think are worthwhile. I have a few classes that encapsulate some foundational elements of the exercise: `Runner`, `Validator`, `ModelFile` and `Facet`. 

`Runner` and `Validator` are sort of self-explanatory in that they keep the index file clean. Runner asserts some basic validation through Validator class methods, but it's ultimately Runner's job to wrap some of the main logic that was originally in index. I did wonder if I should try and validate that a file wasn't in binary STL, but I read that some software outputs solid at the top even if it's a binary, so it felt like a time sink that would contribute to the goal of the code exercise, so I dumped it.

Facet in particular I think works because it so clearly handles the duties that a facet should: storing its vertices and determining its own surface area. I initially had a Vertex class too, but it felt sort of unnecessary. A Vector class might make sense but felt like overengineering for the purpose of this code exercise.

`ModelFile` made sense to me because I felt it would be useful to think of this as a task and ModelFile would function as a task reporter to some degree. In this case, it stores the relevant data that will eventually be output. I had considered that ModelFile could eventually be responsible for some of the other reporting in the app around validation after getting through initial, naive checks, but opted out of it for time's sake.

There is also a file that contains the one-off regular expressions that are used to isolate facet blocks and vertices. This is one area that I am certain could use more finesse as it's rather brittle. I'm sure users and different programs will mangle their output and lead to failures in this code when spacing doesn't match my expectations. Perhaps some kind of template string approach to regexps would make more sense - I could look at the number of leading spaces and dynamically build a regex off of that. I had toyed with capture groups but was a little worried about a performance hit when dealing with larger jobs and was eating up too much time.

## Performance Changes

I can immediately see that having a single iteration to handle all the facet object creation is expensive with large files. And it's actually a nested iteration so I have to believe there's a way to build smarter regular expressions that don't require two passes, one for facets, one for vertices. I could probably box up floats in groups of twelve as a facet (3 for normal, 3x3 vertices) and that might cut things down to a single pass.

I tested with a much larger file https://people.sc.fsu.edu/~jburkardt/data/stla/liver.stl (38,000+ triangles), and the difference was noticeable (~345ms for liver.stl, 52ms for Moon.stl).

To speed up the existing code, I imagine you could parallelize the job, have a piece that pares down each into chunks of 50_000, 100_000, etc., does the calculation on the chunk, and joins the results.