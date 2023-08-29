---
id: aws-concept-fundamentals
title: AWS Fundamentals
sidebar_label: Fundamentals
sidebar_position: 101
tags:
  - AWS
---

This note is based on [Adrian Cantrill's AWS Course](https://learn.cantrill.io/)

## AWS Global Infrastructure

[AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/) consists of two main parts: regions and edge network locations.

### Region

A region is an area that has a deployment of AWS infrastructure.
Most services of AWS are region-separated.
This means an EC2 in US East (N. Virginia) `us-east-1` is separate from US East (Ohio) `us-east-2`.
`us-east-1` is a region code, and "US East (N. Virginia)" is a region name; both refer to the same region.

Some services, such as [IAM](./services/iam.md) and Route 53 are global, and it doesn't belong in any region.
In the AWS console, you can select the region of the service it is available in. If the selection says global, then that particular service is a global service.

Here is a list of [AWS services available by region](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)

By deploying services in different regions, we can achieve:

- Geographic separation - Isolated fault domain
- Geopolitical location - Different governance. Data from one region doesn't leave it unless we specify it.
- Location control for performance

A region consists of multiple availability zones.

#### Availability Zone

Availability Zones (AZ) are isolated infrastructures within the region.
This is usually seen as one availability zone having one datacenter mapped to it.
However, it is not always strictly one data center, but it is safe to assume that geographically, each data center in an AZ is close, and faults in one data center impact the others in the AZ.

AZs in the same region are connected by high-speed low-latency networking. Services such as [VPC](./services/vpc.md) can connect resources in different AZs within the same region.

### Edge location

There is far more edge location compared to regions.
The term edge refers to a property of which it is closer to the clients/end user.
As the edge location is closer to the user, contents stored in it are accessible with lower latency by the end user.

"Amazon CloudFront, Amazon Route 53, AWS Firewall Manager, AWS Shield, and AWS WAF services are provided through AWS Edge Locations."

Here is the [list of available edge locations](https://aws.amazon.com/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc)

### Service Resiliency

We can categorize AWS service resiliency into three:

- Globally resilient - Services are available in multiple regions; failure to whole regions does not impact the service. IAM and Route 53 are examples of this.
- Region resilient - Services are available in multiple AZs. AZ failure can be tolerated, but region failure impacts the service
- AZ resilient - AZ failures impact the service.

Last updated: August 29, 2023
