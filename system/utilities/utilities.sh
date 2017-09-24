function getActualPath {
    echo $(pwd)
}

function buildDockerImage {
    pathDockerFile=${1}
    tag=${2}

    docker build --tag ${tag} ${pathDockerFile}
}

function runDockerImage {
    name=${1}
    imageId=${2}

    docker run --name ${name} ${imageId}
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