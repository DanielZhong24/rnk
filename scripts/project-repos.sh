#!/bin/zsh
# project-repos.sh - Mapping of project names to GitHub repositories
# This file is sourced by generate-project-images.sh

typeset -A PROJECT_REPOS

# Assign values to the associative array.
# Note the syntax: key followed by value, separated by spaces within the ()
PROJECT_REPOS=(
    "sorenako" "https://github.com/DanielZhong24/SORenako"
    "anitag" "https://github.com/DanielZhong24/AniTag"
    "YUEats" "https://github.com/DanielZhong24/YUEats"
    "Music-signout" "https://github.com/DanielZhong24/Music-signout"
    "dreamerz" "https://github.com/DanielZhong24/dreamerz"
    "rnk" "https://github.com/DanielZhong24/rnk"
    "renako-catan-manager" "https://github.com/DanielZhong24/renako-catan-manager"
    "hatchloom-user-service" "https://github.com/DanielZhong24/hatchloom-user-service"
    "ootduck" "https://github.com/DanielZhong24/OOTDuck"
    "akihi" "https://github.com/DanielZhong24/akihi"
)

