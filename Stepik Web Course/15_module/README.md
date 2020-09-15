1. `SHOW DATABASES;` (у второй номер генерируется при перезапуске задания):

    ```
    Query result:
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | stepik_hgP1gMPG    |
    +--------------------+
    Affected rows: 2
    ```
2. `show tables;`

    ```
    +---------------------------+
    | Tables_in_stepik_fJDO0146 |
    +---------------------------+
    | USERS                     |
    | USERS123                  |
    | USERS234                  |
    | users123                  |
    +---------------------------+
    Affected rows: 4
    ```

3. `SELECT * FROM USERS234;`

    ```
    +----+----------+------+-------+
    | id | username | pass | admin |
    +----+----------+------+-------+
    | 1  | sergey   | 1234 | 0     |
    | 2  | admin    | 3211 | 1     |
    +----+----------+------+-------+
    Affected rows: 2
    ```

4. `SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'USERS234' AND  COLUMN_NAME = 'pass'`

5. ``UPDATE USERS234 SET pass = '1111' WHERE id = 2;``