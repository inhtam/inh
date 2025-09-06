#!/usr/bin/env node

const { program } = require("commander");
const run = require("../lib/run");
const install = require("../lib/install");
const uninstall = require("../lib/uninstall");
const update = require("../lib/update");
const dev = require("../lib/dev");
const list = require("../lib/list");

program
  .name("inh")
  .version("2.0.4")
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
  .command("dev")
  .description("Geliştirme modunu başlatır")
  .argument("[target]", "paket adı veya local path") // <-- bu satır eklendi
  .action(dev);

program
  .command("install <app>")
  .description("Install an application from the INH package registry")
  .action(install);

program
  .command("list")
  .description("List all applications you have installed")
  .action(list);

program
  .command("uninstall <app>")
  .description("Uninstall an application you previously installed")
  .action(uninstall);

program
  .command("update [app]")
  .description("Update the INH CLI itself or a specific application")
  .action(update);

program.parse(process.argv);