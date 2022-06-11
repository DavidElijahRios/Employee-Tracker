INSERT INTO department (name)
VALUES
    ("Clinical"),
    ("Engineering"),
    ("Sales"),
    ("Finance"),
    

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Software Engineer", 132000.00, 001),
    ("Optometrist", 144000.00, 002),
    ("Manager", 65000.00, 003),
    ("Optometric Technician", 35000.00, 004),
    ("Optician", 52000.00, 005),
    ("Insurance coder", 45000.00, 006),
    ("Accountant", 68000.00, 007),
    ("Graphic Designer", 58000.00, 008),



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("David", "Rios", 001, 002),
    ("Meredith", "Walton", 002),
    ("Amanda", "Eggert", 003, 002),
    ("Sammantha", "Purdy", 004, 003),
    ("Tiffany", "Tran", 005, 003),
    ("Mariella", "Virtual", 006, 003),
    ("Holly", "Smith", 007, 003),
    ("Flor", "Ambriz", 008, 002),