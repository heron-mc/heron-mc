#!/bin/sh

#!/bin/sh

ACTION_PARM="-F action=upload"
FILE_PARM=
MIME_PARM=
ENCODING_PARM=
HERON_CGI_URL=
OUTPUT_FILE=
ASSIGN_SRS_PARM=
SOURCE_SRS_PARM=
TARGET_SRS_PARM=

while test $# -gt 0
do
    case $1 in
        -i)
            FILE_PARM="-F file=@$2"
            shift
            ;;
        -mime)
            MIME_PARM="-F mime=$2"
            shift
            ;;
        -encoding)
            ENCODING_PARM="-F encoding=$2"
            shift
            ;;
        -url)
            HERON_CGI_URL="$2"
            shift
            ;;
        -o)
            OUTPUT_FILE="$2"
            shift
            ;;
        -assign_srs)
            ASSIGN_SRS_PARM="-F assign_srs=$2"
            shift
            ;;
        -source_srs)
            SOURCE_SRS_PARM="-F source_srs=$2"
            shift
            ;;
        -target_srs)
            TARGET_SRS_PARM="-F target_srs=$2"
            shift
            ;;
        *)
            echo >&2 "Invalid argument: $1"
            ;;
    esac
    shift
done

CMD="curl -v -o $OUTPUT_FILE -XPOST \
                   $ACTION_PARM \
                   $FILE_PARM \
                   $FILE_NAME_PARM \
                   $MIME_PARM \
                   $ENCODING_PARM \
                   $ASSIGN_SRS_PARM \
                   $SOURCE_SRS_PARM \
                   $TARGET_SRS_PARM \
                   $HERON_CGI_URL"
echo $CMD
$CMD
