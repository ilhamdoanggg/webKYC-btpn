const Twilio = require('twilio');

const accountSid = 'Your account Sid';
const authToken = 'Your auth Token';

// Init twilio
const twilio = new Twilio(accountSid, authToken);

const sentNotifMessage = (data) => {
    const number = data.number;
    const defaultText = `Hallo, Kami dari sales BANK BTPN klik ${data.link} `
    twilio.messages.create({
        body: defaultText,
        to: number,  // Text this number
        from: 'Your Valid Number' // From a valid Twilio number
    })
        .then((msg) => console.log(msg))
        .catch((err) => console.log(err))
}

module.exports = sentNotifMessage;