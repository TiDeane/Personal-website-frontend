# Cloud Resume Frontend

This project contains the static website frontend for the Cloud Resume Challenge. The website is hosted on an S3 bucket and distributed via CloudFront. Pushes to the repository are automatically deployed via Github Actions. The website interacts with a [serverless backend](https://github.com/TiDeane/Cloud-Resume-backend) that utilizes API Gateway and AWS Lambda functions, which is tested and deployed automatically using the AWS Serverless Application Model (SAM).

In the future I will write a detailed report on my process over the development of this project, with the reasoning for each decision.

TODO:
- [x] Finish static website's design
- [x] Host static website on S3, get a CloudFront distribution
- [ ] Get a domain name
- [x] Use Github Actions to automatically update website when new pushes occur in the repository
- [x] Implement [serverless backend](https://github.com/TiDeane/Cloud-Resume-backend) to count visitors by country (CloudFront custom headers + API Gateway + Lambda + DynamoDB)
- [x] Write SAM template for automated deployment of backend
- [ ] Write my process over the development of this project, with the reasoning for each decision


## Credits:

- Initial Design: [HTML5 UP](https://html5up.net/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Others:
	- [jQuery](https://jquery.com/)
	- [Responsive Tools](https://github.com/ajlkn/responsive-tools)

# License

The website's original design is licensed under the [CCA 3.0 license](https://html5up.net/license).

Changes:
- The "Home" page is essentially unchanged, except for the addition of a visitor counter.
- The "Work" page was completely changed, from a portfolio of photos to a curriculum. The section's icon was changed as well.
- The "Contact" page was completely changed, from a contact form to a list of contact links.