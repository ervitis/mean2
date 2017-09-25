#!/usr/bin/env bash

RUN_PATH="$(cd "$(dirname "${0}")" && pwd)"

source ${RUN_PATH}/../variables/mongodb.properties
source ${RUN_PATH}/../utilities/utilities.sh

function main {
    dockerImage=$(getDockerImageByName ${DEFAULT_NAME})
    runDockerImage ${CONTAINER_NAME} \
                   ${dockerImage} \
                   ${MONGODB_PORT_IN} \
                   ${MONGODB_PORT_LISTENING}
    local result=${?}

    if [[ ${result} -gt 0 ]]; then
        # The container is created so we need to start it
        startDockerContainer ${CONTAINER_NAME} 2>/dev/null
    fi
}

main