/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */
const fs = require('fs');

const mkdirs = (name) => {
  const dirs = [
    `./domains/${name.toLowerCase()}/entities/__tests__`,
    `./domains/${name.toLowerCase()}/dtos`,
    `./domains/${name.toLowerCase()}/controllers/__tests__`,
    `./domains/${name.toLowerCase()}/repositories`,
    `./domains/${name.toLowerCase()}/actions/__tests__`,
    `./repositories/${name.toLowerCase()}/__tests__`,
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

module.exports = { mkdirs };
