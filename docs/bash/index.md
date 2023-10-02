---
id: bash
title: Shell Scripting Snippets and Gotchas
sidebar_label: bash
---

## Snippets

### Multi-location logging

```bash
#!/bin/bash
LOG_FILE_LOCATION="/tmp/mytest.log"
log_message() {
    # Output messages to syslog, $LOG_FILE_LOCATION and stderr
    if [ $# -eq 0 ]; then
        cat | logger -s -- 2>&1 | tee -a "$LOG_FILE_LOCATION" >&2 # Read from stdin
    else
        logger -s -- "$*" 2>&1 | tee -a "$LOG_FILE_LOCATION" >&2 # Or from argument
    fi
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

## Gotchas

### `local` is a command

This is a problem when doing variable assignment and manipulating exit status at once.

```bash title=problem.sh
#!/bin/bash
myfunc() {
    echo "error from myfunc"
    return 15
}

main(){
    local myvar=$(myfunc)
    echo "$?" # => 0, because the command local succeeded.

    # Fancier gotcha
    if ! local myerr=$(myfunc); then
        echo $myerr # Unreachable
    fi
}

main
```

```bash title=solution.sh
#!/bin/bash
myfunc() {
    echo "error from myfunc"
    return 15
}

main(){
    local myvar
    myvar=$(myfunc)
    echo "$?" # => 15

    # Fancier use case
    local myerr
    if ! myerr=$(myfunc); then
        echo $myerr # => error from myfunc
    fi
}

main
```

Last updated: October 2, 2023
