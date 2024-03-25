from django.http import JsonResponse,HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import geopy
from geopy.distance import geodesic
from rest_framework.response import Response
from openai import OpenAI
from django.views.decorators.http import require_http_methods

import openai
from django.views.decorators.csrf import csrf_exempt
import os
import openpyxl
import networkx as nx

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser
def index(request):
    return render(request, 'index.html')

def initialize_openai_chatbot(api_key):
    openai.api_key = api_key
import numpy as np
import math
import random
import matplotlib
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import string
import time
from itertools import chain
from typing import Any, Callable, List, Tuple, Union
import numpy as np
import random


class AntColonySolver:
    def __init__(self,
                 cost_fn: Callable[[Any,Any], Union[float,int]] = None,

                 time=0,                  # run for a fixed amount of time
                 min_time=0,              # minimum runtime
                 timeout=0,               # maximum time in seconds to run for
                 stop_factor=2,           # how many times to redouble effort after new new best path
                 min_round_trips=4,       # minimum number of round trips before stopping
                 max_round_trips=0,       # maximum number of round trips before stopping
                 min_ants=0,              # Total number of ants to use
                 max_ants=0,              # Total number of ants to use

                 ant_count=1024,          # this is close to the optimal number for numpy performance
                 ant_speed=1,             # how many steps do ants travel per epoch

                 distance_power=1,        # power to which distance affects pheromones
                 pheromone_power=1.25,    # power to which differences in pheromones are noticed
                 decay_power=0,           # how fast do pheromones decay
                 reward_power=0,          # relative pheromone reward based on best_path_length/path_length
                 best_path_smell=2,       # queen multiplier for pheromones upon finding a new best path
                 start_smell=0,           # amount of starting pheromones [0 defaults to `10**self.distance_power`]

                 verbose=False,

    ):
        self.cost_fn         = cost_fn or self.distance
        self.time            = int(time)
        self.min_time        = int(min_time)
        self.timeout         = int(timeout)
        self.stop_factor     = float(stop_factor)
        self.min_round_trips = int(min_round_trips)
        self.max_round_trips = int(max_round_trips)
        self.min_ants        = int(min_ants)
        self.max_ants        = int(max_ants)

        self.ant_count       = int(ant_count)
        self.ant_speed       = int(ant_speed)

        self.distance_power  = float(distance_power)
        self.pheromone_power = float(pheromone_power)
        self.decay_power     = float(decay_power)
        self.reward_power    = float(reward_power)
        self.best_path_smell = float(best_path_smell)
        self.start_smell     = float(start_smell or 10**self.distance_power)

        self.verbose         = int(verbose)
        self._initalized     = False

        if self.min_round_trips and self.max_round_trips: self.min_round_trips = min(self.min_round_trips, self.max_round_trips)
        if self.min_ants and self.max_ants:               self.min_ants        = min(self.min_ants, self.max_ants)


    @staticmethod
    def distance(xy1, xy2) -> float:
        if isinstance(xy1[0], str): xy1 = xy1[1]; xy2 = xy2[1];               # if xy1 == ("Name", (x,y))
        return math.sqrt( (xy1[0]-xy2[0])**2 + (xy1[1]-xy2[1])**2 )

    @staticmethod
    def path_distance(path) -> int:
        if isinstance(path, dict):      path = list(path.values())            # if path == {"Name": (x,y)}
        if isinstance(path[0][0], str): path = [ item[1] for item in path ]   # if path == ("Name", (x,y))
        return int(sum(
            [ distance(path[i],  path[i+1]) for i in range(len(path)-1) ]
          + [ distance(path[-1], path[0]) ]                                   # include cost of return journey
        ))

    @staticmethod
    def calculate_total_distance(route) -> int:
        total_distance = sum(distance(route[i][1], route[i+1][1]) for i in range(len(route) - 1))
        # Include the distance from the last city back to the starting city
        total_distance += distance(route[-1][1], route[0][1])
        return int(total_distance)



    def solve_initialize(
            self,
            problem_path: List[Any],
    ) -> None:
        ### Cache of distances between nodes
        self.distances = {
            source: {
                dest: self.cost_fn(source, dest)
                for dest in problem_path
            }
            for source in problem_path
        }

        ### Cache of distance costs between nodes - division in a tight loop is expensive
        self.distance_cost = {
            source: {
                dest: 1 / (1 + self.distances[source][dest]) ** self.distance_power
                for dest in problem_path
            }
            for source in problem_path
        }

        ### This stores the pheromone trail that slowly builds up
        self.pheromones = {
            source: {
                # Encourage the ants to start exploring in all directions and furthest nodes
                dest: self.start_smell
                for dest in problem_path
            }
            for source in problem_path
        }

        ### Heuristic Exports
        self.ants_used   = 0
        self.epochs_used = 0
        self.round_trips = 0

        self._initalized = True


    def solve(self,
              problem_path: List[Any],
              restart=False,
    ) -> List[Tuple[int,int]]:

        if restart or not self._initalized:
            self.solve_initialize(problem_path)

        ### Reset Heuristics
        self.ants_used   = 0
        self.epochs_used = 0
        self.round_trips = 0

        ### Sanitise input parameters
        if self.ant_count <= 0:
            self.ant_count = len(problem_path)
        if self.ant_speed <= 0:
            self.ant_speed = np.median(list(chain(*[ d.values() for d in self.distances.values() ]))) // 5
        self.ant_speed = int(max(1,self.ant_speed))

        ### Here come the ants!
        ants = {
            "distance":    np.zeros((self.ant_count,)).astype('int32'),
            "path":        [ [ problem_path[0] ]   for n in range(self.ant_count) ],
            "remaining":   [ set(problem_path[1:]) for n in range(self.ant_count) ],
            "path_cost":   np.zeros((self.ant_count,)).astype('int32'),
            "round_trips": np.zeros((self.ant_count,)).astype('int32'),
        }

        best_path       = None
        best_path_cost  = np.inf
        best_epochs     = []
        epoch           = 0
        time_start      = time.perf_counter()
        while True:
            epoch += 1

            ### Vectorized walking of ants
            # Small optimization here, testing against `> self.ant_speed` rather than `> 0`
            #       avoids computing ants_arriving in the main part of this tight loop
            ants_travelling = (ants['distance'] > self.ant_speed)
            ants['distance'][ ants_travelling ] -= self.ant_speed
            if all(ants_travelling):
                continue  # skip termination checks until the next ant arrives

            ### Vectorized checking of ants arriving
            ants_arriving       = np.invert(ants_travelling)
            ants_arriving_index = np.where(ants_arriving)[0]
            for i in ants_arriving_index:

                ### ant has arrived at next_node
                this_node = ants['path'][i][-1]
                next_node = self.next_node(ants, i)
                ants['distance'][i]  = self.distances[ this_node ][ next_node ]
                ants['remaining'][i] = ants['remaining'][i] - {this_node}
                ants['path_cost'][i] = ants['path_cost'][i] + ants['distance'][i]
                ants['path'][i].append( next_node )

                ### ant has returned home to the colony
                if not ants['remaining'][i] and ants['path'][i][0] == ants['path'][i][-1]:
                    self.ants_used  += 1
                    self.round_trips = max(self.round_trips, ants["round_trips"][i] + 1)

                    ### We have found a new best path - inform the Queen
                    was_best_path = False
                    if ants['path_cost'][i] < best_path_cost:
                        was_best_path  = True
                        best_path_cost = ants['path_cost'][i]
                        best_path      = ants['path'][i]
                        best_epochs   += [ epoch ]
                        if self.verbose:
                            print({
                                "path_cost":   int(ants['path_cost'][i]),
                                "ants_used":   self.ants_used,
                                "epoch":       epoch,
                                "round_trips": ants['round_trips'][i] + 1,
                                "clock":       int(time.perf_counter() - time_start),
                            })

             
                    reward = 1
                    if self.reward_power: reward *= ((best_path_cost / ants['path_cost'][i]) ** self.reward_power)
                    if self.decay_power:  reward *= (self.round_trips ** self.decay_power)
                    for path_index in range( len(ants['path'][i]) - 1 ):
                        this_node = ants['path'][i][path_index]
                        next_node = ants['path'][i][path_index+1]
                        self.pheromones[this_node][next_node] += reward
                        self.pheromones[next_node][this_node] += reward
                        if was_best_path:
                            # Queen orders to double the number of ants following this new best path
                            self.pheromones[this_node][next_node] *= self.best_path_smell
                            self.pheromones[next_node][this_node] *= self.best_path_smell


                    ### reset ant
                    ants["distance"][i]     = 0
                    ants["path"][i]         = [ problem_path[0] ]
                    ants["remaining"][i]    = set(problem_path[1:])
                    ants["path_cost"][i]    = 0
                    ants["round_trips"][i] += 1


            ### Do we terminate?

            # Always wait for at least 1 solutions (note: 2+ solutions are not guaranteed)
            if not len(best_epochs): continue

            # Timer takes priority over other constraints
            if self.time or self.min_time or self.timeout:
                clock = time.perf_counter() - time_start
                if self.time:
                    if clock > self.time: break
                    else:                 continue
                if self.min_time and clock < self.min_time: continue
                if self.timeout  and clock > self.timeout:  break

            # First epoch only has start smell - question: how many epochs are required for a reasonable result?
            if self.min_round_trips and self.round_trips <  self.min_round_trips: continue
            if self.max_round_trips and self.round_trips >= self.max_round_trips: break

            # This factor is most closely tied to computational power
            if self.min_ants and self.ants_used <  self.min_ants: continue
            if self.max_ants and self.ants_used >= self.max_ants: break

            # Lets keep redoubling our efforts until we can't find anything more
            if self.stop_factor and epoch > (best_epochs[-1] * self.stop_factor): break

            # Nothing else is stopping us: Queen orders the ants to continue!
            if True: continue



        ### We have (hopefully) found a near-optimal path, report back to the Queen
        self.epochs_used = epoch
        self.round_trips = np.max(ants["round_trips"])
        return best_path


    def next_node(self, ants, index):
        this_node   = ants['path'][index][-1]

        weights     = []
        weights_sum = 0
        if not ants['remaining'][index]: return ants['path'][index][0]  # return home
        for next_node in ants['remaining'][index]:
            if next_node == this_node: continue
            reward = (
                    self.pheromones[this_node][next_node] ** self.pheromone_power
                    * self.distance_cost[this_node][next_node]  # Prefer shorter paths
            )
            weights.append( (reward, next_node) )
            weights_sum   += reward

        # Pick a random path in proportion to the weight of the pheromone
        rand = random.random() * weights_sum
        for (weight, next_node) in weights:
            if rand > weight: rand -= weight
            else:             break
        return next_node


def AntColonyRunner(cities, verbose=False, plot=False, label={}, algorithm=AntColonySolver, **kwargs):
    solver     = algorithm(cost_fn=distance, verbose=verbose, **kwargs)
    start_time = time.perf_counter()
    result     = solver.solve(cities)
    stop_time  = time.perf_counter()
    if label: kwargs = { **label, **kwargs }

    solver = AntColonySolver(verbose=verbose)

    best_path = solver.solve(cities)
    
    total_distance = solver.calculate_total_distance(best_path)

    if verbose:
        print(f"Shortest distance: {total_distance} km")
        print(f"Best route: {best_path}")

    # for key in ['verbose', 'plot', 'animate', 'label', 'min_time', 'max_time']:
    #     if key in kwargs: del kwargs[key]
    # print("N={:<3d} | {:5.0f} -> {:4.0f} | {:4.0f}s | ants: {:5d} | trips: {:2d} | "
    #       .format(len(cities), path_distance(cities), path_distance(result), (stop_time - start_time), solver.ants_used, solver.round_trips)
    #       + " ".join([ f"{k}={v}" for k,v in kwargs.items() ])
    # )
    # if plot:
    #     show_path(result)
    return total_distance, best_path




distance      = AntColonySolver.distance
path_distance = AntColonySolver.path_distance


from typing import Dict
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors
from itertools import chain, product, combinations
class KmeansAntColonySolver(AntColonySolver):
    def __init__(self,
                 animate: Callable=None,

                 cluster_factor=1.05,           # Multiple for subdividng the problem
                 random_factor=1,               # Greate random subgroups - this doesn't work
                 distance_power_multiple=1.5,   # Increase distance_power before final solve
                 intercity_merge=0,             # For each pair of clusters, find a loop between the N nearest neighbours of each
                 intercity_loop=0,              # Construct loops between clusters using N nearest neighbours for each cluster
                 intercity_random=0,            # Construct loops between random members of each cluster

                 start_smell=2,
                 start_smell_normalization=0.5,
                 min_round_trips=2,
                 max_round_trips=0,             # performance shortcut
                 best_path_smell=1.25,          # 2*1 + 1.25*0.5 work best
                 best_path_smell_multiple=0.5,  # Increase best_path_smell before final solve
                 min_clusters=2,
                 min_cluster_size=3,

                 **kwargs
    ):
        self.min_clusters         = min_clusters
        self.min_cluster_size     = min_cluster_size


        self.animate              = animate
        self.intercity_merge      = intercity_merge
        self.intercity_loop       = intercity_loop
        self.intercity_random     = intercity_random
        self.cluster_factor       = cluster_factor
        self.random_factor        = random_factor
        self.distance_power_multiple   = distance_power_multiple
        self.best_path_smell_multiple  = best_path_smell_multiple
        self.start_smell_normalization = start_smell_normalization


        self.kwargs = {
            "start_smell":     start_smell,
            "min_round_trips": min_round_trips,
            "max_round_trips": max_round_trips,
            "best_path_smell": best_path_smell,
            **kwargs
        }
        super().__init__(**self.kwargs)


    def get_numeric_path(self, problem_path: List[Any]) -> List[Tuple[int,int]]:
        # KMeans requires: List[Tuple[int,int]]
        numeric_path = list(problem_path)
        try:
            if isinstance(numeric_path, dict):      numeric_path = list(numeric_path.values())            # if path == {"Name": (x,y)}
            if isinstance(numeric_path[0][0], str): numeric_path = [ item[1] for item in numeric_path ]   # if path == ("Name", (x,y))
        except: pass
        return numeric_path


    def group_by_random(self, problem_path: List[Any], n_clusters) -> Dict[int, List[Any]]:
            clusters = [
                random.sample(problem_path, math.ceil(len(problem_path) / n_clusters) )
                for n in range(int(n_clusters))
            ]
            return clusters


    def group_by_kmeans(self, problem_path: List[Any], n_clusters) -> Dict[int, List[Any]]:
            if n_clusters == 1: return [ problem_path ]

            # Group the cities into KMeans cluster groups of increasing size
            numeric_path = self.get_numeric_path(problem_path)
            cluster_ids  = KMeans(n_clusters=n_clusters).fit_predict(numeric_path)
            clusters = [
                list({ problem_path[n] for n in range(len(problem_path)) if cluster_ids[n] == cluster_id })
                for cluster_id in np.unique(cluster_ids)
            ]
            return clusters


    def centroid(self, problem_path: List[Tuple[Any]]) -> Tuple[int,int]:
        numeric_path = self.get_numeric_path(problem_path)
        return tuple(np.median(numeric_path, axis=0))

    # Returns the two nearest neighbours to the centeroid for each cluster
    def nearest_neighbors(self, clusters: List[List[Any]], n_neighbors=2) -> List[List[Any]]:
        center_point = self.centroid(chain(*clusters))
        clusters_of_nearest = []
        for cluster in clusters:
            numeric_path   = self.get_numeric_path(cluster)
            nn             = NearestNeighbors(n_neighbors).fit(numeric_path)
            dist, indicies = nn.kneighbors([center_point])  # inputs and outputs are both arrays
            clusters_of_nearest.append([ cluster[i] for i in indicies[0] ])
        return clusters_of_nearest


    def normalize_pheromones(self, norm: float=None):
        norm   = norm or self.start_smell
        mean   = np.mean(list(chain(*[ d.values() for d in self.pheromones.values() ])))
        weight = norm / mean
        for source in self.pheromones.keys():
            for dest in self.pheromones.keys():
                self.pheromones[source][dest] *= norm
                self.pheromones[source][dest] += norm * self.start_smell_normalization


    def solve(self,
              problem_path: List[Any],
              restart=True,
    ) -> List[Tuple[int,int]]:
        # Initialize the Solver - preserve the pheromone trail between runs
        self.solve_initialize(problem_path)

        # Break the Travelling Salesman problem down into local clusters of nodes, as detected by KMeans
        # Iteratively decrease the number of clusters, until we are back at the starting problem

        n_clusters = int( len(problem_path) / ( self.cluster_factor * self.random_factor ) )
        random_clusters = self.group_by_random(problem_path, self.random_factor)

        results_plot = {}
        while n_clusters > self.min_clusters:

            results_plot[n_clusters] = []
            results_plot[f"{n_clusters}_loop"]  = []
            results_plot[f"{n_clusters}_merge"] = []

            for random_cluster in random_clusters:
                kmeans_clusters = self.group_by_kmeans(random_cluster, int(n_clusters))
                kmeans_clusters = [ cluster for cluster in kmeans_clusters if len(cluster) >= self.min_cluster_size ]

                # Break the map down into kmeans subclusters and create a heuristic pheromone trail
                for kmeans_cluster in kmeans_clusters:
                    if len(kmeans_cluster) < self.min_cluster_size: continue
                    results = self.solve_subproblem(kmeans_cluster, restart=False)
                    results_plot[n_clusters] += [ results ]

                if len(kmeans_clusters) <= 1: continue  # Can't do intercity with a single cluster

                # Construct a loop between clusters, using the N closest members to the centeroid from each cluster
                if self.intercity_loop:
                    intercity = self.nearest_neighbors(kmeans_clusters, self.intercity_loop)
                    intercity = list(chain(*intercity))
                    results   = self.solve_subproblem(intercity, restart=False)
                    results_plot[f"{n_clusters}_loop"] += [ results ]

                if self.intercity_random:
                    intercity = [ random.sample(cluster, max(self.intercity_random, len(cluster)-1)) for cluster in kmeans_clusters ]
                    intercity = list(chain(*intercity))
                    results   = self.solve_subproblem(intercity, restart=False)
                    results_plot[f"{n_clusters}_loop"] += [ results ]

                # For each pair of clusters, find the optimal path to join them using their N nearest neighbours
                if self.intercity_merge:
                    for clusters in combinations(kmeans_clusters, 2):
                        intercity = self.nearest_neighbors(clusters, self.intercity_merge)
                        intercity = list(chain(*intercity))
                        results   = self.solve_subproblem(intercity, restart=False)
                        results_plot[f"{n_clusters}_merge"] += [ results ]


            # self.normalize_pheromones()
            n_clusters = int( (n_clusters) // ( self.cluster_factor * self.random_factor ) )

        # Display the growth of clusters
        

        # Now solve the original problem
        for key, value in self.kwargs.items():
            if hasattr(self, key): setattr(self, key, value)

        self.normalize_pheromones()
        self.distance_power  *= self.distance_power_multiple
        self.best_path_smell *= self.best_path_smell_multiple
        self.round_trips = 0
        self.ant_count   = 4 * len(problem_path)
        #self.min_ants    = self.ants_used + len(problem_path) ** 2 / 2
        self.max_ants    = self.ants_used + len(problem_path) ** 2 * 2
        result = super().solve(problem_path)

        if callable(self.animate):
            # plt.figure()
            self.animate(result)

        return result


    def solve_subproblem(self,
              problem_path: List[Any],
              restart=True,
    ) -> List[Tuple[int,int]]:
        verbose = self.verbose
        self.round_trips = 0
        self.ant_count   = 4 * len(problem_path)
        #self.min_ants    = 0 # len(problem_path) ** 2 / 2
        #self.max_ants    = 0 # self.ants_used + len(problem_path) ** 2

        time_start    = time.perf_counter()
        self.verbose  = False
        result        = super().solve(problem_path, restart=False)
        # self.normalize_pheromones_path(problem_path, 10000)
        self.verbose  = verbose
        if self.verbose:
            print(
                f'solve({len(problem_path)})', path_distance(problem_path), '->', path_distance(result),
                { "ant_count": self.ant_count, "ants_used": self.ants_used, "round_trips": self.round_trips,  "time": round(time.perf_counter() - time_start, 1) }
             )
        return result





def KmeansAntColonyRunner(cities, animate=False, **kwargs):
    """
    Runs the ant colony solver with an optional K-means clustering enhancement.
    :param cities: The cities or points for the ant colony to solve.
    :param animate: A boolean indicating whether to animate the pathfinding.
    :param kwargs: Additional keyword arguments for configuration.
    :return: The result from the Ant Colony Runner, typically a path or solution.
    """
    # Update the kwargs with specific configurations
    kwargs.update({
        "algorithm": KmeansAntColonySolver,  # Specify the algorithm to use
        # Other specific algorithm configurations can be added here
    })

    # If animation is requested, modify the kwargs accordingly
    if animate:
        kwargs.update({
            "animate": True,  # Ensure the animate option is set to True in kwargs
            # Additional animation-specific configurations can go here
        })

    # Execute the ant colony algorithm with the provided cities and configurations
    return AntColonyRunner(cities, **kwargs)
c = [
    ("Aïoun", (16.8366893287323, -9.27583480330441)),
    ("Akjoujt", (19.9420143167071, -14.6440193516613)),
    ("Aleg", (17.1728009990846, -13.9023810848904)),
    ("Atar", (20.6190971368345, -13.4188043441809)),
    ("Kaédi", (16.0455219912174, -13.1873050779235)),
    ("Kiffa", (16.678771880566, -11.4111923888962)),
    ("Néma", (16.3926143684381, -7.34328812930029)),
    ("Nouadhibou", (21.0200766331283, -15.9151199295992)),
    ("Nouakchott", (18.0783994226296, -15.885155269477)),
    ("Rosso", (16.6264755333439, -15.6941505288147)),
    ("Sélibaby", (15.4729996284158, -12.1965786387684)),
    ("Tidjikja", (18.6315729894793, -11.5524434053275)),
    ("Zoueratt", (23.4958870003132, -10.1376367144798)),
    ("Adel Bagrou", (15.777110526156, -6.67675230545682)),
    ("Amourj", (15.7729728553603, -7.37091423643246)),
    ("Aoujeft", (19.4184509680169, -13.060785774459)),
    ("Arafat", (18.050476, -15.9580543123123)),
    ("Bababé", (16.4852720675491, -13.9241247333335)),
    ("Barkéol", (16.6751124071314, -12.3991903380487)),
    ("Bassiknou", (16.0501564070982, -6.01154050647926)),
    ("Bennechab", (19.3530037323343, -15.3224034274247)),
    ("Bir Moghrein", (25.6582202666742, -8.66829739348436)),
    ("Boghé", (16.670922402766, -14.4061446258428)),
    ("Boumdeid", (17.7827046083815, -11.2722471937061)),
    ("Boutilimit", (18.1369336584647, -14.1193843326365)),
    ("Chami", (19.6331114605043, -16.4883891371054)),
    ("Chinguitti", (20.1657568787497, -10.3961176356604)),
    ("Dar Naïm", (18.0783994226296, -15.885155269477)),
    ("Djiguenni", (15.931241489269, -8.73373374618077)),
    ("El Mina", (18.0539479806214, -15.9569886032454)),
    ("F'Deirick", (22.6555897775708, -12.7864363579804)),
    ("Ghabou", (15.3526009000657, -12.491989847739)),
    ("Guerou", (16.886033457674, -11.9970392826645)),
    ("Kankoussa", (15.8155101212945, -11.1243624228058)),
    ("Keur Macène", (16.6481629446986, -16.2380715659807)),
    ("Koubenni", (15.8810177989499, -9.44679210630746)),
    ("Ksar", (18.0759095628086, -16.0205979614608)),
    ("Lexeiba", (16.2264551, -13.1398876)),
    ("M'Bagne", (16.2669049225824, -13.7808228609031)),
    ("M'Bout", (16.0458397534298, -12.5257739402154)),
    ("Maghama", (15.54229228636, -12.8503711933997)),
    ("Magtalahjar", (17.7374432436965, -12.9366786681538)),
    ("Male", (16.7891254973091, -13.339957843615)),
    ("Mederdra", (17.1292440228788, -15.7305745387385)),
    ("Monguel", (16.4547434782446, -12.973608131229)),
    ("Moudjeria", (17.8312555690455, -12.1452876614686)),
    ("N'beiket Lahwach", (17.6303249056768, -6.17096602097312)),
    ("Nouadhibou", (21.0200766331283, -15.9151199295992)),
    ("Ouad Naga", (18.2313375450054, -15.3552955267554)),
    ("Ouadane", (21.8839605148634, -8.74801953331454)),
    ("Oualata", (19.1103349267417, -7.23951167244725)),
    ("Ould Yengé", (15.6792341348242, -11.8852789596282)),
    ("R'Kiz", (17.0497048049145, -15.0388179256894)),
    ("Riyad", (17.9666550985718, -15.911298584619)),
    ("Rosso", (16.6264755333439, -15.6941505288147)),
    ("Sebkha", (18.1358804287456, -15.9660172677971)),
    ("Sélibaby", (15.4729996284158, -12.1965786387684)),
    ("Tamcheket", (17.0938844721679, -10.4569615551753)),
    ("Tekane", (16.7716589355234, -15.1409551685359)),
    ("Tevragh Zeina", (18.285112189561, -16.0015389922396)),
    ("Teyaret", (18.2992176900707, -15.9199108542987))
    
]

N = 32
result = KmeansAntColonyRunner(c, verbose=True, animate=True, cluster_factor=2)

@csrf_exempt
@require_http_methods(["POST"])
@api_view(['POST'])
def run_ant_colony_solver(request):
    try:
        data = request.data
        cities = data['cities']  # Assuming cities is a key in your data
        cluster_factor = int(data.get('cluster_factor', 2))  # Convert to int
        verbose = data.get('verbose', True)
        animate = data.get('animate', True)
        result = KmeansAntColonyRunner(cities, verbose=verbose, animate=animate, cluster_factor=cluster_factor)
        
        return Response({
            'status': 'success',
            'data': result
        })
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=400)

@csrf_exempt
@require_http_methods(["POST"])
@api_view(['POST'])
def ask_about_algorithms(request):
    try:
        data = request.data
        question = data.get('question')
        # cities = data.get('cities')

        if not question :
            return HttpResponse({'error': 'No question provided'}, status=400)
        
        # city_names = list(cities.keys())
        # city_coordinates = {city: (cities[city]['latitude'], cities[city]['longitude']) for city in city_names}

        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return HttpResponse({'error': 'OpenAI API key not found in environment variables'}, status=500)

        client = OpenAI(api_key=api_key)

       
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question},
            {"role": "assistant", "content":  f"""As an AI expert, explain '{question}' in the context of approximation algorithms, ant colony algorithms, or the traveling salesman problem."""
}
        ]
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0
        )

        response_message = response.choices[0].message.content


        if any(keyword in response_message.lower() for keyword in ["algorithm", "salesman", "approximation", "ant colony algorithm", "aco"]):
            # Inject city coordinates into the response
            # response_message += f"\n\nCity Coordinates:\n{city_coordinates}"
            return JsonResponse({'response': response_message.strip()})
        else:
            return JsonResponse({'response': "Sorry, I am not programmed to answer this type of question."})
    except Exception as e:
      return HttpResponse({'error': str(e)}, status=500)
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
    city_list = []  # Initialize a list to store city names
    for row in sheet.iter_rows(min_row=2, values_only=True):
        city_name, latitude, longitude = row
        cities[city_name] = (latitude, longitude)
        city_list.append(city_name)  # Append city name to the list
    return cities, city_list

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

def solve_tsp_approximation(distances, city_names,star):
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
    approximate_path = list(nx.dfs_preorder_nodes(mst, source=star))
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
        start_city = data.get('start_city')
        
        if start_city not in cities:
            return JsonResponse({'error': 'Start city is not in the list of cities.'}, status=400)
        
        distances, city_names = calculate_distance_matrix(cities)
        
        # Assurez-vous que la ville de départ est le premier élément de `city_names` pour la prise en compte dans l'itinéraire
        if start_city in city_names:
            city_names.insert(0, city_names.pop(city_names.index(start_city)))
        
        path, total_distance = solve_tsp_approximation(distances, city_names,start_city)
        return JsonResponse({'path': path, 'total_distance': total_distance})
    else:
        return JsonResponse({"error":"Method not valid"}, status=400)
import  numpy as np
import networkx as nx

class AntSystemNetworkX:
    def _init_(self, distance_matrix, num_ants, alpha=1, beta=2, rho=0.5, Q=100, max_iter=100):
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
        start_city = data.get('start_city')

        if start_city and start_city not in cities:
            return JsonResponse({'error': 'Start city is not in the list of cities.'}, status=400)

        distances, city_names = calculate_distance_matrix(cities)
        
        if start_city:
            # Déplacer la ville de départ au début de la liste des noms des villes
            start_index = city_names.index(start_city)
            city_names.insert(0, city_names.pop(start_index))
            
            # Créer une nouvelle matrice de distance qui reflète l'ordre mis à jour des villes
            new_distances = {}
            for i, city1 in enumerate(city_names):
                for j, city2 in enumerate(city_names):
                    if city1 != city2:
                        key = f"{city1}:{city2}"
                        new_distances[key] = distances[key]

            # Réorganiser la matrice de distance pour correspondre à l'ordre mis à jour des villes
            distance_matrix = np.zeros((len(city_names), len(city_names)))
            for i, city1 in enumerate(city_names):
                for j, city2 in enumerate(city_names):
                    if i != j:
                        distance_key = f"{city1}:{city2}"
                        distance_matrix[i][j] = new_distances[distance_key]

        else:
            # Construire la matrice de distance sans réorganisation si aucune ville de départ n'est spécifiée
            distance_matrix = np.zeros((len(city_names), len(city_names)))
            for i, city1 in enumerate(city_names):
                for j, city2 in enumerate(city_names):
                    if i != j:
                        distance_key = f"{city1}:{city2}"
                        distance_matrix[i][j] = distances[distance_key]

        ant_system = AntSystemNetworkX(distance_matrix, num_ants=len(city_names))
        best_route, shortest_distance = ant_system.run()
        starting_city_index = city_names.index(start_city)
        # Reorder the route so that it starts from the specified starting city
        best_route = best_route[starting_city_index:] + best_route[:starting_city_index]
        
        
        # Convertir les indices des villes en noms de villes
        best_route_cities = [city_names[idx] for idx in best_route]

        return JsonResponse({'path': best_route_cities, 'total_distance': shortest_distance})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
