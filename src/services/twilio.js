import Config from "../config";
import twilio from "twilio";

class Twilio {
  twilio;

  constructor() {
    this.twilio = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);
  }

  async sendMessage(cellphoneNumber, message) {
    const params = {
      body: message,
      from: `whatsapp:${Config.TWILIO_CELLPHONE}`,
      to: `whatsapp:${cellphoneNumber}`,
    };

    // if (picture) params.mediaUrl = [picture];

    const response = await this.twilio.messages.create(params);
    return response;
  }
}

export const SmsService = new Twilio();
