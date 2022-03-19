/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import fs from 'fs';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { mkdirs } from './helper';

const cli = async (): Promise<void> => {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('missing arguments');
    process.exit(1);
  }

  const entity = args[0];

  // write dirs
  mkdirs(entity);

  // write files
  let loader = new TwingLoaderFilesystem('./templates');
  let twing = new TwingEnvironment(loader);

  // entity
  twing.render('entities/entity.twig', { Entity: entity, EntityDto: `${entity}Dto` }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${entity.toLowerCase()}/entities/${entity.toLowerCase()}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });
  twing
    .render('entities/index.twig', { Entity: entity, EntityFile: `${entity.toLocaleLowerCase()}` })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${entity.toLowerCase()}/entities/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });
};
export default cli;
