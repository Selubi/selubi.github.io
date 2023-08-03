---
id: network-datalink
title: Layer 3 - Network
sidebar_label: Layer 3 - Network
sidebar_position: 103
tags:
  - Network
---

## What is it?

The network layer is built on top of L2, the data link layer. It handles inter-network communication.

The most common protocol for L3 is the Internet Protocol (IP), and the most common device in L3 is the router. The IP protocol uses packets as its data structure. Packets are sent between devices via IP addresses, and routers are the one who routes the packet to its destination.

## Internet Protocol (IP)

IP manages inter-network connections. It handles local network connections (such as devices within a company/home) and remote network connections (such as accessing a website via the Internet).

Currently, there are two versions of IP, IPv4 and IPv6.

### Packets

Packets are the data structure IP uses, similar to what a frame does in the data link layer. Packets consist of headers and data. Like a frame header, the packet header contains information on properly handling the packet. The packet header also includes the source and destination IP addresses.

[IPv4 Packets](https://en.wikipedia.org/wiki/Internet_Protocol_version_4#Packet_structure) and [IPv6 Packets](https://en.wikipedia.org/wiki/IPv6_packet) differ slightly in structure, but the purpose for them is similar.

### IP Addresses

IP addresses govern the addressing of networks.

#### IPv4 Addresses

An example of an IPv4 address is 192.168.1.1. It is usually represented by four numbers, each ranging from 0-255, joined by dots. Sometimes, each part of the IP address separated by a dot is called an octet. This notation is used to make it easier for humans to understand. A computer sees the IP address as a 32-bit binary number.

IP addresses may also be written with the following notation: 23.41.56.21/24. The /24 represents a subnet mask. The subnet mask is used to divide the IP address into the network part and the host part. In this example, a /24 subnet means that the IP address's first 24 bits (3 octets) represent the network part, and the remaining 8 bits (1 octet) are the host part.

Devices are considered to be on the same network when they share the same network part of the IP address. The host part of the address is assigned uniquely to each device within the network. Devices within the same network can are often referred to as being local to each other.

#### IPv6 Addresses

TODO

## Routing

Routers take the task of routing IP packets to their intended destination. Routers pass packets to another router and that other router to the next until each reaches the intended destination. This process is called packet hopping. The idea is each hop takes the packet closer to the intended destination.

### Determining the next hop

The router maintains a routing table to determine where to send the next packet. Here is an example of a routing table.

| Destination | Subnet Mask   | Next Hop      | Interface |
| ----------- | ------------- | ------------- | --------- |
| 192.168.1.0 | 255.255.255.0 | 192.168.0.128 | eth0      |
| 192.168.2.0 | 255.255.255.0 | 192.168.0.192 | eth1      |
| 10.0.0.0    | 255.0.0.0     | 10.1.1.1      | eth2      |
| 0.0.0.0     | 0.0.0.0       | 192.168.0.254 | eth0      |

If the router receives a packet intended for `192.168.1.13`, it looks at this routing table and finds two network part matches, the first and fourth. The more specific match will be chosen in the case of multiple matches. As a result, this packet will be forwarded to `192.168.0.128`. In this scenario, `192.168.0.128` is not the final destination and most likely is a router. Therefore, in that router, the same process will repeat.

### The actual hop: using the data link layer

When hopping a packet to its next destination, the router needs to use the data link layer and, subsequently, the physical layer to establish the connection. However, the router must know which MAC Address to which it should send the packet.

Let's say you want to hop a packet to `192.168.0.128` with the table above. We know that it is connected via the eth0 interface. The router will broadcast an Address Resolution Protocol (ARP) request, encapsulated in a frame, to the local network segment connected to eth0.
`192.168.0.128` will respond with its MAC address back to our router. `192.168.0.128` knows our MAC address due to the source MAC address part of the header when we requested the ARP. We now know the MAC address of `192.168.0.128`

The router can now encapsulate the packet with a frame, set its own MAC address as the source, `192.168.0.128`'s MAC address as the destination, and hand it off to layer 2. When `192.186.0.128` receives the frame, it will see that it is intended for itself, decapsulate it, and examine the packet.
If the packet is not for them, it will repeat the same encapsulation process and hop it to the next node.

A thing to note here is that generally, if an end device (not a router) receives a packet not intended for it, it will discard it.

As we can see, routers connect multiple L2 networks. A real-world example of this is the router we use for home internet. It connects our home network (an L2) and the L2 of our ISP, which consists of other routers.

Last updated: August 3, 2023
