#######################################################################
#
#
#
#######################################################################

USAGE_TEXT="\n
    ---- Usage ---- \n\n\
        \n"


LIBS_DIR=libs/

PLOVR_DIR=${LIBS_DIR}plovr/
PLOVR_REMOVE_DIR=http://plovr.googlecode.com/files/
PLOVR_JAR=plovr-eba786b34df9.jar
PLOVR_JAR_PATH=${PLOVR_DIR}${PLOVR_JAR}

CLOSURELIBRARY_DIR=${LIBS_DIR}closure-library/
CLOSURELIBRARY_REMOVE_DIR=http://closure-library.googlecode.com/svn/trunk/

CLOSURETEMPLATE_DIR=${LIBS_DIR}closure-template/
CLOSURETEMPLATE_REMOVE_DIR=http://closure-templates.googlecode.com/svn/trunk/


case $1 in
    setup)
        mkdir ${LIBS_DIR} > /dev/null 2>&1
        PWD=`pwd`

        # Download plovr
        rm -rf ${PLOVR_DIR}
        wget -P ${PLOVR_DIR} ${PLOVR_REMOVE_DIR}${PLOVR_JAR}

        # Download Closure Library
        rm -rf ${CLOSURELIBRARY_DIR}
        cd ${LIBS_DIR}
        svn co -r 2519 ${CLOSURELIBRARY_REMOVE_DIR} closure-library
        cd ${PWD}

        ;;
    soyweb)
        java -jar ${PLOVR_JAR_PATH} soyweb --dir ./public
        ;;
    serve)
        java -jar ${PLOVR_JAR_PATH} serve plovr.json
        ;;
    build)
        java -jar ${PLOVR_JAR_PATH} build plovr.json > ./public/javascripts/main-min.js
        ;;
    *)
        echo -e $USAGE_TEXT
        ;;
esac
