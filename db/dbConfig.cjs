module.exports = {
  user: 'postgres',
  password: null,
  migrationHost: 'jdbc:postgresql://localhost:5432/pollsblockchain',
  host: 'localhost',
  locations: 'filesystem:db/migrations/common,filesystem:db/storedProcedures,filesystem:db/populate/common',
  database: 'pollsblockchain',
  port: 5432,
  ssl: false,
};
