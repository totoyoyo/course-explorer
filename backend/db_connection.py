import sqlite3

# Get a connection to the database
connection = sqlite3.connect('db/friction.sqlite')

# Get a cursor to execute sql statements
cursor = connection.cursor()

# Test connection
# select all data from queue_visits
sql = 'SELECT * FROM queue_visits'
cursor.execute(sql)
# fetch and display the data
rows = cursor.fetchall()

for row in rows:
    print(row)

# close connection
connection.close()