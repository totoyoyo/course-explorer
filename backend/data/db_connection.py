import sqlite3
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

# Get a connection to the database
connection = sqlite3.connect(dir_path + '/friction.sqlite')

# Get a cursor to execute sql statements
cursor = connection.cursor()

def sql(str):
    cursor.execute(str)
    return cursor.fetchall()

def close_connection():
    connection.close()