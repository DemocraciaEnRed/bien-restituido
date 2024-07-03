// run-migrations.js

const path = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', path.resolve(__dirname, '../../'));
const fs = require('fs');
const { default: dbConnect } = require('./dbConnect');
const { default: Migration } = require('./Migration');

const migrationsPath = path.join(__dirname, 'migrations');


const runMigrations = async () => {
  const files = fs.readdirSync(migrationsPath);
  for (const file of files) {
    if (file.endsWith('.js')) {
      const existingMigration = await Migration.findOne({ name: file })
      if (existingMigration) {
        // Already applied, skip
        continue
      }
      const migration = require(path.join(migrationsPath, file));
      console.log(`Ejecutando migración: ${file}`);
      await migration();
      console.log(file);
      await Migration.create({ name: file, timestamp: Date.now() })
    }

  }

  console.log('Todas las migraciones se han ejecutado');
  process.exit(0);
};

const main = async () => {
  await dbConnect()
  await runMigrations();
};

main().catch(error => {
  console.error('Error ejecutando las migraciones:', error);
  process.exit(1);
});
