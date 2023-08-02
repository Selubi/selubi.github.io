---
id: network-physical
title: Layer 1 - Physical
sidebar_label: Layer 1 - Physical
sidebar_position: 101
tags:
  - Network
---

## What is it?

The physical layer, or layer 1, is the OSI model's lowest layer.

The specifications of physical layers define the transmission and reception of unstructured data (bitstreams) between devices (Network Interface Card, Hubs) and physical transmission mediums (such as copper, fiber, or radio frequencies).

The specification may include pins, connectors, distances, voltages, timings, wave frequencies, etc.

What the standard defines naturally depends on what kind of device and physical medium.

Some overarching standards such as USB, Bluetooth, and Ethernet include physical layer specifications.

## Duplexing

The duplexing of a channel refers to the ability of a communication channel to transmit and receive data.

- Simplex - In a simplex channel, communication only happens one way. An example of this is a TV broadcast.
- Half Duplex - In a half-duplex channel, communication can go both ways but not simultaneously. An example of this is a Wi-Fi connection. A device (e.g., your phone) can transmit data to and receive data from the access point. But it cannot happen at the same time.
- Full Duplex - In a full-duplex channel, communication can go simultaneously in either direction. An example of this is an ethernet connection. Ethernet cables have different pairs of wires within the ethernet cable that are each dedicated to sending and receiving data.

## Layer 1 devices

These are a few examples of layer 1 devices.

- Network Interface Card (NIC) - An interface between a computing device and a physical network medium. While it is not strictly a layer 1 device, it is one of the primary ways a computer connects to a network. An example of a NIC is the NVIDIA ConnectX series. RJ45 and SFP (and its derivatives) are common connectors for a NIC.
- Hub - A layer 1 device that receives incoming data packets on a port and broadcasts it to all other ports. Switches mostly replaced them.
- Modem - A device that converts digital data to analog data. ONU is a modem-like device used to convert digital to light signal and vice versa, often used in modern residential fiber optic internet.
- Repeater - A device whose job is to amplify and regenerate the signal it receives. It is used for long-distance connections.

Last updated: August 2, 2023
