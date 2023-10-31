---
id: python-import
title: Packages, Modules, and Import
sidebar_label: Importing Modules
sidebar_position: 100
tags:
  - Python
---

## Terminology clarification

- Module - A python file. It can contain functions, classes and variables.
- Package - A collection of module. This usually means a folder in which python files reside.

Just like a Folder is just a special kind of file that contain other files, package is just a special module that contain other modules.
Therefore, referring you may see people refer to package as module.

## What happens when you import a module?

Python looks for modules to import from the variable `sys.path`.
`sys.path` is a list of directory paths.
`sys.path` by default contains the paths to python libraries (usually defined when you install python itself in case of standard library).

When you execute a python file, the directory of which the file being executed reside is also prepended to `sys.path`.
This is generally how you import other python files within the same project.

`sys.path` can be checked by with the following lines

```python title="~/Playground/test.py"
import sys

for path in sys.path:
    print(path)
```

If we execute the above python file, it will output something along these lines.

```bash
# Assuming $HOME is /Users/selubi
/Users/selubi/Playground/
/Users/selubi/.pyenv/versions/3.11.4/lib/python311.zip
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11/lib-dynload
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11/site-packages
```

You can import modules in `sys.path` with dot-seperated path of the module, and truncating to `.py` from the filename of the module.

`sys.path` is a list, and its traversed in order.
The first module found will be used even though same name module might exist in other entries.

For example, when you want to call `func()` defined at `~/Playground/scripts/function.py` from `~/Playground/main.py` you can do the following

```python title="~/Playground/main.py"
from scripts.function import func
func()
```

**Always remember that `sys.path` typically include only global library path and the parent folder of the file being executed.**

`sys.path` is just a normal python list and therefore you can append to it as with any other python list.

Understanding this should solve a lot of import problems.

## A more complex example

Consider the following directory structure

```bash title="~/Playground"
.
├── child
│   ├── childprint.py
│   └── grandkid
│       └── grandkidprint.py
├── main.py
└── parentprint.py
```

Where these are each of the files.

```python title="~/Playground/main.py"
import parentprint
import child.grandkid.grandkidprint as grandkidprint

parentprint.echo()
print("-----------------")
grandkidprint.echo()
```

```python title="~/Playground/parentprint.py"
def echo():
    print("This is an output from ~/Playground/parentprint.py")
```

```python title="~/Playground/child/childprint.py"
def echo():
    print("This an output from ~/Playground/child/childprint.py")
```

```python title="~/Playground/child/grandkid/grandkidprint.py"
import child.childprint as childprint


def echo():
    childprint.echo()
    print(
        "but it is invoked from ~/Playground/child/grandkid/grandkidprint.py\n"
    )
```

The following will happen

```bash title="~/Playground"
# Execute main.py
$ python main.py
This is an output from ~/Playground/parentprint.py
-----------------
This an output from ~/Playground/child/childprint.py
but it is invoked from ~/Playground/child/grandkid/grandkidprint.py

# Execute grandkidprint.py directly
$ python child/grandkid/grandkidprint.py
Traceback (most recent call last):
  File "/Users/selubi/Playground/child/grandkid/grandkidprint.py", line 1, in <module>
    import child.childprint as childprint
ModuleNotFoundError: No module named 'child'
```

Executing `main.py` works because `~/Playground` is added to `sys.path` when executed.
Even though the package imports `grandkidprint.py`, the runtime context is the `main.py`'s, and `child.childprint.echo()` gets resolved properly.

With the same reason, executing `grandkidprint.py` directly returns an import error.
This is because python looks for the `child` package in `sys.path` which contains `~/Playground/child/grandkid` and the default library path.
In this context, the package/module `child` doesn't exist.

## Importing modules at working directory from invocation side with `PYTHONPATH`

In this section we will attempt to execute a python file from a subfolder, while importing from the current working directory (`$PWD`).

Consider the below folder structure from the section before

```bash title="~/Playground"
.
├── child
│   ├── childprint.py
│   └── grandkid
│       └── grandkidprint.py
├── main.py
└── parentprint.py
```

We now modify the contents of `~/Playground/child/grandkid/grandkidprint.py` to show the `sys.path` and call `echo()` if it was executed directly.

```python title="~/Playground/child/grandkid/grandkidprint.py"
import sys
for path in sys.path:
    print(path)

import child.childprint as childprint

def echo():
    childprint.echo()
    print(
        "but it is invoked from ~/Playground/child/grandkid/grandkidprint.py\n"
    )

if __name__ == "__main__":
    echo()
```

If we execute it as is, as expected it will throw a `ModuleNotFoundError`:

```bash title="~/Playground"
$ python child/grandkid/grandkidprint.py
/Users/selubi/Playground/child/grandkid
/Users/selubi/.pyenv/versions/3.11.4/lib/python311.zip
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11/site-packages
Traceback (most recent call last):
  File "/Users/selubi/Playground/child/grandkid/grandkidprint.py", line 5, in <module>
    import child.childprint as childprint
ModuleNotFoundError: No module named 'child'
```

We can explicitly say that we want python to search our working directory as well for modules by setting the `PYTHONPATH` environment variable during invocation. For example:

```bash title="~/Playground"
$ PYTHONPATH=$PWD:$PYTHONPATH python child/grandkid/grandkidprint.py
/Users/selubi/Playground/child/grandkid
/Users/selubi/Playground
/Users/selubi/.pyenv/versions/3.11.4/lib/python311.zip
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11/lib-dynload
/Users/selubi/.pyenv/versions/3.11.4/lib/python3.11/site-packages
This an output from ~/Playground/child/childprint.py
but it is invoked from ~/Playground/child/grandkid/grandkidprint.py
```

As we can see, by appending to the `PYTHONPATH` variable, `/Users/selubi/Playground` was added to the `sys.path`. Because of that, in the context of `/Users/selubi/Playground`, the module `child` exist and thus imported properly.

Last updated: October 31, 2023
