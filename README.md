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



## Performance Changes