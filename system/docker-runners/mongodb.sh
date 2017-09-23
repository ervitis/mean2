#!/usr/bin/env bash

source ../variables/mongodb.properties
source ../utilities/utilities.sh

function main {
    dockerImage=$(getDockerImageByName ${DEFAULT_NAME})
    runDockerImage ${CONTAINER_NAME} ${dockerImage}
}

main