/**
 * Create and export config variables
 */

//  container for all enviroments
var enviroments = {};

// Staging enviroment (default)
enviroments.staging = {
    'port': 3000,
    'envName' : 'staging'
};

// Production enviroment
enviroments.production = {
    'port': 5000,
    'envName' : 'production'
};

// Determine which enviroment was passed as an argument in the command-line
var currentEviroment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current enviroment is present and defined above if not, default to staging.
var enviromentToExport = typeof (enviroments[currentEviroment]) == 'object' ? enviroments[currentEviroment] : enviroments.staging;