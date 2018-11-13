// Convert team name ID's to strings that can be displayed
var teamNames = [{team_id: "bos_ironside", name: "Ironside"}, {team_id: "den_johnnybravo", name: "Johnny Bravo"},
                {team_id: "sf_revolver", name: "Revolver"}, {team_id: "aus_doublewide", name: "Doublewide"},
                {team_id: "ral_ringoffire", name: "Ring of Fire"}, {team_id: "dc_truckstop", name: "Truck Stop"},
                {team_id: "chi_machine", name: "Machine"}, {team_id: "sea_sockeye", name: "Sockeye"},
                {team_id: "ny_pony", name: "PoNY"},
                {team_id: "sea_mixtape", name: "Mixtape"}, {team_id: "phi_amp", name: "AMP"},
                {team_id: "bos_slowwhite", name: "Slow White"}, {team_id: "sea_bfg", name: "BFG"},
                {team_id: "sf_blackbird", name: "Blackbird"}, {team_id: "min_dragnthrust", name: "Drag'n Thrust"},
                {team_id: "ct_metronorth", name: "Metro North"}, {team_id: "sf_mischief", name: "Mischief"},
                {team_id: "sf_fury", name: "Fury"}, {team_id: "bos_brutesquad", name: "Brute Squad"},
                {team_id: "den_mollybrown", name: "Molly Brown"}, {team_id: "atl_ozone", name: "Ozone"},
                {team_id: "sea_riot", name: "Riot"}, {team_id: "col_revolution", name: "Revolution"}];

var team_ids = teamNames.map(a => a.team_id);
var teamName_convert = function(team_id) {
  var index = team_ids.indexOf(team_id);
  return teamNames[index].name;
};
