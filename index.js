const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express().use(body_parser.json());

const token = process.env.TOKEN;
const mytoken = "dhruv";
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Webhook is listening");
});

app.get("/webhook", (request, response) => {
  console.log("webhook get request called!!!");
  let body_param = request.body;
  console.log(JSON.stringify(body_param, null, 2));

  let mode = request.query["hub.mode"];
  let challenge = request.query["hub.challenge"];
  let token = request.query["hub.verify_token"];

  // const mytoken = "dhruv";

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      response.status(200).send(challenge);
    } else {
      response.status(403);
    }
  }
});

app.post("/webhook", (request, response) => {
  console.log("called1");
  let body_param = request.body;

  // process.stderr.write("request is post" + request);

  // console.log("request is post" + request);
  console.log(JSON.stringify(body_param, null, 2));

  if (body_param.object) {
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phone_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

      axios({
        method: post,
        url:
          "https://graph.facebook.com/v18.0/" +
          phone_no_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: "Hi!!!!!!!!!!!!!! I am Dhruv Gupta",
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  }
});

app.post("/dhruvgupta", (request, response) => {
  response.sendStatus(200).send("running post request");

  //   console.log("called1");
  //   let body_param = request.body;

  // process.stderr.write("request is post" + request);

  //   // console.log("request is post" + request);
  //   console.log(JSON.stringify(body_param, null, 2));

  //   if (body_param.object) {
  //     if (
  //       body_param.entry &&
  //       body_param.entry[0].changes &&
  //       body_param.entry[0].changes[0].value.messages &&
  //       body_param.entry[0].changes[0].value.messages[0]
  //     ) {
  //       let phone_no_id =
  //         body_param.entry[0].changes[0].value.metadata.phone_number_id;
  //       let from = body_param.entry[0].changes[0].value.messages[0].from;
  //       let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

  //       axios({
  //         method: post,
  //         url:
  //           "https://graph.facebook.com/v18.0/" +
  //           phone_no_id +
  //           "/messages?access_token=" +
  //           token,
  //         data: {
  //           messaging_product: "whatsapp",
  //           to: from,
  //           text: {
  //             body: "Hi!!!!!!!!!!!!!! I am Dhruv Gupta",
  //           },
  //         },
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       response.status(200);
  //     } else {
  //       response.status(404);
  //     }
  //   }
});

app.get("/", (request, response) => {
  response.status(200).send("Webhook is setup!!! Dhruv Gupta Testing the API");
});

// https://graph.facebook.com/v18.0/224738690728648/messages `
//   -H 'Authorization: Bearer EAAP6A94pp78BOwRyZBZCIKFwULdLKe6scqUxuBgOvD6bwPifOMctVNcUTKRPOfLjTcZBvfI6M8CFJcwAA9KU59JHtrcBhITaE0cCnWbJcqSykW0QW5eulGdAb5BLU4et812ZCZC4skKhBSSanqNOmsBRDSniBmEOv60f5a8ttyfl4s9COrGT9RBLb51I62xymZA5SjjOtZAraU39iNpbykZD' `
//   -H 'Content-Type: application/json' `
//   -d '{ \"messaging_product\": \"whatsapp\", \"to\": \"\", \"type\": \"template\", \"template\": { \"name\": \"hello_world\", \"language\": { \"code\": \"en_US\" } } }'

// {
//     "object": "whatsapp_business_account",
//     "entry": [{
//         "id": "WHATSAPP_BUSINESS_ACCOUNT_ID",
//         "changes": [{
//             "value": {
//                 "messaging_product": "whatsapp",
//                 "metadata": {
//                     "display_phone_number": PHONE_NUMBER,
//                     "phone_number_id": PHONE_NUMBER_ID
//                 },
//                 "contacts": [{
//                     "profile": {
//                       "name": "NAME"
//                     },
//                     "wa_id": PHONE_NUMBER
//                   }],
//                 "messages": [{
//                     "from": PHONE_NUMBER,
//                     "id": "wamid.ID",
//                     "timestamp": TIMESTAMP,
//                     "text": {
//                       "body": "MESSAGE_BODY"
//                     },
//                     "type": "text"
//                   }]
//             },
//             "field": "messages"
//           }]
//     }]
//   }
