/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 npmPower Kernel
 */
import fs from 'fs';

interface FileClassMock {
  class: string;
  file?: string;
  mock?: string;
}

interface Names {
  graphql: {
    query: {
      entity: string;
      allEntity: string;
      allEntityMeta: string;
    };
    mutation: {
      create: string;
      update: string;
      delete: string;
    };
    type: {
      entityMetadata: string;
    };
    input: {
      entityFilter: string;
    };
  };

  entity: {
    file: string;
    class: string;
    dir: string;
    table: string;
    collection: string;
  };
  dtos: {
    entity: FileClassMock;
    create: FileClassMock;
    list: FileClassMock;
    update: FileClassMock;
  };
  controllers: {
    count: FileClassMock;
    create: FileClassMock;
    delete: FileClassMock;
    list: FileClassMock;
    update: FileClassMock;
    view: FileClassMock;
  };
  actions: {
    count: FileClassMock;
    create: FileClassMock;
    delete: FileClassMock;
    list: FileClassMock;
    update: FileClassMock;
    view: FileClassMock;
  };
  repo: {
    create: FileClassMock;
    delete: FileClassMock;
    list: FileClassMock;
    update: FileClassMock;
    view: FileClassMock;
  };
  mongo: {
    create: FileClassMock;
    delete: FileClassMock;
    list: FileClassMock;
    update: FileClassMock;
    view: FileClassMock;
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
    `./src/domains/${name.toLowerCase()}/ioc`,
    `./src/domains/${name.toLowerCase()}/graphql`,
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
    graphql: {
      query: {
        entity: name,
        allEntity: `all${entity}s`,
        allEntityMeta: `_all${entity}sMeta`,
      },
      mutation: {
        create: `create${entity}`,
        update: `update${entity}`,
        delete: `delete${entity}`,
      },
      type: {
        entityMetadata: `${entity}Metadata`,
      },
      input: {
        entityFilter: `${entity}Filter`,
      },
    },

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
        mock: `Count${entity}MockAction`,
      },
      create: {
        file: `create-${name}-action`,
        class: `Create${entity}Action`,
        mock: `Create${entity}MockAction`,
      },
      delete: {
        file: `delete-${name}-action`,
        class: `Delete${entity}Action`,
        mock: `Delete${entity}MockAction`,
      },
      list: {
        file: `list-${name}-action`,
        class: `List${entity}Action`,
        mock: `List${entity}MockAction`,
      },
      update: {
        file: `update-${name}-action`,
        class: `Update${entity}Action`,
        mock: `Update${entity}MockAction`,
      },
      view: {
        file: `view-${name}-action`,
        class: `View${entity}Action`,
        mock: `View${entity}MockAction`,
      },
    },
    repo: {
      create: {
        file: `create-${name}-repo`,
        class: `Create${entity}Repo`,
        mock: `Create${entity}MockRepo`,
      },
      delete: {
        file: `delete-${name}-repo`,
        class: `Delete${entity}Repo`,
        mock: `Delete${entity}MockRepo`,
      },
      list: {
        file: `list-${name}-repo`,
        class: `List${entity}Repo`,
        mock: `List${entity}MockRepo`,
      },
      update: {
        file: `update-${name}-repo`,
        class: `Update${entity}Repo`,
        mock: `Update${entity}MockRepo`,
      },
      view: {
        file: `view-${name}-repo`,
        class: `View${entity}Repo`,
        mock: `View${entity}MockRepo`,
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
    // graphql
    GqlQueryEntity: names.entity.file,
    GqlQueryAllEntity: names.graphql.query.allEntity,
    GqlQueryAllEntityMeta: names.graphql.query.allEntityMeta,

    GqlMutationUpdateEntity: names.graphql.mutation.update,
    GqlMutationDeleteEntity: names.graphql.mutation.delete,
    GqlMutationCreateEntity: names.graphql.mutation.create,

    GqlInputEntityFilter: names.graphql.input.entityFilter,
    GqlTypeEntityMatadata: names.graphql.type.entityMetadata,

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

    CountEntityMockAction: names.actions.count.mock,
    CreateEntityMockAction: names.actions.create.mock,
    DeleteEntityMockAction: names.actions.delete.mock,
    ListEntityMockAction: names.actions.list.mock,
    UpdateEntityMockAction: names.actions.update.mock,
    ViewEntityMockAction: names.actions.view.mock,

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

    CreateEntityDtoFile: names.dtos.create.file,
    ListEntityDtoFile: names.dtos.list.file,
    EntityDtoFile: names.dtos.entity.file,
    UpdateEntityDtoFile: names.dtos.update.file,

    // entity
    Entity: names.entity.class,
    EntityFile: names.entity.file,
    EntityDir: names.entity.dir,
    EntityCollection: names.entity.collection,

    // repo
    CreateEntityRepo: names.repo.create.class,
    DeleteEntityRepo: names.repo.delete.class,
    ListEntityRepo: names.repo.list.class,
    UpdateEntityRepo: names.repo.update.class,
    ViewEntityRepo: names.repo.view.class,

    CreateEntityRepoFile: names.repo.create.file,
    DeleteEntityRepoFile: names.repo.delete.file,
    ListEntityRepoFile: names.repo.list.file,
    UpdateEntityRepoFile: names.repo.update.file,
    ViewEntityRepoFile: names.repo.view.file,

    CreateEntityMockRepo: names.repo.create.mock,
    DeleteEntityMockRepo: names.repo.delete.mock,
    ListEntityMockRepo: names.repo.list.mock,
    UpdateEntityMockRepo: names.repo.update.mock,
    ViewEntityMockRepo: names.repo.view.mock,

    // mongo
    CreateEntityMongoRepo: names.mongo.create.class,
    DeleteEntityMongoRepo: names.mongo.delete.class,
    ListEntityMongoRepo: names.mongo.list.class,
    UpdateEntityMongoRepo: names.mongo.update.class,
    ViewEntityMongoRepo: names.mongo.view.class,

    CreateEntityMongoRepoFile: names.mongo.create.file,
    DeleteEntityMongoRepoFile: names.mongo.delete.file,
    ListEntityMongoRepoFile: names.mongo.list.file,
    UpdateEntityMongoRepoFile: names.mongo.update.file,
    ViewEntityMongoRepoFile: names.mongo.view.file,
  };
};

export { mkdirs, generateNames, generateTwigVars, Names };
