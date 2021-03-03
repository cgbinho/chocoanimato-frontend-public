interface CheckoutData {
  driver: string;
  mode: string;

  pagarme: {
    sandbox: {
      api_key: string;
      encryption_key: string;
    };
    production: {
      api_key: string;
      encryption_key: string;
    };
  };
}

export default {
  driver: process.env.NEXT_PUBLIC_ENV_PAYMENT_PROVIDER,
  mode: process.env.NEXT_PUBLIC_ENV_PAYMENT_MODE,

  pagarme: {
    sandbox: {
      api_key: process.env.NEXT_PUBLIC_PAGARME_SANDBOX_API_KEY,
      encryption_key: process.env.NEXT_PUBLIC_PAGARME_SANDBOX_ENCRYPTION_KEY
    },
    production: {
      api_key: process.env.NEXT_PUBLIC_PAGARME_PRODUCTION_API_KEY,
      encryption_key: process.env.NEXT_PUBLIC_PAGARME_PRODUCTION_ENCRYPTION_KEY
    }
  }
} as CheckoutData;
