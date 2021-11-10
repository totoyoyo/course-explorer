import sqlite3

# Get a connection to the database
connection = sqlite3.connect('friction.sqlite')

# Get a cursor to execute sql statements
cursor = connection.cursor()

def sql(str):
    cursor.execute(str)
    return cursor.fetchall()

def close_connection():
    connection.close()