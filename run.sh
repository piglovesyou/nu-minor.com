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
PLOVR_REMOTE_DIR=http://plovr.googlecode.com/files/
PLOVR_JAR=plovr-eba786b34df9.jar
PLOVR_JAR_PATH=${PLOVR_DIR}${PLOVR_JAR}

CLOSURELIBRARY_DIR=${LIBS_DIR}closure-library/
CLOSURELIBRARY_REMOTE_DIR=http://closure-library.googlecode.com/svn/trunk/

CLOSURETEMPLATE_DIR=${LIBS_DIR}closure-template/
CLOSURETEMPLATE_REMOTE_DIR=http://closure-templates.googlecode.com/svn/trunk/

CLOSURESTYLESHEETS_JAR=closure-stylesheets-20111230.jar
CLOSURESTYLESHEETS_DIR=${LIBS_DIR}closure-stylesheets/
CLOSURESTYLESHEETS_REMOTE_DIR=https://closure-stylesheets.googlecode.com/files/
CLOSURESTYLESHEETS_JAR_PATH=${CLOSURESTYLESHEETS_DIR}${CLOSURESTYLESHEETS_JAR}


case $1 in
    setup)
        mkdir ${LIBS_DIR} > /dev/null 2>&1
        PWD=`pwd`

        # Download plovr
        rm -rf ${PLOVR_DIR}
        wget -P ${PLOVR_DIR} ${PLOVR_REMOTE_DIR}${PLOVR_JAR}

        # Download Closure Library
        rm -rf ${CLOSURELIBRARY_DIR}
        cd ${LIBS_DIR}
        svn co -r 2519 ${CLOSURELIBRARY_REMOTE_DIR} closure-library
        cd ${PWD}

        # Download Closure Stylesheets
        rm -rf ${CLOSURESTYLESHEETS_DIR}
        wget -P ${CLOSURESTYLESHEETS_DIR} --no-check-certificate ${CLOSURESTYLESHEETS_REMOTE_DIR}${CLOSURESTYLESHEETS_JAR}

        ;;

    soyweb)
        java -jar ${PLOVR_JAR_PATH} soyweb --dir ./public
        ;;

    serve)
        java -jar ${PLOVR_JAR_PATH} serve plovr.json
        ;;

    build)
        java -jar ${PLOVR_JAR_PATH} build plovr.json
        ;;

    *)
        echo -e $USAGE_TEXT
        ;;
esac
