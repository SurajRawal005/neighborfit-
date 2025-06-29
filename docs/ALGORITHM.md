# Matching Algorithm & Technical Design

## Algorithm Design
- For each user-selected preference, if the neighborhood’s lifestyle string includes that preference, add 1 to the match score.
- Sort neighborhoods by match score (highest first).

## Trade-offs & Rationale
- Simple and easy to understand.
- Not as nuanced as machine learning, but works well for small datasets.

## Scalability
- Can handle more data by using MySQL.
- For larger datasets, could add indexing or use a more advanced search.

## Data Processing Pipeline
- Data is stored in MySQL.
- Backend fetches all neighborhoods and scores them based on user preferences.