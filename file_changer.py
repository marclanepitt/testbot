import csv

results = []
with open("compliments.txt") as csvfile:
    reader = csv.reader(csvfile,delimiter='.') # change contents to floats
    for row in reader: # each row is a list
    	print(row[1])