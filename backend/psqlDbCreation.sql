-- to reseed postgresDB please run
-- psql -U basketagent -d requestbasketdb -f psqlDbCreation.sql

-- Start a transaction to ensure atomicity
BEGIN;

-- Drop the requests table first to handle dependencies
DROP TABLE IF EXISTS requests;

-- Then drop the baskets table
DROP TABLE IF EXISTS baskets;

-- Create the baskets table with VARCHAR and without trailing comma
CREATE TABLE IF NOT EXISTS baskets (
  basket_name VARCHAR(10) PRIMARY KEY
  -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the requests table with corrected foreign key reference and data types
CREATE TABLE IF NOT EXISTS requests (
  id VARCHAR(10) PRIMARY KEY, 
  basket_id VARCHAR(10) NOT NULL REFERENCES baskets(basket_name) ON DELETE CASCADE, 
  path VARCHAR(100), 
  method VARCHAR(100), 
  headers VARCHAR,
  query_params VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert seed data into baskets
INSERT INTO baskets (basket_name)
VALUES
  ('BASKET001'),
  ('BASKET002');

-- Insert seed data into requests
INSERT INTO requests (id, basket_id, path, method, headers, query_params)
VALUES
  (
    '1234567890', 
    'BASKET001', 
    'BASKET001/Bearer/token1', 
    'GET', 
    '{
      "host": "localhost:3000",
      "connection": "keep-alive",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"16-XNh242oFPdVWN/KW6AkHbzTJaVE\""
    }',
    '{ 
      "testing": "working", 
      "queryParam": "Hello"
    }'
  ),
  (
    '1234567891',
    'BASKET001',
    'BASKET001/Bearer/token2',
    'POST',
    '{
      "host": "localhost:3000",
      "connection": "keep-alive",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"16-XNh242oFPdVWN/KW6AkHbzTJaVE\""
    }',
    '{ 
      "testing": "working", 
      "queryParam": "Hello"
    }'
  ),
  (
    '1234567892',
    'BASKET002',
    'BASKET002/Bearer/token3',
    'PUT',
    '{
      "host": "localhost:3000",
      "connection": "keep-alive",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"16-XNh242oFPdVWN/KW6AkHbzTJaVE\""
    }',
    '{ 
      "testing": "working", 
      "queryParam": "Hello"
    }'
  ),
  (
    '1234567893',
    'BASKET002',
    'BASKET002/Bearer/token4',
    'DELETE',
    '{
      "host": "localhost:3000",
      "connection": "keep-alive",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"16-XNh242oFPdVWN/KW6AkHbzTJaVE\""
    }',
    '{ 
      "testing": "working", 
      "queryParam": "Hello"
    }'
  ),
  (
    '1234567894',
    'BASKET002',
    'BASKET002/Bearer/token5',
    'PATCH',
    '{
      "host": "localhost:3000",
      "connection": "keep-alive",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"16-XNh242oFPdVWN/KW6AkHbzTJaVE\""
    }',
    '{ 
      "testing": "working", 
      "queryParam": "Hello"
    }'
  ),
  (
    '1234567895',
    'BASKET001',
    'BASKET001/Bearer/token6',
    'GET',
    '{
      "host": "localhost:3000",
      "connection": "keep-alive",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"16-XNh242oFPdVWN/KW6AkHbzTJaVE\""
    }',
    '{ 
      "testing": "working", 
      "queryParam": "Hello"
    }'
  );

-- Commit the transaction to save changes
COMMIT;