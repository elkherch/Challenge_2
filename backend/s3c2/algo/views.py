from django.http import JsonResponse
from django.shortcuts import render
import geopy
from geopy.distance import geodesic

from django.views.decorators.csrf import csrf_exempt

import openpyxl
import networkx as nx

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser
import openpyxl
def index(request):
    return render(request, 'index.html')
@api_view(['POST'])
def upload_and_read_excel(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded.'}, status=400)
    
    excel_file = request.FILES['file']

    cities=read_cities_from_excel(excel_file)
    
    return JsonResponse({'cities': cities})

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
            key = f"{city1}:{city2}"
            dist = geopy.distance.geodesic(cities[city1], cities[city2]).km
            distances[key] = dist
    return distances, city_names

def solve_tsp_approximation(distances, city_names):
    # Create a complete graph
    G = nx.Graph()
    for city1 in city_names:
        for city2 in city_names:
            if city1 != city2:
                # Adjust how you access distances to match the new key format
                distance_key = f"{city1}:{city2}"
                if distance_key in distances:
                    G.add_edge(city1, city2, weight=distances[distance_key])
    
    # Generate a Minimum Spanning Tree
    mst = nx.minimum_spanning_tree(G)
    
    # Preorder traversal of the MST to get an approximate path
    approximate_path = list(nx.dfs_preorder_nodes(mst, source=city_names[0]))
    # Adding the start node to the end to complete the cycle
    approximate_path.append(approximate_path[0])
    
    # Calculate the total distance of the approximate path
    total_distance = 0
    for i in range(len(approximate_path) - 1):
        distance_key = f"{approximate_path[i]}:{approximate_path[i+1]}"
        total_distance += distances[distance_key]
    
    return approximate_path, total_distance

@csrf_exempt
@api_view(['POST'])
def calculate_distances(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        cities = data.get('cities')
        distances, city_names = calculate_distance_matrix(cities)
        
        return JsonResponse({'distances': distances, 'city_names': city_names})
    else:
        return JsonResponse({"error":"method not valide"},status=400)

@csrf_exempt
@api_view(['POST'])
def tsp_solution(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        cities = data.get('cities')
        distances, city_names = calculate_distance_matrix(cities)
        path, total_distance = solve_tsp_approximation(distances, city_names)
        return JsonResponse({'path': path, 'total_distance': total_distance})
    else:
        return JsonResponse({"error":"method not valide"},status=400)
import  numpy as np
import networkx as nx

class AntSystemNetworkX:
    def __init__(self, distance_matrix, num_ants, alpha=1, beta=2, rho=0.5, Q=100, max_iter=100):
        self.distance_matrix = distance_matrix
        self.num_ants = num_ants
        self.alpha = alpha
        self.beta = beta
        self.rho = rho
        self.Q = Q
        self.max_iter = max_iter
        self.num_cities = len(distance_matrix)
        self.G = nx.complete_graph(self.num_cities)
        self.pheromone_matrix = np.ones((self.num_cities, self.num_cities))
        np.fill_diagonal(self.pheromone_matrix, 0)  
    

    def run(self):
        shortest_distance = float('inf')
        best_route = None

        for _ in range(self.max_iter):
            routes = self._construct_solutions()
            self._update_pheromones(routes)

            current_best_route, current_shortest_distance = self._find_best_route(routes)
            if current_shortest_distance < shortest_distance:
                best_route = current_best_route
                shortest_distance = current_shortest_distance

        return best_route, shortest_distance

    def _construct_solutions(self):
        routes = []
        for ant in range(self.num_ants):
            route = self._construct_route()
            routes.append(route)
        return routes

    def _construct_route(self):
        visited = [False] * self.num_cities
        start_city = np.random.randint(self.num_cities)
        route = [start_city]
        visited[start_city] = True

        while len(route) < self.num_cities:
            next_city = self._select_next_city(route, visited)
            route.append(next_city)
            visited[next_city] = True
        route.append(start_city)
        visited[start_city] = True

        return route

    def _select_next_city(self, route, visited):
        last_city = route[-1]
        unvisited_cities = [i for i, v in enumerate(visited) if not v]

        probabilities = [self._calculate_probability(last_city, city) for city in unvisited_cities]

        # Normalize probabilities so that they sum up to 1
        total_probability = sum(probabilities)
        probabilities = [p / total_probability for p in probabilities]

        selected_city = np.random.choice(unvisited_cities, p=probabilities)
        return selected_city

    def _calculate_probability(self, i, j):
        pheromone = self.pheromone_matrix[i][j]
        distance = self.distance_matrix[i][j]
        
        # Avoid division by zero
        if distance == 0:
            return 0
        
        visibility = 1 / distance
        numerator = (pheromone ** self.alpha) * (visibility ** self.beta)
        
        denominator_sum = sum((self.pheromone_matrix[i][k] ** self.alpha) * (1 / max(self.distance_matrix[i][k], 0.0001)) ** self.beta for k in range(self.num_cities))
        
        # Avoid division by zero
        if denominator_sum == 0:
            return 0
        
        return numerator / denominator_sum




    def _update_pheromones(self, routes):
        evaporation = 1 - self.rho
        delta_pheromones = np.zeros((self.num_cities, self.num_cities))

        for route in routes:
            route_distance = sum(self.distance_matrix[route[i]][route[i+1]] for i in range(len(route)-1))
            for i in range(len(route)-1):
                delta_pheromones[route[i]][route[i+1]] += self.Q / route_distance
            delta_pheromones[route[-1]][route[0]] += self.Q / route_distance
        self.pheromone_matrix = (evaporation * self.pheromone_matrix) + delta_pheromones

    def _find_best_route(self, routes):
        best_route = None
        shortest_distance = float('inf')

        for route in routes:
            route_distance = sum(self.distance_matrix[route[i]][route[i+1]] for i in range(len(route)-1))
            if route_distance < shortest_distance:
                best_route = route
                shortest_distance = route_distance

        return best_route, shortest_distance
@csrf_exempt
@api_view(['POST'])
def ant_system_solution(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        cities = data.get('cities')
        
        distances, city_names = calculate_distance_matrix(cities)
        
        distance_matrix = np.zeros((len(city_names), len(city_names)))
        for i, city1 in enumerate(city_names):
            for j, city2 in enumerate(city_names):
                if i != j:
                    distance_matrix[i][j] = distances[f"{city1}:{city2}"]
        
        ant_system = AntSystemNetworkX(distance_matrix, num_ants=len(city_names))
        best_route, shortest_distance = ant_system.run()
        
        # Convert indices of cities back to city names
        best_route_cities = [city_names[idx] for idx in best_route]
        
        return JsonResponse({'path': best_route_cities, 'total_distance': shortest_distance})
    else:
        return JsonResponse({"error":"Method not allowed"}, status=405)
