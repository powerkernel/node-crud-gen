/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 npmPower Kernel
 */
import fs from 'fs';

interface FileClass {
  file?: string;
  class: string;
}

interface Names {
  entity: {
    file: string;
    class: string;
    dir: string;
    table: string;
    collection: string;
  };
  dtos: {
    entity: FileClass;
    create: FileClass;
    list: FileClass;
    update: FileClass;
  };
  controllers: {
    count: FileClass;
    create: FileClass;
    delete: FileClass;
    list: FileClass;
    update: FileClass;
    view: FileClass;
  };
  actions: {
    count: FileClass;
    create: FileClass;
    delete: FileClass;
    list: FileClass;
    update: FileClass;
    view: FileClass;
  };
  repo: {
    create: FileClass;
    delete: FileClass;
    list: FileClass;
    update: FileClass;
    view: FileClass;
  };
  mockRepo: {
    create: FileClass;
    delete: FileClass;
    list: FileClass;
    update: FileClass;
    view: FileClass;
  };
  mongo: {
    create: FileClass;
    delete: FileClass;
    list: FileClass;
    update: FileClass;
    view: FileClass;
  };
}

const mkdirs = (entity: string) => {
  const name = entity.toLowerCase();
  const dirs = [
    `./src/domains/${name.toLowerCase()}/entities/__tests__`,
    `./src/domains/${name.toLowerCase()}/dtos`,
    `./src/domains/${name.toLowerCase()}/controllers/__tests__`,
    `./src/domains/${name.toLowerCase()}/repositories`,
    `./src/domains/${name.toLowerCase()}/actions/__tests__`,
    `./src/repositories/${name.toLowerCase()}/__tests__`,
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

const generateNames = (entity: string): Names => {
  const name = entity.toLowerCase();

  return {
    entity: {
      dir: `${name}`,
      file: `${name}`,
      class: entity,
      collection: `${name}s`,
      table: `${name}s`,
    },
    dtos: {
      entity: {
        file: `${name}-dto`,
        class: `${entity}Dto`,
      },
      create: {
        file: `create-${name}-dto`,
        class: `Create${entity}Dto`,
      },
      list: {
        file: `list-${name}-dto`,
        class: `List${entity}Dto`,
      },
      update: {
        file: `update-${name}-dto`,
        class: `Update${entity}Dto`,
      },
    },
    controllers: {
      count: {
        file: `count-${name}-controller`,
        class: `Count${entity}Controller`,
      },
      create: {
        file: `create-${name}-controller`,
        class: `Create${entity}Controller`,
      },
      delete: {
        file: `delete-${name}-controller`,
        class: `Delete${entity}Controller`,
      },
      list: {
        file: `list-${name}-controller`,
        class: `List${entity}Controller`,
      },
      update: {
        file: `update-${name}-controller`,
        class: `Update${entity}Controller`,
      },
      view: {
        file: `view-${name}-controller`,
        class: `View${entity}Controller`,
      },
    },
    actions: {
      count: {
        file: `count-${name}-action`,
        class: `Count${entity}Action`,
      },
      create: {
        file: `create-${name}-action`,
        class: `Create${entity}Action`,
      },
      delete: {
        file: `delete-${name}-action`,
        class: `Delete${entity}Action`,
      },
      list: {
        file: `list-${name}-action`,
        class: `List${entity}Action`,
      },
      update: {
        file: `update-${name}-action`,
        class: `Update${entity}Action`,
      },
      view: {
        file: `view-${name}-action`,
        class: `View${entity}Action`,
      },
    },
    repo: {
      create: {
        file: `create-${name}-repo`,
        class: `Create${entity}Repo`,
      },
      delete: {
        file: `delete-${name}-repo`,
        class: `Delete${entity}Repo`,
      },
      list: {
        file: `list-${name}-repo`,
        class: `List${entity}Repo`,
      },
      update: {
        file: `update-${name}-repo`,
        class: `Update${entity}Repo`,
      },
      view: {
        file: `view-${name}-repo`,
        class: `View${entity}Repo`,
      },
    },
    mockRepo: {
      create: {
        class: `Create${entity}MockRepo`,
      },
      delete: {
        class: `Delete${entity}MockRepo`,
      },
      list: {
        class: `List${entity}MockRepo`,
      },
      update: {
        class: `Update${entity}MockRepo`,
      },
      view: {
        class: `View${entity}MockRepo`,
      },
    },
    mongo: {
      create: {
        file: `create-${name}-mongo-repo`,
        class: `Create${entity}MongoRepo`,
      },
      delete: {
        file: `delete-${name}-mongo-repo`,
        class: `Delete${entity}MongoRepo`,
      },
      list: {
        file: `list-${name}-mongo-repo`,
        class: `List${entity}MongoRepo`,
      },
      update: {
        file: `update-${name}-mongo-repo`,
        class: `Update${entity}MongoRepo`,
      },
      view: {
        file: `view-${name}-mongo-repo`,
        class: `View${entity}MongoRepo`,
      },
    },
  };
};

const generateTwigVars = (names: Names) => {
  return {
    // actions
    CountEntityAction: names.actions.count.class,
    CreateEntityAction: names.actions.create.class,
    DeleteEntityAction: names.actions.delete.class,
    ListEntityAction: names.actions.list.class,
    UpdateEntityAction: names.actions.update.class,
    ViewEntityAction: names.actions.view.class,

    CountEntityActionFile: names.actions.count.file,
    CreateEntityActionFile: names.actions.create.file,
    DeleteEntityActionFile: names.actions.delete.file,
    ListEntityActionFile: names.actions.list.file,
    UpdateEntityActionFile: names.actions.update.file,
    ViewEntityActionFile: names.actions.view.file,

    // controllers
    CountEntityController: names.controllers.count.class,
    CreateEntityController: names.controllers.create.class,
    DeleteEntityController: names.controllers.delete.class,
    ListEntityController: names.controllers.list.class,
    UpdateEntityController: names.controllers.update.class,
    ViewEntityController: names.controllers.view.class,

    CountEntityControllerFile: names.controllers.count.file,
    CreateEntityControllerFile: names.controllers.create.file,
    DeleteEntityControllerFile: names.controllers.delete.file,
    ListEntityControllerFile: names.controllers.list.file,
    UpdateEntityControllerFile: names.controllers.update.file,
    ViewEntityControllerFile: names.controllers.view.file,

    // dtos
    CreateEntityDto: names.dtos.create.class,
    ListEntityDto: names.dtos.list.class,
    EntityDto: names.dtos.entity.class,
    UpdateEntityDto: names.dtos.update.class,

    // entity
    Entity: names.entity.class,

    // repo
    CreateEntityRepo: names.repo.create.class,
    DeleteEntityRepo: names.repo.delete.class,
    ListEntityRepo: names.repo.list.class,
    UpdateEntityRepo: names.repo.update.class,
    ViewEntityRepo: names.repo.view.class,

    // mock repo
    CreateEntityMockRepo: names.mockRepo.create.class,
    DeleteEntityMockRepo: names.mockRepo.delete.class,
    ListEntityMockRepo: names.mockRepo.list.class,
    UpdateEntityMockRepo: names.mockRepo.update.class,
    ViewEntityMockRepo: names.mockRepo.view.class,

    // mongo
    CreateEntityMongoRepo: names.mongo.create.class,
    DeleteEntityMongoRepo: names.mongo.delete.class,
    ListEntityMongoRepo: names.mongo.list.class,
    UpdateEntityMongoRepo: names.mongo.update.class,
    ViewEntityMongoRepo: names.mongo.view.class,
  };
};

export { mkdirs, generateNames, generateTwigVars, Names };
