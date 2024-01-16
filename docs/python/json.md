---
id: python-json
title: Handling JSON
sidebar_label: Handling JSON
sidebar_position: 100
tags:
  - Python
  - JSON
---

## Crash Course

### JSON to Python type mapping

Reference: https://json-schema.org/understanding-json-schema/reference/type

| JSON    | Python    |
| ------- | --------- |
| string  | string    |
| number  | int/float |
| object  | dict      |
| array   | list      |
| boolean | bool      |
| null    | none      |

### Reading and writing JSON

We can use the standard library module [`json`](https://docs.python.org/3/library/json.html) to handle JSON in python.

#### Read from string

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

#### Write to string

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

:::note

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
TypeError: keys must be str, int, float, bool or None, not tuple
```

:::

## Practical Guide

### Cleaning up JSON file: Converting string numbers to actual numbers

We sometimes receive JSON files that populates numbers as string, even though its actually numbers.

Below is a generic solution to convert string numbers to actual numbers (`float`/`int`).

```python
from typing import Dict, List
import json
import requests


def clean_string_number_in_object(
    element: str | int | float | list | dict | bool | None,
) -> str | int | float | list | dict | bool | None:
    """
    This function converts every string number element to int or float, in that order.
    The output of json.loads() can immediately be passed to this function to be cleaned
    Recursively access each element if given a dictionary or list. JSON compliant.
    Ref: https://json-schema.org/understanding-json-schema/reference
    """
    if type(element) is str:  # Convert string numbers to integers
        return str_to_number(element)
    if type(element) is dict:
        return clean_string_number_in_dict(element)
    if type(element) is list:
        return clean_string_number_in_list(element)
    return element


def str_to_number(string: str) -> int | float | str:
    """
    Try to convert string number to int or float, in that order.
    Return original string if not possible."""
    number_class_precedence = [int, float]
    for number_class in number_class_precedence:
        try:
            return number_class(string)
        except ValueError:
            continue
    return string


def clean_string_number_in_dict(dictionary: Dict) -> Dict:
    """
    Returns a dict where every string number value is converted to int or float.
    Does not modify the original dict. JSON compliant.
    """
    cleaned_dict = {}
    for key, value in dictionary.items():
        cleaned_dict[key] = clean_string_number_in_object(value)
    return cleaned_dict


def clean_string_number_in_list(lst: List) -> List:
    """
    Returns a list where every string number item is converted to int or float.
    Does not modify the original list. JSON compliant.
    """
    cleaned_lst = []
    for item in lst:
        cleaned_lst.append(clean_string_number_in_object(item))
    return cleaned_lst


json_str = """{
    "id" :"21",
    "somestring": "foobar",
    "actual_int": 54,
    "geolocation": {
      "lat": "-37.3159",
      "lng": "81.1496"
    },
    "mixed_array":[
        "string_in_array",
        "22",
        22,
        {
            "string_number_in_object_in_array": "100",
            "actual_number_in_object_in_array": 200
        }
    ]
}
"""

dirty_dict_from_json = json.loads(json_str)
clean_dict_from_json = clean_string_number_in_object(dirty_dict_from_json)
print(f"1. {dirty_dict_from_json=}")
print(f"2. {clean_dict_from_json=}")
```

Outputs:

```
1. dirty_dict_from_json={'id': '21', 'somestring': 'foobar', 'actual_int': 54, 'geolocation': {'lat': '-37.3159', 'lng': '81.1496'}, 'mixed_array': ['string_in_array', '22', 22, {'string_number_in_object_in_array': '100', 'actual_number_in_object_in_array': 200}]}
2. clean_dict_from_json={'id': 21, 'somestring': 'foobar', 'actual_int': 54, 'geolocation': {'lat': -37.3159, 'lng': 81.1496}, 'mixed_array': ['string_in_array', 22, 22, {'string_number_in_object_in_array': 100, 'actual_number_in_object_in_array': 200}]}
```

Last updated: January 16, 2024
