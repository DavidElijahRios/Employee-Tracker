INSERT INTO department (name)
VALUES
    ("Clinical"),
    ("Engineering"),
    ("Sales"),
    ("Finance")
    

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Software Engineer", 132000.00, 002),
    ("Optometrist", 144000.00, 001),
    ("Manager", 65000.00, 003),
    ("Optometric Technician", 35000.00, 001),
    ("Optician", 52000.00, 001),
    ("Insurance coder", 45000.00, 004),
    ("Accountant", 68000.00, 004),
    ("Graphic Designer", 58000.00, 002)



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Meredith", "Walton", 001, null),
    ("Amanda", "Eggert", 002, null),
    ("David", "Rios", 003, 001),
    ("Sammantha", "Purdy", 004, 002),
    ("Tiffany", "Tran", 005, 002),
    ("Mariella", "Virtual", 006, 002),
    ("Holly", "Smith", 007, 002),
    ("Flor", "Ambriz", 008, 001)