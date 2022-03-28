/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import fs from 'fs';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { mkdirs, generateNames, generateTwigVars, Names } from './helper';

const validateArgs = (args: string[]) => {
  if (args.length !== 1) {
    console.error('missing arguments');
    process.exit(1);
  }
};

const generateDtos = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/dtos`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // entity dto
  twing.render(`entity.twig`, vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/dtos/${names.dtos.entity.file}.ts`, output);
  });

  // create entity dto
  twing.render(`create.twig`, vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/dtos/${names.dtos.create.file}.ts`, output);
  });

  // list entity dto
  twing.render(`list.twig`, vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/dtos/${names.dtos.list.file}.ts`, output);
  });

  // update
  twing.render(`update.twig`, vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/dtos/${names.dtos.update.file}.ts`, output);
  });

  // index
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/dtos/index.ts`, output);
  });
};

const generateEntiry = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/entities`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // entity
  twing.render('entity.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/entities/${names.entity.file}.ts`, output);
  });
  twing.render('__tests__/entity.test.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/entities/__tests__/${names.entity.file}.test.ts`, output);
  });

  // inedx
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/entities/index.ts`, output);
  });
};

const generateRepos = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/repositories`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // create
  twing.render('create.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.create.file}.ts`, output);
  });

  // delete
  twing.render('delete.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.delete.file}.ts`, output);
  });

  // list
  twing.render('list.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.list.file}.ts`, output);
  });

  // update
  twing.render('update.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.update.file}.ts`, output);
  });

  // view
  twing.render('view.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.view.file}.ts`, output);
  });

  // inedx
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/index.ts`, output);
  });
};

const generateActions = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/actions`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // count
  twing.render('count.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/${names.actions.count.file}.ts`, output);
  });
  twing.render('__tests__/count.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/__tests__/${names.actions.count.file}.test.ts`, output);
  });

  // create
  twing.render('create.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/${names.actions.create.file}.ts`, output);
  });
  twing.render('__tests__/create.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/actions/__tests__/${names.actions.create.file}.test.ts`,
      output
    );
  });

  // delete
  twing.render('delete.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/${names.actions.delete.file}.ts`, output);
  });
  twing.render('__tests__/delete.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/actions/__tests__/${names.actions.delete.file}.test.ts`,
      output
    );
  });

  // list
  twing.render('list.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/${names.actions.list.file}.ts`, output);
  });
  twing.render('__tests__/list.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/__tests__/${names.actions.list.file}.test.ts`, output);
  });

  // update
  twing.render('update.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/${names.actions.update.file}.ts`, output);
  });
  twing.render('__tests__/update.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/actions/__tests__/${names.actions.update.file}.test.ts`,
      output
    );
  });

  // view
  twing.render('view.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/${names.actions.view.file}.ts`, output);
  });
  twing.render('__tests__/view.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/__tests__/${names.actions.view.file}.test.ts`, output);
  });

  // inedx
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/actions/index.ts`, output);
  });
};

const generateControllers = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/controllers`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // count
  twing.render('count.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/${names.controllers.count.file}.ts`, output);
  });
  twing.render('__tests__/count.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/controllers/__tests__/${names.controllers.count.file}.test.ts`,
      output
    );
  });

  // create
  twing.render('create.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/${names.controllers.create.file}.ts`, output);
  });
  twing.render('__tests__/create.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/controllers/__tests__/${names.controllers.create.file}.test.ts`,
      output
    );
  });

  // delete
  twing.render('delete.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/${names.controllers.delete.file}.ts`, output);
  });
  twing.render('__tests__/delete.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/controllers/__tests__/${names.controllers.delete.file}.test.ts`,
      output
    );
  });

  // list
  twing.render('list.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/${names.controllers.list.file}.ts`, output);
  });
  twing.render('__tests__/list.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/controllers/__tests__/${names.controllers.list.file}.test.ts`,
      output
    );
  });

  // update
  twing.render('update.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/${names.controllers.update.file}.ts`, output);
  });
  twing.render('__tests__/update.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/controllers/__tests__/${names.controllers.update.file}.test.ts`,
      output
    );
  });

  // view
  twing.render('view.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/${names.controllers.view.file}.ts`, output);
  });
  twing.render('__tests__/view.twig', vars).then((output) => {
    fs.writeFileSync(
      `./src/domains/${names.entity.dir}/controllers/__tests__/${names.controllers.view.file}.test.ts`,
      output
    );
  });

  // inedx
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/controllers/index.ts`, output);
  });
};

const generateMongo = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/mongo`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // create
  twing.render('create.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.create.file}.ts`, output);
  });
  twing.render('__tests__/create.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/__tests__/${names.mongo.create.file}.test.ts`, output);
  });

  // delete
  twing.render('delete.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.delete.file}.ts`, output);
  });
  twing.render('__tests__/delete.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/__tests__/${names.mongo.delete.file}.test.ts`, output);
  });

  // list
  twing.render('list.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.list.file}.ts`, output);
  });
  twing.render('__tests__/list.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/__tests__/${names.mongo.list.file}.test.ts`, output);
  });

  // update
  twing.render('update.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.update.file}.ts`, output);
  });
  twing.render('__tests__/update.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/__tests__/${names.mongo.update.file}.test.ts`, output);
  });

  // view
  twing.render('view.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.view.file}.ts`, output);
  });
  twing.render('__tests__/view.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/__tests__/${names.mongo.view.file}.test.ts`, output);
  });

  // inedx
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/repositories/${names.entity.dir}/index.ts`, output);
  });
};

const generateIco = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/ico`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // binding
  twing.render('binding.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/ico/binding.ts`, output);
  });

  // identifiers
  twing.render('identifiers.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/ico/identifiers.ts`, output);
  });
};

const generateGql = (names: Names) => {
  const loader = new TwingLoaderFilesystem(`${__dirname}/../templates/graphql`);
  const twing = new TwingEnvironment(loader);
  const vars = generateTwigVars(names);

  // resolvers
  twing.render('resolvers.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/graphql/resolvers.ts`, output);
  });

  // typeDefs
  twing.render('typeDefs.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/graphql/typeDefs.ts`, output);
  });

  // index
  twing.render('index.twig', vars).then((output) => {
    fs.writeFileSync(`./src/domains/${names.entity.dir}/graphql/index.ts`, output);
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

  // repositories
  generateRepos(names);

  // actions
  generateActions(names);

  // controllers
  generateControllers(names);

  // mongo
  generateMongo(names);

  // IoC
  generateIco(names);

  // graphql
  generateGql(names);
};

export default cli;
