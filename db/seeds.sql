INSERT INTO department (name)
VALUES 
    ('Acquisitions'),
    ('Engineering'), 
    ('Covert Ops');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 1000000, 1),
    ('Acquisitions Manager', 333333, 1),
    ('Lead Operative', 666666666, 3),
    ('Orion', 7777777777, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('William', 'Santee', 3, NULL),
    ('John', 'Doe', 2, 1),
    ('Andy', 'Android', 1, 1),
    ('Steven', 'Bartowski', 4, NULL);

