-- dbengineer
INSERT INTO user_account (first_name, last_name, email, phone_number, password, credit) VALUES('Moshiur', 'Rahman', 'moshiur@gmail.com', '+8801234567890', '$2b$10$cA33yKydRaExhkl4lqExNeKcC1KEPdsMBWapOyBe1D7cqDKInBguS', 500);
-- backendengineer
INSERT INTO user_account (first_name, last_name, email, phone_number, password, credit) VALUES('Samin', 'Islam', 'samin@gmail.com', '+8801357924680', '$2b$10$OwzKc1IfXw4kScnUrV/wiOZIQGaaGMkj5CdOnK2vscVKBfyNG4i7G', 500);
-- frontendengineer
INSERT INTO user_account (first_name, last_name, email, phone_number, password, credit) VALUES('Arafat', 'Khan', 'arafat@gmail.com', '+8809876543210', '$2b$10$CWPzKtJI5ycddIcruIyFhOiiFEqX8APlAeBwtB8wM6nGCF2bK5arO', 500);

INSERT INTO supervisor (user_id) VALUES (2);
INSERT INTO supervisor (user_id) VALUES (3);
INSERT INTO admin (user_id) VALUES ((SELECT user_id FROM user_account WHERE email = 'samin@gmail.com'));
