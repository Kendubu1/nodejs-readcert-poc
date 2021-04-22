# Node JS - Reading cert on Linux App Service - Proof of Concept
## Overview
- This sample reads the certs from the file system at /var/ssl/* & uses PEM to export private cert details to logs. https://www.npmjs.com/package/pem
- 
## Prerequisite to run sample
- Public & Private cert loaded to your App Service
- Followed Steps to make certificate accessible: https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-certificate-in-code
- App Setting: WEBSITE_LOAD_CERTIFICATES | <thumbprint>


## Creating a Public cert with your existing .p12 & importing to Azure 
1. 

2. Create your cert directory & create the empty .cer file via SSH "https://<app-name>.scm.azurewebsites.net/ssh"
```
mkdir /home/cert && touch /home/cert/mycert.cer
```
3. Using opensssl, output your public cert.
Note: Running the command will prompt you to enter the import password. Just hit enter to continue without a password. 
```
cd /var/ssl/private
openssl pkcs12 -in <thumbprint>.p12 -clcerts -nokeys -out /home/cert/mycert.cer
```
4. Extract the cert to upload to your Azure App Service public cert records to make it accessible on the platform. We'll use Kudu to zip & download this directory. 
```
http://<app-name>.scm.azurewebsites.net/api/zip/cert
```
5. Unzip & upload the public cert to your app service. It will now be accessible from your file system & usable by your code.
https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-certificate#upload-a-public-certificate

| Platform | Public Cert Location |Private Cert Location|
| --- | ----------- |-----------|
| Linux App Service & WafC | /var/ssl/certs	 |/var/ssl/private|
