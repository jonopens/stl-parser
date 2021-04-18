import Runner from './runner.ts';

Runner.validateOrExit(Deno.args);
const stlFile = await Deno.readTextFile(Deno.args[0]);

Runner.run(stlFile);
