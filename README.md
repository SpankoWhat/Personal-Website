# Personal-Website
On going project. Learning and applying what I am learning from freecodecamp.org

# Documentation
This page goes over the steps to create the website. Planning on using [[_HTML | HTML]], [[three.js]] to create some depth in the website.

# Useful Resources used:
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html#website-hosting-custom-domain-walkthrough-domain-registry
- https://victoria.dev/blog/hosting-your-static-site-with-aws-s3-route-53-and-cloudfront/

# Buying domain and hosting it on AWS
## Registering a domain
*Used AWS Route 53 to register a domain*
1. Logged in into https://console.aws.amazon.com
2. Navigated to https://console.aws.amazon.com/route53/home#DomainRegistration
3. Choose a name: itspanko.com
4. Payed 12 USD
5. Since I used amazons domain they will manage the Route 53 configurations

## Creating Buckets to Store Website Data
*To support requests from both the root domain and subdomain, you create two buckets*
1. Configured the first bucket, the root, with settings in table 1:
2. Pressed -> Create Bucket
3. Clicked itspanko.com in main dashboard.
4. Created a file called [[test.html]]
5. Clicked the bucket in the dashboard
6. Clicked upload and uploaded the file
7. Created another bucket, with name www.itspanko.com, see table 1.

| Setting            | Value                    |
| ------------------ | ------------------------ |
| Bucket Name        | itspanko.com             |
| AWS Region         | US East (Ohio) us-east-2 |
| Object Ownership   | ACLs Disbaled            |
| Bucket Versioning  | Enable                   |
| Tags (1)           | CoreData                 |
| Default Encryption | Disable                  | 
Table 1. First Bucket Config

## Enabling Static Website host
*Configuring appropriate bucket to host website*
1. Clicked on itspanko.com bucket.
2. Properties -> Static website hosting -> Enable
3. Hosting type: host a static website.
4. Index document: [[test.html]]
5. Save Changes
6. Navigated to permissions -> Block public access
7. Unchecked *Block all public access*
8. Navigated to Bucket policy and paste info
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::itspanko.com/*"
        }
    ]
}
```
9. Navigated back to second bucket: www.itspanko.com
10. Navigated to properties -> Static website hosting -> Enable
11. Selected redirect and pasted in: itspanko.com

## Connecting Route53 to bucket
*Connecting Route53 to the Amazon S3 domain*
1. Navigated to Route53 Dashboard page.
2. Choose **Hosted zones**. 
3.  Choose **Create record**.
4.  Choose **Switch to wizard**.
5.  Choose **Simple routing**, and choose **Next**.
6.  Choose **Define simple record**.
7.  In **Record name**, accept the default value
8.  In **Value/Route traffic to**, choose **Alias to S3 website endpoint**.
9.  Choose the Region.
10.  Choose the S3 bucket.
11.  In **Record type**, choose **A ‐ Routes traffic to an IPv4 address and some AWS resources**.
12.  For **Evaluate target health**, choose **No**.
13.  Choose **Define simple record**.
### Adding an alias record for subdomain (www.itspanko.com)
1.  Under **Configure records**, choose **Define simple record**.
2.  In **Record name** for your subdomain, typed `www`.
3.  In **Value/Route traffic to**, choose **Alias to S3 website endpoint**.
4.  Choose the Region.
5.  Choose the S3 bucket.
6.  In **Record type**, choose **A ‐ Routes traffic to an IPv4 address and some AWS resources**.
7.  For **Evaluate target health**, choose **No**.
8.  Choose **Define simple record**.
9.  On the **Configure records** page, choose **Create records**

## Moving to HTTPS:
*Created a certificate using AWS certificate manager*
1. Navigated to *Security Identity and Compliance* -> *Certificate Manager*
2. Requested a new public certificate
3. Under fully qualified domain name:
	1. `itspanko.com`
	2. `*.itspanko.com`
4. Clicked Request
5. Clicked on Certificate ID
6. Clicked *Create records in Route 53*
7. Clicked *Create records*

