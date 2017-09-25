#!/usr/bin/env bash

RUN_PATH="$(cd "$(dirname "${0}")" && pwd)"

source ${RUN_PATH}/../variables/mongodb.properties
source ${RUN_PATH}/../utilities/utilities.sh

function main {
    PATH_DOCKERFILE=${RUN_PATH}"/../dockerfiles/mongodb/"

    buildDockerImage ${PATH_DOCKERFILE} ${DEFAULT_TAG} ${MONGODB_PORT_LISTENING} ${MONGODB_PORT_HTTP}
}

main
