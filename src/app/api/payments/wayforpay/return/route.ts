
export async function POST(req: Request) {
  const formData = await req.formData();

  const order = formData.get('orderReference');

  return new Response(null, {
  status: 303,
  headers: {
    Location: `https://siren-serena.com/en/checkout/success?order=${order}`,
  },
});
}