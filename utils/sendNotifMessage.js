const Twilio = require('twilio');

const accountSid = 'ACf63117f16695d686d616de5fe57b9920';
const authToken = '30f800c6264d367e4f349653379a70db';

// Init twilio
const twilio = new Twilio(accountSid, authToken);

const sentNotifMessage = (data) => {
        const number = data.number;
        const defaultText = `Hallo, Kami dari sales BANK BTPN klik ${data.link} `
        twilio.messages.create({
                body: defaultText,
                to: `+${number}`,  // Text this number
                from: '+12014310176' // From a valid Twilio number
        })
                .then((msg) => console.log(msg))
                .catch((err) => console.log(err))
}

module.exports = sentNotifMessage;