INSERT INTO department (name)
VALUES 
    ('Acquisitions'),
    ('Engineering'), 
    ('Covert Ops');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 666, 1),
    ('Acquisitions Manager', 333, 1),
    ('Criminal Mastermind', 6666, 3),
    ('Orion', 66666, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('William', 'Santee', 1, NULL),
    ('John', 'Doe', 2, 1),
    ('Andy', 'Android', 3, 2),
    ('Steven', 'Bartowski', 4, NULL);

