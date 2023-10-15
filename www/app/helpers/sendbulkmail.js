//bulkSend.js
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.SENDINBLUE_KEY;

export const SendBulkMail = ({ params, subject, mailList, templateId }, res) => {
  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: { email: "ygunjal+Uconnect@clarku.edu", name: "UConnect" },
      subject: subject,
      templateId: templateId || 1,
      //  "htmlContent":"<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
      params: {
        greeting: "This is the default greeting",
        headline: "This is the default headline",
      },
      messageVersions: [
        //Definition for Message Version 1
        {
          to: mailList || [],
          params: params,
          subject: subject || "Message from UConnect",
        },
      ],
    })
    .then(
      function (data) {
          console.log(data);
          res && res.status(200).json({message: "Sent Successfully!"})
       },
      function (error) {
        console.error(error);
        res && res.status(403).json({ message: "couldn't send Mail" });
      }
    );
};
   

