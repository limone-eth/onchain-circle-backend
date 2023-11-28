import { Client, Receiver } from '@upstash/qstash';

export const publishMessage = async (message: Record<string, any>) => {
  const c = new Client({
    token: process.env.QSTASH_TOKEN,
  });

  return c.publishJSON({
    url: process.env.QSTASH_URL,
    // or topic: "the name or id of a topic"
    body: message,
  });
};

export const verifyMessage = async (signature: string, body: string, clockTolerance?: number): Promise<boolean> => {
  const r = new Receiver({
    currentSigningKey: '..',
    nextSigningKey: '..',
  });

  return r.verify({
    signature,
    body,
    clockTolerance,
  });
};
