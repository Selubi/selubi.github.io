---
id: bash-multilogging
title: Multi-Location Logging
sidebar_label: Multi-Location Logging
---

```bash
SYSLOG_TAG="mytest"
LOG_FILE_LOCATION="/tmp/mytest.log"
log_message() {
    # Output messages to syslog, $LOG_FILE_LOCATION and stderr
    local msg
    if [ $# -eq 0 ]; then
        msg=$(cat) # Reads from stdin
    else
        msg="$*" # or from argument (Higher Priority)
    fi

    logger -s -t "$SYSLOG_TAG" -- "$msg" 2>&1 | tee -a "$LOG_FILE_LOCATION" >&2
}

log_message "Use it like this"
echo "or like this" | log_message

# Fancier use case
mixed_msg() {
    echo "You can log stderr with log_messege" >&2
    echo "without affecting stdout"
}

process_stdin_separately() {
    read line
    echo "$line at all"
}

msg=$(mixed_msg 2> >(log_message) | process_stdin_separately)
echo $msg # => without affecting stdout at all
```

Notice that `log_message` only outputs `stderr`. If `log_message` outputs `stdout`, that output is also piped to `process_stdin_separately`.

Last updated: October 11, 2023
