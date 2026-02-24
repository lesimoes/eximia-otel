CREATE TABLE users (
  "userId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE transactions (
  "transactionId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES users("userId"),
  value DECIMAL(15, 2) NOT NULL
);

INSERT INTO users (email) VALUES
  ('alice@example.com'),
  ('bob@example.com');

INSERT INTO transactions ("userId", value)
SELECT "userId", 100.00 FROM users WHERE email = 'alice@example.com'
UNION ALL
SELECT "userId", -50.00 FROM users WHERE email = 'alice@example.com'
UNION ALL
SELECT "userId", 200.00 FROM users WHERE email = 'bob@example.com';
