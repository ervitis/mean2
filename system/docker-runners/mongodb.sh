#!/usr/bin/env bash

RUN_PATH="$(cd "$(dirname "${0}")" && pwd)"

source ${RUN_PATH}/../variables/mongodb.properties
source ${RUN_PATH}/../utilities/utilities.sh

function main {
    dockerImage=$(getDockerImageByName ${DEFAULT_NAME})
    runDockerImage ${CONTAINER_NAME} \
                   ${dockerImage} \
                   ${MONGODB_PORT_IN} \
                   ${MONGODB_PORT_LISTENING} 2>/dev/null
    local result=${?}

    if [[ ${result} -gt 0 ]]; then
        # if the container is not running and
        # the container is created so we need to start it
        result=$(getDockerContainerByName ${CONTAINER_NAME})
        if [[ -z ${result} ]]; then
            startDockerContainer ${CONTAINER_NAME} &> /dev/null
        fi
    fi
}

main