/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 npmPower Kernel
 */
import fs from 'fs';

const mkdirs = (name: string) => {
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

export { mkdirs };
