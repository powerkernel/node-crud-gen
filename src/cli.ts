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
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/entities`);
  let twing = new TwingEnvironment(loader);

  // entity
  twing.render('entity.twig', { Class: names.entity.class, EntityDto: names.dtos.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/entities/${names.entity.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // inedx
  twing.render('index.twig', { EntityClass: names.entity.class, EntityFile: names.entity.file }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/entities/index.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // entity test
  twing.render('__tests__/entity.test.twig', { Class: names.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/entities/__tests__/${names.entity.file}.test.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });
};

const generateRepos = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/repositories`);
  let twing = new TwingEnvironment(loader);

  // create
  twing.render('create.twig', { Class: names.repo.create.class, EntityDto: names.dtos.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.create.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // delete
  twing.render('delete.twig', { Class: names.repo.delete.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.delete.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // list
  twing
    .render('list.twig', {
      Class: names.repo.list.class,
      ListEntityDto: names.dtos.list.class,
      EntityDto: names.dtos.entity.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.list.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // update
  twing.render('update.twig', { Class: names.repo.update.class, EntityDto: names.dtos.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.update.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // view
  twing.render('view.twig', { Class: names.repo.view.class, EntityDto: names.dtos.entity.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/${names.repo.view.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // inedx
  twing
    .render('index.twig', {
      CreateEntityRepoClass: names.repo.create.class,
      CreateEntityRepoFile: names.repo.create.file,
      DeleteEntityRepoClass: names.repo.delete.class,
      DeleteEntityRepoFile: names.repo.delete.file,
      ListEntityRepoClass: names.repo.list.class,
      ListEntityRepoFile: names.repo.list.file,
      UpdateEntityRepoClass: names.repo.update.class,
      UpdateEntityRepoFile: names.repo.update.file,
      ViewEntityRepoClass: names.repo.view.class,
      ViewEntityRepoFile: names.repo.view.file,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.dir}/repositories/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
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
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/mongo`);
  let twing = new TwingEnvironment(loader);

  // create
  twing
    .render('create.twig', {
      Class: names.mongo.create.class,
      EntityDir: names.entity.dir,
      EntityCollection: names.entity.collection,
      EntityDto: names.dtos.entity.class,
      CreateEntityRepo: names.repo.create.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.create.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // delete
  twing
    .render('delete.twig', {
      Class: names.mongo.delete.class,
      EntityDir: names.entity.dir,
      EntityCollection: names.entity.collection,
      DeleteEntityRepo: names.repo.delete.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.delete.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // list
  twing
    .render('list.twig', {
      Class: names.mongo.list.class,
      EntityDir: names.entity.dir,
      EntityCollection: names.entity.collection,

      EntityDto: names.dtos.entity.class,
      ListEntityDto: names.dtos.list.class,
      ListEntityRepo: names.repo.list.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.list.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // update
  twing
    .render('update.twig', {
      Class: names.mongo.delete.class,
      EntityDir: names.entity.dir,
      EntityCollection: names.entity.collection,
      EntityDto: names.dtos.entity.class,
      UpdateEntityRepo: names.repo.update.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.update.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // view
  twing
    .render('view.twig', {
      Class: names.mongo.delete.class,
      EntityDir: names.entity.dir,
      EntityCollection: names.entity.collection,
      EntityDto: names.dtos.entity.class,
      ViewEntityRepo: names.repo.view.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/repositories/${names.entity.dir}/${names.mongo.view.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // inedx
  twing
    .render('index.twig', {
      CreateEntityMongoRepoClass: names.mongo.create.class,
      CreateEntityMongoRepoFile: names.mongo.create.file,
      DeleteEntityMongoRepoClass: names.mongo.delete.class,
      DeleteEntityMongoRepoFile: names.mongo.delete.file,
      ListEntityMongoRepoClass: names.mongo.list.class,
      ListEntityMongoRepoFile: names.mongo.list.file,
      UpdateEntityMongoRepoClass: names.mongo.update.class,
      UpdateEntityMongoRepoFile: names.mongo.update.file,
      ViewEntityMongoRepoClass: names.mongo.view.class,
      ViewEntityMongoRepoFile: names.mongo.view.file,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/repositories/${names.entity.dir}/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });
};

const generateIco = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/ico`);
  let twing = new TwingEnvironment(loader);

  // ico
  twing
    .render('ico.twig', {
      EntityDir: names.entity.dir,
      CreateEntityController: names.controllers.create.class,
      DeleteEntityController: names.controllers.delete.class,
      ListEntityController: names.controllers.list.class,
      UpdateEntityController: names.controllers.update.class,
      ViewEntityController: names.controllers.view.class,
      CountEntityController: names.controllers.count.class,
      CreateEntityAction: names.actions.create.class,
      DeleteEntityAction: names.actions.delete.class,
      ListEntityAction: names.actions.list.class,
      UpdateEntityAction: names.actions.update.class,
      ViewEntityAction: names.actions.view.class,
      CountEntityAction: names.actions.count.class,
      CreateEntityRepo: names.repo.create.class,
      DeleteEntityRepo: names.repo.delete.class,
      ListEntityRepo: names.repo.list.class,
      UpdateEntityRepo: names.repo.update.class,
      ViewEntityRepo: names.repo.view.class,
      CreateEntityMongoRepo: names.mongo.create.class,
      ListEntityMongoRepo: names.mongo.list.class,
      UpdateEntityMongoRepo: names.mongo.update.class,
      ViewEntityMongoRepo: names.mongo.view.class,
      DeleteEntityMongoRepo: names.mongo.delete.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.dir}/ico.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // identifiers
  twing
    .render('identifiers.twig', {
      CreateEntityController: names.controllers.create.class,
      DeleteEntityController: names.controllers.delete.class,
      ListEntityController: names.controllers.list.class,
      UpdateEntityController: names.controllers.update.class,
      ViewEntityController: names.controllers.view.class,
      CountEntityController: names.controllers.count.class,

      CreateEntityAction: names.actions.create.class,
      DeleteEntityAction: names.actions.delete.class,
      ListEntityAction: names.actions.list.class,
      UpdateEntityAction: names.actions.update.class,
      ViewEntityAction: names.actions.view.class,
      CountEntityAction: names.actions.count.class,

      CreateEntityRepo: names.repo.create.class,
      DeleteEntityRepo: names.repo.delete.class,
      ListEntityRepo: names.repo.list.class,
      UpdateEntityRepo: names.repo.update.class,
      ViewEntityRepo: names.repo.view.class,

      CreateEntityMongoRepo: names.mongo.create.class,
      ListEntityMongoRepo: names.mongo.list.class,
      UpdateEntityMongoRepo: names.mongo.update.class,
      ViewEntityMongoRepo: names.mongo.view.class,
      DeleteEntityMongoRepo: names.mongo.delete.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.dir}/identifiers.ts`, output);
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
};

export default cli;
