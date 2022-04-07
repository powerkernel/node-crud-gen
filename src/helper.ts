/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 npmPower Kernel
 */
import fs from 'fs';
import * as changeCase from 'change-case';

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
  const kebabCaseName = changeCase.paramCase(entity);
  const dirs = [
    `./src/domains/${kebabCaseName}/entities/__tests__`,
    `./src/domains/${kebabCaseName}/dtos`,
    `./src/domains/${kebabCaseName}/controllers/__tests__`,
    `./src/domains/${kebabCaseName}/repositories`,
    `./src/domains/${kebabCaseName}/actions/__tests__`,
    `./src/domains/${kebabCaseName}/ioc`,
    `./src/domains/${kebabCaseName}/graphql`,
    `./src/repositories/${kebabCaseName}/__tests__`,
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

const generateNames = (entity: string): Names => {
  const kebabCaseName = changeCase.paramCase(entity); // kebab-case-name
  const pascalCaseName = changeCase.pascalCase(entity); // PascalCaseName
  const snakeCaseName = changeCase.snakeCase(entity); // kebab_case_name
  const camelCaseName = changeCase.camelCase(entity); // camelCaseName

  return {
    graphql: {
      query: {
        entity: camelCaseName,
        allEntity: `all${pascalCaseName}s`,
        allEntityMeta: `_all${pascalCaseName}sMeta`,
      },
      mutation: {
        create: `create${pascalCaseName}`,
        update: `update${pascalCaseName}`,
        delete: `delete${pascalCaseName}`,
      },
      type: {
        entityMetadata: `${pascalCaseName}Metadata`,
      },
      input: {
        entityFilter: `${pascalCaseName}Filter`,
      },
    },

    entity: {
      dir: kebabCaseName,
      file: kebabCaseName,
      class: pascalCaseName,
      collection: `${snakeCaseName}s`,
      table: `${snakeCaseName}s`,
    },
    dtos: {
      entity: {
        file: `${kebabCaseName}-dto`,
        class: `${pascalCaseName}Dto`,
      },
      create: {
        file: `create-${kebabCaseName}-dto`,
        class: `Create${pascalCaseName}Dto`,
      },
      list: {
        file: `list-${kebabCaseName}-dto`,
        class: `List${pascalCaseName}Dto`,
      },
      update: {
        file: `update-${kebabCaseName}-dto`,
        class: `Update${pascalCaseName}Dto`,
      },
    },
    controllers: {
      count: {
        file: `count-${kebabCaseName}-controller`,
        class: `Count${pascalCaseName}Controller`,
      },
      create: {
        file: `create-${kebabCaseName}-controller`,
        class: `Create${pascalCaseName}Controller`,
      },
      delete: {
        file: `delete-${kebabCaseName}-controller`,
        class: `Delete${pascalCaseName}Controller`,
      },
      list: {
        file: `list-${kebabCaseName}-controller`,
        class: `List${pascalCaseName}Controller`,
      },
      update: {
        file: `update-${kebabCaseName}-controller`,
        class: `Update${pascalCaseName}Controller`,
      },
      view: {
        file: `view-${kebabCaseName}-controller`,
        class: `View${pascalCaseName}Controller`,
      },
    },
    actions: {
      count: {
        file: `count-${kebabCaseName}-action`,
        class: `Count${pascalCaseName}Action`,
        mock: `Count${pascalCaseName}MockAction`,
      },
      create: {
        file: `create-${kebabCaseName}-action`,
        class: `Create${pascalCaseName}Action`,
        mock: `Create${pascalCaseName}MockAction`,
      },
      delete: {
        file: `delete-${kebabCaseName}-action`,
        class: `Delete${pascalCaseName}Action`,
        mock: `Delete${pascalCaseName}MockAction`,
      },
      list: {
        file: `list-${kebabCaseName}-action`,
        class: `List${pascalCaseName}Action`,
        mock: `List${pascalCaseName}MockAction`,
      },
      update: {
        file: `update-${kebabCaseName}-action`,
        class: `Update${pascalCaseName}Action`,
        mock: `Update${pascalCaseName}MockAction`,
      },
      view: {
        file: `view-${kebabCaseName}-action`,
        class: `View${pascalCaseName}Action`,
        mock: `View${pascalCaseName}MockAction`,
      },
    },
    repo: {
      create: {
        file: `create-${kebabCaseName}-repo`,
        class: `Create${pascalCaseName}Repo`,
        mock: `Create${pascalCaseName}MockRepo`,
      },
      delete: {
        file: `delete-${kebabCaseName}-repo`,
        class: `Delete${pascalCaseName}Repo`,
        mock: `Delete${pascalCaseName}MockRepo`,
      },
      list: {
        file: `list-${kebabCaseName}-repo`,
        class: `List${pascalCaseName}Repo`,
        mock: `List${pascalCaseName}MockRepo`,
      },
      update: {
        file: `update-${kebabCaseName}-repo`,
        class: `Update${pascalCaseName}Repo`,
        mock: `Update${pascalCaseName}MockRepo`,
      },
      view: {
        file: `view-${kebabCaseName}-repo`,
        class: `View${pascalCaseName}Repo`,
        mock: `View${pascalCaseName}MockRepo`,
      },
    },
    mongo: {
      create: {
        file: `create-${kebabCaseName}-mongo-repo`,
        class: `Create${pascalCaseName}MongoRepo`,
      },
      delete: {
        file: `delete-${kebabCaseName}-mongo-repo`,
        class: `Delete${pascalCaseName}MongoRepo`,
      },
      list: {
        file: `list-${kebabCaseName}-mongo-repo`,
        class: `List${pascalCaseName}MongoRepo`,
      },
      update: {
        file: `update-${kebabCaseName}-mongo-repo`,
        class: `Update${pascalCaseName}MongoRepo`,
      },
      view: {
        file: `view-${kebabCaseName}-mongo-repo`,
        class: `View${pascalCaseName}MongoRepo`,
      },
    },
  };
};

const generateTwigVars = (names: Names) => {
  return {
    // graphql
    GqlQueryEntity: names.graphql.query.entity,
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
