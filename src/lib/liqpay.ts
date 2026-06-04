import crypto from 'crypto';

export type LiqPayCheckoutParams = {
  version: number;
  public_key: string;
  action: 'pay';
  amount: number;
  currency: string;
  description: string;
  order_id: string;
  result_url: string;
  server_url: string;
  /** 1 = test mode, no real charges */
  sandbox?: number;
};

export function encodeLiqPayData(params: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(params)).toString('base64');
}

export function generateLiqPaySignature(
  data: string,
  privateKey: string,
): string {
  const signString = privateKey + data + privateKey;
  return crypto.createHash('sha1').update(signString).digest('base64');
}

export function verifyLiqPaySignature(
  data: string,
  signature: string,
  privateKey: string,
): boolean {
  const expected = generateLiqPaySignature(data, privateKey);
  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(signature);

  if (expectedBuf.length !== receivedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export function createLiqPayCheckout(
  params: Omit<LiqPayCheckoutParams, 'version' | 'public_key'>,
  publicKey: string,
  privateKey: string,
): { data: string; signature: string } {
  const payload: LiqPayCheckoutParams = {
    version: 3,
    public_key: publicKey,
    ...params,
  };

  const data = encodeLiqPayData(payload);
  const signature = generateLiqPaySignature(data, privateKey);

  return { data, signature };
}
