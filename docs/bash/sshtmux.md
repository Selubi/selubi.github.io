---
id: bash-sshtmux
title: Tmux over SSH
sidebar_label: Tmux over SSH
sidebar_position: 101
tags:
  - bash
---

This is a function, intended to be appended to your shell profile of the ssh client (your laptop, step server) that wraps around ssh.

It opens an SSH connection, attaches a tmux session if it exists, or creates a new one.

The benefit of doing it this way instead of invoking tmux from the shell profile of the ssh host is that when we detach or exit the tmux session, the SSH session also closes.

When we detach, the SSH connection closed but we can reattach the tmux session when we reconnect.

Refer to [iTerm2](#iterm2) instead if you want to use [iTerm2 and tmux Integration](https://gitlab.com/gnachman/iterm2/-/wikis/TmuxIntegration).

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

    echo "Executing ssh -tA $@ \"tmux new -A -s main\""
    command ssh -tA $@ "tmux new -A -s main"
}
```

## iTerm2

Similar to the above, we just pass `-CC` in the tmux command as below

```bash
# Override ssh to automatically execute tmux
function ssh() {
    echo "The ssh command is being wrapped to execute tmux. Refer to your shell profile."
    if [ "$#" -lt 1 ]; then
        echo "usage: ssh [options] destination"
        # Print the original usage guide of ssh
        echo "original ssh usage:"
        command ssh
        return 1
    fi

    echo "Executing ssh -tA $@ \"tmux -CC new -A -s main\""
    command ssh -tA $@ "tmux -CC new -A -s main"
}
```

It is also highly recommended to [set tmux windows to open in the attaching window, and bury the tmux client session](https://gitlab.com/gnachman/iterm2/-/wikis/tmux-Integration-Best-Practices#what-other-settings-are-relevant)

Resource: [Official tmux Integration Best Practices](https://gitlab.com/gnachman/iterm2/-/wikis/tmux-Integration-Best-Practices)

### Potential trouble

#### Session window not burying, ssh seemingly hangs

If you are in a local tmux window and try to open a tmux window this way remotely, it might seem that it hangs.
For me, by not using tmux locally and only using it remotely with this fixes the issue.

Generally, I don't have anything important running locally, but I do remotely, so this current setup works well for me.

#### Clashes with existing tmux configurations

If some weird behavior happens, it might worth to try to do `command ssh -tA $@ "tmux -CC -f /dev/null new -A -s main"` instead to ignore any existing configs on the remote server.

Last updated: January 10, 2024
