### Offensive efficiency 

# Import
metrics <- read.csv(file.choose())
points <- read.csv(file.choose())

# Clean up
colnames(metrics) <- c('game_id', 'team_name', 'team_type', 'point', 'throw', 'break_throw', 'field', 'defense', 'division')
metrics$team_name <- as.character(metrics$team_name)
metrics$team_type <- as.character(metrics$team_type)
metrics$field <- as.character(metrics$field)
metrics$defense <- as.character(metrics$defense)
metrics$throw <- as.character(metrics$throw)
metrics$throw <- ifelse(metrics$throw=='timeout', 'time-out', metrics$throw)

# Check
table(metrics$throw)

# Create a df of points per game
game_ids <- unique(points$game_id) # create a list of game_ids
# First, create a df of possessions 
create_possessions <- function(game_id_input, team_type_input) {
  metrics_subset <- subset(metrics, metrics$game_id==game_id_input & metrics$team_type==team_type_input)
  possessions <- metrics_subset[1,]
  i = 1 # index for metrics df
  j = 2 # index for possessions df - starts at 2 because of the first init row in possessions
  while (i<=nrow(metrics_subset)) { # while there are still more rows in metrics df
    # while it's a throw
    while (metrics_subset$throw[i]=='over' | metrics_subset$throw[i]=='dish' | metrics_subset$throw[i]=='down' | metrics_subset$throw[i]=='dump' | 
           metrics_subset$throw[i]=='huck' | metrics_subset$throw[i]=='swing' | metrics_subset$throw[i]=='time-out' | metrics_subset$throw[i]=='stalled') { 
      i <- i+1 # go through rows
    }
    # no longer the same point or possession
    possessions <- rbind(possessions, metrics_subset[i,]) # add in row
    i <- i+1
    j <- j+1 # move on to the next possession
  }
  possessions <- possessions[-1,]
  return(possessions)
}
possessions <- data.frame()
for (g in game_ids) {
  win_output <- create_possessions(g, 'win_team')
  possessions <- rbind(possessions, win_output)
}
rownames(possessions) <- seq(length=nrow(possessions)) # reset row index
possessions$throw <- ifelse(possessions$throw=='callahan', 'score', possessions$throw)
points_grp <- possessions %>% group_by(game_id, point, team_name) %>% summarise(n_possessions = n(), scored=sum(throw=='score'))
points_merged <- merge(points_grp, points, by = c('game_id', 'point')) 
# Now I have a df of all points by the winning teams - and data on how many possessions it took for each point

# Isolate o points
opoints <- subset(points_merged, start_o=="win_team")
opoints_grp <- opoints %>% group_by(game_id) %>% summarise(n_opoints = n(), holds=sum(scored), single_holds=sum(n_possessions==1 & scored==1))
write.csv(opoints_grp, 'opoints.csv')
