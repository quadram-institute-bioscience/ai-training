#!/usr/bin/env python3

import sys
import csv
import random

def read_taxonomy_file(filename):
    with open(filename, 'r', newline='') as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = [row for row in reader]
    return header, rows

def collect_taxonomy_parts(rows):
    # Collect unique values for each taxonomy rank (excluding OTU name)
    taxonomy_levels = list(zip(*[row[1:] for row in rows]))
    unique_levels = [list(set(level)) for level in taxonomy_levels]
    return unique_levels

def generate_random_taxonomy(unique_levels, otu_index):
    taxonomy = [f"OTU{otu_index}"]
    for level in unique_levels:
        taxonomy.append(random.choice(level))
    return taxonomy

def expand_taxonomy(inputfile, total_otus):
    header, rows = read_taxonomy_file(inputfile)
    existing_otus = len(rows)

    if total_otus <= existing_otus:
        print(f"Requested {total_otus}, but input already contains {existing_otus} OTUs. No expansion needed.")
        return

    unique_levels = collect_taxonomy_parts(rows)

    print(",".join(header))
    for row in rows:
        print(",".join(row))

    for i in range(existing_otus + 1, total_otus + 1):
        new_row = generate_random_taxonomy(unique_levels, i)
        print(",".join(new_row))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: expand_tax.py inputfile totalotus")
        sys.exit(1)

    inputfile = sys.argv[1]
    try:
        total_otus = int(sys.argv[2])
    except ValueError:
        print("Error: totalotus must be an integer.")
        sys.exit(1)

    expand_taxonomy(inputfile, total_otus)
