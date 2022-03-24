/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import fs from 'fs';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { mkdirs, generateNames, Names } from './helper';
import path from 'path';

const validateArgs = (args: string[]) => {
  if (args.length !== 1) {
    console.error('missing arguments');
    process.exit(1);
  }
};

const generateDtos = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/dtos`);
  let twing = new TwingEnvironment(loader);

  // entity dto
  twing.render(`entity-dto.twig`, { Class: names.dtos.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/dtos/${names.dtos.entity.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // create entity dto
  twing.render(`create-entity-dto.twig`, { Class: names.dtos.create.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/dtos/${names.dtos.create.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // list entity dto
  twing.render(`list-entity-dto.twig`, { Class: names.dtos.list.class, Entity: names.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/dtos/${names.dtos.list.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // update
  twing.render(`update-entity-dto.twig`, { Class: names.dtos.update.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/dtos/${names.dtos.update.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // index
  twing
    .render('index.twig', {
      EntityDtoClass: names.dtos.entity.class,
      EntityDtoFile: names.dtos.entity.file,
      CreateEntityDtoClass: names.dtos.create.class,
      CreateEntityDtoFile: names.dtos.create.file,
      UpdateEntityDtoClass: names.dtos.update.class,
      UpdateEntityDtoFile: names.dtos.update.file,
      ListEntityDtoClass: names.dtos.list.class,
      ListEntityDtoFile: names.dtos.list.file,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/dtos/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });
};

const generateEntiry = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/entities`);
  let twing = new TwingEnvironment(loader);

  // entity
  twing.render('entity.twig', { Class: names.entity.class, EntityDto: names.dtos.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/entities/${names.entity.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // inedx
  twing.render('index.twig', { EntityClass: names.entity.class, EntityFile: names.entity.file }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/entities/index.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // entity test
  twing.render('__tests__/entity.test.twig', { Class: names.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/entities/__tests__/${names.entity.file}.test.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });
};

const cli = async (): Promise<void> => {
  // inputs
  const args = process.argv.slice(2);
  validateArgs(args);
  const entity = args[0];

  // names
  const names = generateNames(entity);

  // write dirs
  mkdirs(entity);

  // generate dtos
  generateDtos(names);

  // entity
  generateEntiry(names);
};
export default cli;
