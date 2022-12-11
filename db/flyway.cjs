module.exports = {
  flywayArgs: {
    url: 'jdbc:postgresql://localhost:5432/pollsblockchain',
    schemas: 'public',
    locations: 'filesystem:db/migrations/common,filesystem:db/storedProcedures,filesystem:db/populate/common',
    user: 'postgres',
    password: null,
    sqlMigrationSuffixes: '.sql',
    baselineOnMigrate: true,
  },
  downloads: {
    expirationTimeInMs: -1, // optional, -1 will never check for updates, defaults to 1 day.
  },
};
