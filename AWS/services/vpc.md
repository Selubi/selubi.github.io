---
id: aws-services-vpc
title: AWS Virtual Private Cloud
sidebar_label: VPC
sidebar_position: 101
tags:
  - AWS
  - VPC
---

### Service Availability: **Region**

This note is based on [Adrian Cantrill's AWS Course](https://learn.cantrill.io/)

## What is it?

[AWS Virtual Private Cloud (VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) is a logically isolated section/network where we can put resources in.
VPCs are regional services, and it is private unless configured otherwise.

There are two types of VPC: default and custom.
Each AWS account has a Default VPC created automatically in each region.

Although it is best practice to use custom VPC in deployment, it is advisable not to delete the default VPC and leave it alone as some services may break if we delete the default VPC.

## Default VPC

Default VPC is automatically created for each region when an AWS account is created.
This default VPC in each region can be deleted and recreated, although it is advisable not to do so and leave it alone.

Default VPC has the following properties:

- Only one per region (or zero if deleted)
- CIDR is always `172.31.0.0/16`
- Each AZ has one `/20` assigned to it
- Internet Gateway (IGW), Security Group (SG), and Network Access Control List (NACL) are configured by default. It allows outbound traffic and denies inbound traffic by default.
- Instances launched in subnets are assigned public IPv4 addresses by default; however, this is configurable during instance launch.

Last updated: August 29, 2023
