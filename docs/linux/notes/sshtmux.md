---
id: linux-notes-sshtmux
title: Tmux over SSH
sidebar_label: Tmux over SSH
sidebar_position: 101
tags:
  - Linux
---

This is a function, intended to be appended to your shell profile of the ssh client (your laptop, step server) that wraps around ssh.
It opens an SSH connection, attaches a tmux session if it exists, or creates a new one.
The benefit of doing it this way instead of invoking tmux from the shell profile of the ssh host is that when we detach or exit the tmux session, the SSH session also closes.
When we detach, the SSH connection closed but we can reattach the tmux session when we reconnect.

```bash
# Override ssh to automatically execute tmux
function ssh() {
    echo "The ssh command is being wrapped to execute tmux. Refer to your shell profile."
    if [ "$#" -lt 1 ]; then
        echo "usage: ssh destination [options]"
        # Print the original usage guide of ssh
        echo "original ssh usage:"
        command ssh
        return 1
    fi

    local host="$1"
    shift
    echo "Executing ssh $@ -t $host \"tmux has-session && tmux attach || tmux\""
    command ssh "$@" -t "$host" "tmux has-session && tmux attach || tmux"
}
```

Last updated: September 13, 2023
