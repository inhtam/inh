#!/usr/bin/env node

const { program } = require("commander");
const run = require("../lib/run");
const install = require("../lib/install");
const uninstall = require("../lib/uninstall");
const update = require("../lib/update");
const status = require("../lib/status");
const list = require("../lib/list");

program
  .name("inh")
  .version("2.0.3")
  .usage("[command] or [appName]")
  .description(`🧠 INH Terminal (I'm Not Hacker)
A modular CLI platform to run JavaScript-based terminal apps.

Visit https://github.com/inhtam/inh/wiki for more information.`)
  .arguments("[appName]")
  .action(async (appName) => {
    if (!appName) {
      program.help();
    }

    await run(appName);
  });

program
  .command("install <app>")
  .description("Install an application from database")
  .action(install);

program
  .command("uninstall <app>")
  .description("Remove an installed application")
  .action(uninstall);

program
  .command("list")
  .description("See your installed apps")
  .action(list);

program
  .command("update [app]")
  .description("Update inh or a specific application")
  .action(update);

program
  .command("status")
  .description("Show server/app status")
  .action(status);

program.parse(process.argv);