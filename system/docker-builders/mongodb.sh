#!/usr/bin/env bash

source ../variables/mongodb.properties
source ../utilities/utilities.sh

function main {
    PATH_DOCKERFILE=$(getActualPath)"/../dockerfiles/mongodb/"

    buildDockerImage ${PATH_DOCKERFILE} ${DEFAULT_TAG}
}

main
