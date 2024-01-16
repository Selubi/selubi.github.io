---
id: python-json
title: Handling JSON
sidebar_label: Handling JSON
sidebar_position: 100
tags:
  - Python
---

## JSON to Python type mapping

Reference: https://json-schema.org/understanding-json-schema/reference/type

| JSON    | Python    |
| ------- | --------- |
| string  | string    |
| number  | int/float |
| object  | dict      |
| array   | list      |
| boolean | bool      |
| null    | none      |

## Reading and writing JSON

We can use the standard library module [`json`](https://docs.python.org/3/library/json.html) to handle JSON in python.

We will use the data from [JSON Placeholder](https://jsonplaceholder.typicode.com/) for this demo.

### From string

#### Read

```python
import json
user_json_str = """{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}"""

user = json.loads(user_json_str)

print(f"1. {user=}")
print(f"2. {type(user)=}")
```

Outputs:

```
1. user={'id': 1, 'name': 'Leanne Graham', 'username': 'Bret', 'email': 'Sincere@april.biz', 'address': {'street': 'Kulas Light', 'suite': 'Apt. 556', 'city': 'Gwenborough', 'zipcode': '92998-3874', 'geo': {'lat': '-37.3159', 'lng': '81.1496'}}, 'phone': '1-770-736-8031 x56442', 'website': 'hildegard.org', 'company': {'name': 'Romaguera-Crona', 'catchPhrase': 'Multi-layered client-server neural-net', 'bs': 'harness real-time e-markets'}}
2. type(user)=<class 'dict'>
```

#### Write

```python
import json
user_dict = {"id": 25, "name": "foobar"}

user_json = json.dumps(user_dict)

print(f"1. {user_json=}")
print(f"2. {type(user_json)=}")
```

Outputs:

```
1. user_json='{"id": 25, "name": "foobar"}'
2. type(user_json)=<class 'str'>
```

:::Note
JSON can only contain string as keys.
While some types such as `int` will be attempted to be converted, it is good practice to make sure
the underlying data type is JSON compliant in the first place.

The example below does not run.

```python
import json

user_dict = {"id": 25, ("First", "Name"): "foobar"}

user_json = json.dumps(user_dict)

print(f"1. {user_json=}")
print(f"2. {type(user_json)=}")
```

Outputs:

```
Traceback (most recent call last):
  File "/Users/bryan.gregorius/Playground/main.py", line 101, in <module>
    user_json = json.dumps(user_dict)
                ^^^^^^^^^^^^^^^^^^^^^
  File "/Users/bryan.gregorius/.pyenv/versions/3.11.4/lib/python3.11/json/__init__.py", line 231, in dumps
    return _default_encoder.encode(obj)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/bryan.gregorius/.pyenv/versions/3.11.4/lib/python3.11/json/encoder.py", line 200, in encode
    chunks = self.iterencode(o, _one_shot=True)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/bryan.gregorius/.pyenv/versions/3.11.4/lib/python3.11/json/encoder.py", line 258, in iterencode
    return _iterencode(o, 0)
           ^^^^^^^^^^^^^^^^^
TypeError: keys must be str, int, float, bool or None, not tuple
```

:::
