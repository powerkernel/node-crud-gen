/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import fs from 'fs';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { mkdirs, generateNames, Names } from './helper';

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

const generateRepos = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/repositories`);
  let twing = new TwingEnvironment(loader);

  // create
  twing
    .render('create-entity-repo.twig', { Class: names.repo.create.class, EntityDto: names.dtos.entity.class })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/repositories/${names.repo.create.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // delete
  twing.render('delete-entity-repo.twig', { Class: names.repo.delete.class }).then((output) => {
    try {
      fs.writeFileSync(`./src/domains/${names.entity.file}/repositories/${names.repo.delete.file}.ts`, output);
    } catch (err) {
      console.error(err);
    }
  });

  // list
  twing
    .render('list-entity-repo.twig', {
      Class: names.repo.list.class,
      ListEntityDto: names.dtos.list.class,
      EntityDto: names.dtos.entity.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/repositories/${names.repo.list.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // update
  twing
    .render('update-entity-repo.twig', { Class: names.repo.update.class, EntityDto: names.dtos.entity.class })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/repositories/${names.repo.update.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // view
  twing
    .render('view-entity-repo.twig', { Class: names.repo.view.class, EntityDto: names.dtos.entity.class })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/repositories/${names.repo.view.file}.ts`, output);
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
        fs.writeFileSync(`./src/domains/${names.entity.file}/repositories/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });
};

const generateActions = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/actions`);
  let twing = new TwingEnvironment(loader);

  // count
  twing
    .render('count-entity-action.twig', {
      Class: names.actions.count.class,
      ListEntityDto: names.dtos.list.class,
      ListEntityRepo: names.repo.list.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/${names.actions.count.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // create
  twing
    .render('create-entity-action.twig', {
      Class: names.actions.create.class,
      CreateEntityDto: names.dtos.create.class,
      EntityDto: names.dtos.entity.class,
      Entity: names.entity.class,
      CreateEntityRepo: names.repo.create.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/${names.actions.create.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // delete
  twing
    .render('delete-entity-action.twig', {
      Class: names.actions.delete.class,
      DeleteEntityRepo: names.repo.delete.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/${names.actions.delete.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // list
  twing
    .render('list-entity-action.twig', {
      Class: names.actions.list.class,
      EntityDto: names.dtos.entity.class,
      ListEntityDto: names.dtos.list.class,
      ListEntityRepo: names.repo.list.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/${names.actions.list.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // update
  twing
    .render('update-entity-action.twig', {
      Class: names.actions.update.class,
      Entity: names.entity.class,
      EntityDto: names.dtos.entity.class,
      UpdateEntityDto: names.dtos.update.class,
      UpdateEntityRepo: names.repo.update.class,
      ViewEntityRepo: names.repo.view.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/${names.actions.update.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // view
  twing
    .render('view-entity-action.twig', {
      Class: names.actions.view.class,
      Entity: names.entity.class,
      EntityDto: names.dtos.entity.class,
      ViewEntityRepo: names.repo.view.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/${names.actions.view.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // inedx
  twing
    .render('index.twig', {
      CountEntityActionClass: names.actions.count.class,
      CountEntityActionFile: names.actions.count.file,
      CreateEntityActionClass: names.actions.create.class,
      CreateEntityActionFile: names.actions.create.file,
      DeleteEntityActionClass: names.actions.delete.class,
      DeleteEntityActionFile: names.actions.delete.file,
      ListEntityActionClass: names.actions.list.class,
      ListEntityActionFile: names.actions.list.file,
      UpdateEntityActionClass: names.actions.update.class,
      UpdateEntityActionFile: names.actions.update.file,
      ViewEntityActionClass: names.actions.view.class,
      ViewEntityActionFile: names.actions.view.file,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/actions/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });
};

const generateControllers = (names: Names) => {
  let loader = new TwingLoaderFilesystem(`${__dirname}/../templates/controllers`);
  let twing = new TwingEnvironment(loader);

  // count
  twing
    .render('count-entity-controller.twig', {
      Class: names.controllers.count.class,
      ListEntityDto: names.dtos.list.class,
      CountEntityAction: names.actions.count.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/${names.controllers.count.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // create
  twing
    .render('create-entity-controller.twig', {
      Class: names.controllers.create.class,
      CreateEntityDto: names.dtos.create.class,
      CreateEntityAction: names.actions.create.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/${names.controllers.create.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // delete
  twing
    .render('delete-entity-controller.twig', {
      Class: names.controllers.delete.class,
      DeleteEntityAction: names.actions.delete.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/${names.controllers.delete.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // list
  twing
    .render('list-entity-controller.twig', {
      Class: names.controllers.list.class,
      Entity: names.entity.class,
      ListEntityDto: names.dtos.list.class,
      ListEntityAction: names.actions.list.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/${names.controllers.list.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // update
  twing
    .render('update-entity-controller.twig', {
      Class: names.controllers.update.class,
      UpdateEntityDto: names.dtos.update.class,
      UpdateEntityAction: names.actions.update.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/${names.controllers.update.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // view
  twing
    .render('view-entity-controller.twig', {
      Class: names.controllers.view.class,
      ViewEntityAction: names.actions.view.class,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/${names.controllers.view.file}.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });

  // inedx
  twing
    .render('index.twig', {
      CountEntityControllerClass: names.controllers.count.class,
      CountEntityControllerFile: names.controllers.count.file,
      CreateEntityControllerClass: names.controllers.create.class,
      CreateEntityControllerFile: names.controllers.create.file,
      DeleteEntityControllerClass: names.controllers.delete.class,
      DeleteEntityControllerFile: names.controllers.delete.file,
      ListEntityControllerClass: names.controllers.list.class,
      ListEntityControllerFile: names.controllers.list.file,
      UpdateEntityControllerClass: names.controllers.update.class,
      UpdateEntityControllerFile: names.controllers.update.file,
      ViewEntityControllerClass: names.controllers.view.class,
      ViewEntityControllerFile: names.controllers.view.file,
    })
    .then((output) => {
      try {
        fs.writeFileSync(`./src/domains/${names.entity.file}/controllers/index.ts`, output);
      } catch (err) {
        console.error(err);
      }
    });
};

const generateMongo = (names: Names) => {};

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
};

export default cli;
