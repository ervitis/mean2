function getActualPath {
    echo $(pwd)
}

function buildDockerImage {
    pathDockerFile=${1}
    tag=${2}
    mongodbPortListening=${3}
    mongodbPortHttp=${4}

    docker build \
        --tag ${tag} \
        --build-arg MONGODB_PORT_LISTENING=${mongodbPortListening} \
        --build-arg MONGODB_PORT_HTTP=${mongodbPortHttp} \
        ${pathDockerFile}
}

function runDockerImage {
    name=${1}
    imageId=${2}
    portIn=${3}
    portListening=${4}

    docker run --name ${name} -p ${portIn}:${portListening} -P ${imageId}
}

function startDockerContainer {
    containerName=${1}

    docker start ${containerName}
}

function getDockerImageByName {
    nameImage=$1

    echo $(docker images ${nameImage} | tail -1 | awk -F ' ' '{print $3}')
}

function getDockerContainerByName {
    nameContainer=$1

    echo $(docker ps | grep "${nameContainer}" | tail -1 | awk -F ' ' '{print $1}')
}