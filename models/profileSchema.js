const profileSchema = `Profile (
  profileId INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  emergencyContact VARCHAR(10) NOT NULL,
  bloodPressure INTEGER NOT NULL,
  carbonMonoxide INTEGER NOT NULL,
  temperature INTEGER NOT NULL,
  healthConditions VARCHAR(255) NOT NULL
);`;

module.exports = profileSchema;