---
id: network-datalink
title: Layer 2 - Data Link
sidebar_label: Layer 2 - DataLink
sidebar_position: 102
tags:
  - Network
---

## What is it?

The data link layer builds on top of layer 1, the physical layer. It handles intra-network connections.

When we think of layer 2, we think about frames being sent across devices with MAC Addresses.

A considerable advantage of layer 2 is the collision reduction due to more and smaller collision domains. With a hub, all devices share a collision domain.

With switches, if it is a half-duplex connection, each port is its collision domain.

Even better, with a modern full-duplex connection, each data direction is its collision domain. Here, collisions do not happen.

### MAC Address

In layer 2, devices have unique addresses assigned to them called MAC ( Media Access Control) addresses. MAC address is assigned to the device at a hardware level. Therefore, it is permanent.

MAC address consists of a 48-bit (6-byte address) and is typically represented as 6 pairs of hexadecimal digits such as `00:1A:2B:3C:4D:5E`.
MAC addresses are globally unique (i.e., no two devices with the same MAC address).

The first 3 bytes are called OUI (Organizationally Unique Identifier). It is an identifier assigned to the vendor of the device by IEEE. Refer to [list of OUI vendors](https://standards-oui.ieee.org/)

The last 3 bytes are the unique identifier of the device itself.

### Frames

The frame is the data structure used to communicate in the data link layer.

The structure of a frame differs based on what technology is used. For example, Wi-Fi frames are different from Ethernet frames.

There are, however, structural similarities between frames. Typically a frame includes the following components:

- Header - The frame header typically includes source and destination MAC Addresses, as well as other information for handling the frame, such as the preamble indicating the start of the frame, the length of the frame, and more.
- Payload - The actual data being transmitted. Usually, this contains data from the higher layers, such as packets of the network layer.
- Trailer - Typically, the trailer contains bits for error detection and correction.

For more specific frame specifications, refer to the standard itself, such as [Ethernet frames](https://en.wikipedia.org/wiki/Ethernet_frame) and [802.11 (Wi-Fi) frames](https://en.wikipedia.org/wiki/802.11_Frame_Types).

## Devices

Below are the majority of L2 devices:

- Network Interface Cards (NIC) - This is the same NIC as in L1. NICs provide a way for the computing device to communicate with other devices. In the specific context of L2, NICs are assigned MAC Addresses, so when other devices want to communicate with this computer, it actually sends the frame to the NIC's MAC Address.
- Switch - A network switch is the most common L2 device—more on it at [switching](#switching).
- Wireless Access Points (WAP) - A WAP bridges wired and wireless networks. They are commonly seen in Wi-Fi connections.

## Switching

A switch is an L2 device that provides unicast (sending data to a single connected target device) functionality in addition to broadcast (sending data to all target devices) functionality, as seen in hubs.

To do this, switches maintain a MAC address table, A list of what MAC address is physically connected to a port on the switch.

At first, the switch does not know what MAC address is connected to it. When a packet is sent through the switch, it reads the source MAC Address from the frame header and registers it to the table.

The switch will then look at the destination MAC address, find out which port the destination MAC address is from the table, and sends the data.

If the destination MAC address does not exist in the table, the switch forwards the frame to all ports except the incoming port. Later, when the intended recipient eventually responds, the switch learns the MAC address from the source MAC address header.

Switches can also broadcast frames like a hub broadcasts data. If we send a frame with the destination `FF:FF:FF:FF:FF:FF` (broadcast address), the frame will be broadcasted.

### CSMA/CD

On old switches, which still use half-duplex, use the CSMA/CD protocol to reduce collision. This protocol enables the device to see if something data transfer is happening.

If another transfer is happening, the device waits until the transfer is over and starts its own transfer after. Additionally, if a collision still occurs (usually because two devices send data at the same time), it will back off and add a random time delay before retrying.

Modern wired connections use full-duplex, so collisions itself doesn't happen. This naturally means that the need for CSMA/CD also disappears.

Last updated: August 2, 2023
