#!/bin/sh
# Test script for Heron "Download" CGI service. like heron.cgi Use this
# when you implement heron.cgi in another server-side language like Java or PHP.
# This allows a form upload whose (vector) data is echoed back by the server.
# The server also inserts a "Content-Disposition: attachment; filename=%s" header
# such that a popup/Save as.. window is presented to the browser-user.
# The other side is "upload" where a user can upload a local file (see upload.sh).
ACTION_PARM="--data-urlencode action=download"
FILE_PARM=
MIME_PARM=
ENCODING_PARM=
HERON_CGI_URL=
OUTPUT_FILE=
CONVERTTO_PARM=
SOURCE_FORMAT_PARM=
TARGET_FORMAT_PARM=
ASSIGN_SRS_PARM=
SOURCE_SRS_PARM=
TARGET_SRS_PARM=

while test $# -gt 0
do
    case $1 in
        -i)
            FILE_PARM="--data-urlencode data@$2"
            shift
            ;;
        -mime)
            MIME_PARM="--data-urlencode mime=$2"
            shift
            ;;
        -encoding)
            ENCODING_PARM="--data-urlencode encoding=$2"
            shift
            ;;
        -url)
            HERON_CGI_URL="$2"
            shift
            ;;
        -source_format)
			SOURCE_FORMAT_PARM="-d source_format=$2"
            shift
            ;;
        -target_format)
			TARGET_FORMAT_PARM="-d target_format=$2"
            shift
            ;;
        -o)
            OUTPUT_FILE="$2"
            FILE_NAME=$(basename "$2")
			FILE_NAME_PARM="--data-urlencode filename=$FILE_NAME"
            shift
            ;;
        -assign_srs)
            ASSIGN_SRS_PARM="--data-urlencode assign_srs=$2"
            shift
            ;;
        -source_srs)
            SOURCE_SRS_PARM="--data-urlencode source_srs=$2"
            shift
            ;;
        -target_srs)
            TARGET_SRS_PARM="--data-urlencode target_srs=$2"
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
                   $CONVERTTO_PARM \
                   $SOURCE_FORMAT_PARM \
                   $TARGET_FORMAT_PARM \
                   $ASSIGN_SRS_PARM \
                   $SOURCE_SRS_PARM \
                   $TARGET_SRS_PARM \
                  $HERON_CGI_URL"
echo $CMD
$CMD

