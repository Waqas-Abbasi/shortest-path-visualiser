# Shortest Path Visualiser

This visualiser allows you to visualise common path finding algorithms to find the shortest path between a starting node and an end node. This visualiser also supports maze generation algorithms. You can play around with this visualiser here: https://shortestpathvisualiser.netlify.com/

### Path Finding Algorithms

- **Breadth First Search**: Breadth First Search is an Algorithm for Unweighted Problems which explores
      all the neighbours at a certain depth before moving on to the children of those neighbours. It uses a
      Queue to keep track of the next nodes to visit.



- **Depth First Search**: Depth First Search is an Algorithm for Unweighted Problems which explores a
                  branch / path as far as possible before moving on to its neighbour. It uses a Stack to keep track of the
                  next nodes to visit.



- **Dijkstra's Algorithm**: Dijkstra's Algorithm is an Algorithm for Weighted Problems, Initially all
                  nodes have a distance of Infinity, but as nodes are explored, their cost is updated. The algorithm
                  prioritises nodes which are unvisited and have a lower cost to explore, next. In doing so, you find the
                  shortest path. Dijkstra's Algorithm uses a Priority Queue to keep track of
                  the nodes to visit. A distance from 1 cell to another is 1.



- **A\* Search Algorithm**: A* Search Algorithm is an Algorithm for Weighted Problems. Unlike other
                  algorithms, this algorithm is aware of the position of the destination and so is able to calculate the
                  cost (distance to destination) for each cell. Similar to Dijkstra's Algorithm,  A* Search Algorithm uses a Priority Queue, but uses the distance from the starting position + the distance to the destination as the heuristic.



- **Random Search Algorithm**: This Algorithm is an Unweighted Algorithm. Each neighbour has a 50%
                  chance of being chosen to be visited. Additionally to prevent cases where no node is selected, one of
                  the 4 neighbours of a node is guaranteed to be chosen.

  

### Maze Generation Algorithms

- **Recursive Division**: Recursive Division Algorithm is based on Fractal Nature. The Idea is to start
                  with a room and divide it into parts and then keep recursively dividing those parts until it can no
                  longer divide further.



- **Prim's Algorithm**: Prim's Algorithm is a Minimum Spanning Tree algorithm which if randomized can be
                  utilised for maze generation. It starts at a random point on the maze and then grows outwards. At every given point,
                  the neighbours of every visited node that have not yet been visited are kept track of. The algorithm
                  chooses one of these neighbours to visit next, randomly. Once a neighbour is chosen and visited, the neighbours
                  of the visited node are added to the neighbours list. This process happens continuously until no more unvisited
                  nodes exist. Essentially, the maze extends in a random direction each iteration.



- **Ellers's Algorithm**: Eller's Algorithm is an Algorithm that works from a row to row basis. Essentially
                      the nature of Set theory enables this algorithm to produce a complete maze. The Algorithm works on
                      one row at a time. In each iteration, if a cell in the row does not belong to a set, it is assigned
                      a set. After every cell in the row belongs to a set, based on the row size, random adjacent sets are
                      conjoined. After random sets are joined with each other (The smaller set becomes part of the bigger
                      set), at least one point from each set must extend downwards. Extending to cells without a set expands
                      the growing set. After every set is extended downwards from at least one point, the iteration is complete and the process repeats.



This project was created with React.
