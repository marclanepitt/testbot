import csv

results = []
with open("shittalk.csv") as csvfile:
    reader = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) # change contents to floats
    for row in reader: # each row is a list
    	row[0] = row[0][4:]
        results.append(row[0])
print(results)
