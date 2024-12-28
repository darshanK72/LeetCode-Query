create database leetcode_query

CREATE TABLE Problem (
    Id INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier with auto increment
    Ac_Rate FLOAT,                   -- Acceptance rate
    Difficulty VARCHAR(20),          -- Difficulty
    Title VARCHAR(255),              -- Problem title
    Title_Slug VARCHAR(255)          -- Title Slug
);

CREATE TABLE Tags (
    Id INT IDENTITY(1,1) PRIMARY KEY, -- Unique identifier with auto increment
    Name VARCHAR(255) NOT NULL,      -- Name of the tag
    Slug VARCHAR(255) NOT NULL,      -- Slug for the tag
    CONSTRAINT UQ_Tags_Name_Slug UNIQUE (Name, Slug) -- Ensure unique name-slug pairs
);

INSERT INTO tags (name, slug) VALUES
('Array', 'array'),
('String', 'string'),
('Hash Table', 'hash-table'),
('Dynamic Programming', 'dynamic-programming'),
('Math', 'math'),
('Sorting', 'sorting'),
('Greedy', 'greedy'),
('Depth-First Search', 'depth-first-search'),
('Database', 'database'),
('Binary Search', 'binary-search'),
('Matrix', 'matrix'),
('Tree', 'tree'),
('Breadth-First Search', 'breadth-first-search'),
('Bit Manipulation', 'bit-manipulation'),
('Two Pointers', 'two-pointers'),
('Prefix Sum', 'prefix-sum'),
('Heap (Priority Queue)', 'heap-priority-queue'),
('Binary Tree', 'binary-tree'),
('Simulation', 'simulation'),
('Stack', 'stack'),
('Graph', 'graph'),
('Counting', 'counting'),
('Sliding Window', 'sliding-window'),
('Design', 'design'),
('Backtracking', 'backtracking'),
('Enumeration', 'enumeration'),
('Union Find', 'union-find'),
('Linked List', 'linked-list'),
('Number Theory', 'number-theory'),
('Ordered Set', 'ordered-set'),
('Monotonic Stack', 'monotonic-stack'),
('Trie', 'trie'),
('Segment Tree', 'segment-tree'),
('Bitmask', 'bitmask'),
('Queue', 'queue'),
('Divide and Conquer', 'divide-and-conquer'),
('Recursion', 'recursion'),
('Combinatorics', 'combinatorics'),
('Binary Indexed Tree', 'binary-indexed-tree'),
('Geometry', 'geometry'),
('Binary Search Tree', 'binary-search-tree'),
('Hash Function', 'hash-function'),
('Memoization', 'memoization'),
('String Matching', 'string-matching'),
('Topological Sort', 'topological-sort'),
('Shortest Path', 'shortest-path'),
('Rolling Hash', 'rolling-hash'),
('Game Theory', 'game-theory'),
('Interactive', 'interactive'),
('Data Stream', 'data-stream'),
('Monotonic Queue', 'monotonic-queue'),
('Brainteaser', 'brainteaser'),
('Randomized', 'randomized'),
('Merge Sort', 'merge-sort'),
('Doubly-Linked List', 'doubly-linked-list'),
('Counting Sort', 'counting-sort'),
('Iterator', 'iterator'),
('Concurrency', 'concurrency'),
('Probability and Statistics', 'probability-and-statistics'),
('Quickselect', 'quickselect'),
('Suffix Array', 'suffix-array'),
('Bucket Sort', 'bucket-sort'),
('Minimum Spanning Tree', 'minimum-spanning-tree'),
('Shell', 'shell'),
('Line Sweep', 'line-sweep'),
('Reservoir Sampling', 'reservoir-sampling'),
('Strongly Connected Component', 'strongly-connected-component'),
('Eulerian Circuit', 'eulerian-circuit'),
('Radix Sort', 'radix-sort'),
('Rejection Sampling', 'rejection-sampling'),
('Biconnected Component', 'biconnected-component');


CREATE TABLE Problem_Tags (
    Problem_Id INT NOT NULL,           -- Foreign key to dsa_problems
    Tag_Id INT NOT NULL,               -- Foreign key to tags
    PRIMARY KEY (Problem_Id, Tag_Id),  -- Composite primary key
    FOREIGN KEY (Problem_Id) REFERENCES Problem(Id) ON DELETE CASCADE,
    FOREIGN KEY (Tag_Id) REFERENCES Tags(Id) ON DELETE CASCADE
);



select * from tags
order by 1
