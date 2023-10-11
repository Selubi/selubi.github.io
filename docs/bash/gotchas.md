---
id: bash-gotcha
title: Gotchas
sidebar_label: Gotchas
---

## `local` is a command

ShellCheck properly checks for this mistake ([SC2155](https://www.shellcheck.net/wiki/SC2155)).

This is a problem when doing variable assignment and manipulating exit status at once.

```bash title=problem.sh
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

Last updated: October 11, 2023
