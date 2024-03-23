from django.shortcuts import render
import geopy
import openpyxl
from itertools import permutations as nx
# Create your views here.
def read_cities_from_excel(excel_path):
    wb = openpyxl.load_workbook(excel_path)
    sheet = wb.active
    cities = {}
    for row in sheet.iter_rows(min_row=2, values_only=True):
        city_name, latitude, longitude = row
        cities[city_name] = (latitude, longitude)
    return cities;
def calculate_distance_matrix(cities):
    city_names = list(cities.keys())
    distances = {}
    for city1 in city_names:
        for city2 in city_names:
            if city1 == city2:
                continue
            dist = geopy.distance.geodesic(cities[city1], cities[city2]).km
            distances[(city1, city2)] = dist
    return distances, city_names
# Function to solve TSP using a simple brute force approach (use for small datasets)
def solve_tsp_approximation(distances, city_names):
    # Create a complete graph
    G = nx.Graph()
    for city1 in city_names: 
        for city2 in city_names:
            if city1 != city2:
                G.add_edge(city1, city2, weight=distances[(city1, city2)])
    
    # Generate a Minimum Spanning Tree
    mst = nx.minimum_spanning_tree(G)
    
    # Preorder traversal of the MST to get an approximate path
    approximate_path = list(nx.dfs_preorder_nodes(mst, source=city_names[0]))
    # Adding the start node to the end to complete the cycle
    approximate_path.append(approximate_path[0])
    
    # Calculate the total distance of the approximate path
    total_distance = sum(distances[(approximate_path[i], approximate_path[i + 1])] for i in range(len(approximate_path) - 1))
    
    return approximate_path, total_distance