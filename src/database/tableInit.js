import pool from "./connection.js";

// create User table if not exist
export async function createUsersTable() {
  try {
    const createTableQuery = await pool.query(
      'CREATE TABLE IF NOT EXISTS "users" ( user_id VARCHAR(225) UNIQUE PRIMARY KEY, fname VARCHAR(225) NOT NULL, lname VARCHAR(225) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(225) NOT NULL,  validation_key VARCHAR(255) NOT NULL UNIQUE, validated BOOLEAN NOT NULL, admin_id VARCHAR(225) UNIQUE, creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP )'
    );
    console.log("users table created successfully");
  } catch (error) {
    console.log(error, "Error creating users table");
  }
}

// create Vehicles table if not exist
export async function createVehiclesTable() {
  try {
    const createTableQuery = await pool.query(
      'CREATE TABLE IF NOT EXISTS "vehicles" ( vehicle_id VARCHAR(225) UNIQUE PRIMARY KEY, brand VARCHAR(225) REQUIRED, model VARCHAR(225) REQUIRED, purchase_date NUMERIC, mileage, creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(225) REFERENCES "users"(user_id) )'
    );
    console.log("vehicles table created successfully");
  } catch (error) {
    console.log(error, "Error creating vehicles table");
  }
}

// create Service_records table if is not exist
export async function createServiceRecordsTable() {
  try {
    const createTableQuery = await pool.query(
      'CREATE TABLE IF NOT EXISTS "service_records" ( service_id VARCHAR(225) UNIQUE PRIMARY KEY, next_mileage VARCHAR(225), next_mileage VARCHAR(225), next_date VARCHAR(225), cost NUMERIC, service_name VARCHAR(255) REQUIRED, place VARCHAR(255), tags, notes VARCHAR(1000), service_date, creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, vehicle_id VARCHAR(225) REFERENCES "vehicles"(vehicle_id) )'
    );
    console.log("service_records table created successfully");
  } catch (error) {
    console.log(error, "Error creating redirect_analytics table");
  }
}
