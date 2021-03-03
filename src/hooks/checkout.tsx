import cookie from 'js-cookie';
import pagarme from 'pagarme';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useImmer } from 'use-immer';
import checkoutConfig from '../config/checkout';
import { BrazillianStates } from '../constants/checkout';
import { formatMonthAndYear } from '../services/formatTime';
import { CheckoutItem, CheckoutState, CouponData } from '../types/checkout';
import { cepSanitization } from '../validations/inputSanitization';

interface CheckoutContextData {
  checkout: CheckoutState;
  isLoading: boolean;
  addItemToCheckout(checkoutItem: CheckoutItem): void;
  removeItemFromCheckout(id: string): void;
  addCoupon(coupon: CouponData): void;
  removeCoupon(): void;
  addPayer(data: any): void;
  addPayerAddress(data: any): void;
  addPayment(data: any): void;
  addCreditCardBilling(data: any): Promise<void>;
  addBoletoBilling(data: any): void;
  postCheckoutSuccess(data: any): Promise<void>;
  clearCheckout(): Promise<void>;
}

const CheckoutContext = createContext<CheckoutContextData>(
  {} as CheckoutContextData
);

export const CheckoutProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useImmer<CheckoutState>(() => {
    // nextjs thing: if we are clientside, access localstorage:
    if (typeof window !== 'undefined') {
      const checkout = window.localStorage.getItem('@ChocoAnimato: checkout');

      if (checkout) {
        const checkoutParsed = JSON.parse(checkout);
        return checkoutParsed;
      }
    }

    return {
      items: [],
      coupon: null,
      payer: null,
      payment: null
    } as CheckoutState;
  });

  /*
  1 add item to checkout
  check coupon
  calc subtotal
  calc total
  */

  const addItemToCheckout = useCallback(checkoutItem => {
    setLoading(true);
    setData(draft => {
      const itemExists = draft.items.find(item => item.id === checkoutItem.id);

      // item does not exist, add to checkout:
      if (!itemExists) {
        // add item to items
        draft.items = [...draft.items, checkoutItem];

        // calc subtotal:
        const subtotal = draft.items.reduce((prev: number, cur: any) => {
          return prev + cur.template.price;
        }, 0);

        draft.payment = { ...draft.payment, subtotal };

        // calc coupon (if exists) on subtotal:
        draft.payment.total = getTotalAfterDiscount(
          draft.coupon,
          draft.payment.subtotal
        );

        setLocalStorage('@ChocoAnimato: checkout', draft);
        return draft;
      }
      return draft;
    });

    setLoading(false);
  }, []);

  const removeItemFromCheckout = useCallback((id: string) => {
    setData(draft => {
      draft.items = draft.items.filter(item => item.id !== id);

      draft.payment.subtotal = draft.items.reduce((prev: number, cur: any) => {
        return prev + cur.template.price;
      }, 0);

      // calc coupon (if exists) on subtotal:
      draft.payment.total = getTotalAfterDiscount(
        draft.coupon,
        draft.payment.subtotal
      );

      setLocalStorage('@ChocoAnimato: checkout', draft);

      return draft;
    });
  }, []);

  const addCoupon = useCallback((coupon: CouponData) => {
    setLoading(true);

    setData(draft => {
      // add coupon to context:
      draft.coupon = coupon;
      // calc subtotal
      draft.payment.subtotal = draft.items.reduce((prev: number, cur: any) => {
        return prev + cur.template.price;
      }, 0);
      // calc coupon on subtotal:
      draft.payment.total = getTotalAfterDiscount(
        coupon,
        draft.payment.subtotal
      );
      // save checkout to localstorage:
      setLocalStorage('@ChocoAnimato: checkout', draft);
    });

    setLoading(false);
  }, []);

  const removeCoupon = useCallback(() => {
    setLoading(true);

    setData(draft => {
      draft.coupon = null;
      draft.payment.total = draft.payment.subtotal;

      setLocalStorage('@ChocoAnimato: checkout', draft);

      return draft as CheckoutState;
    });
    setLoading(false);
  }, []);

  const addPayer = useCallback(formData => {
    setLoading(true);

    setData(draft => {
      draft.payer = { ...draft.payer, ...formData };
    });

    setLoading(false);
  }, []);

  const addPayerAddress = useCallback(({ address }) => {
    // const { address } = formData;
    setLoading(true);

    // Sanitize postalcode ( remove spaces, dashes, etc )
    const postal_code = cepSanitization(address.postal_code);
    // Add region ('São Paulo', etc):
    // get region name:
    const regionName = () => {
      const findRegion = BrazillianStates.find(
        region => region.value === address.region_code
      );
      return findRegion.name;
    };
    const region = regionName();
    const country = 'Brasil';
    // add to checkout context:
    addPayer({
      address: { postal_code, region, country, ...address }
    });

    setLoading(false);
  }, []);

  const addPayment = useCallback(formData => {
    setLoading(true);
    setData(draft => {
      draft.payment = { ...draft.payment, ...formData };
    });

    setLoading(false);
  }, []);

  const addCreditCardBilling = useCallback(async ({ payer, payment }) => {
    setLoading(true);

    const { expMonth, expYear } = formatMonthAndYear(
      payment.card.expiration_date
    );
    // Function to encrypt card data, clientside:
    try {
      const client = await pagarme.client.connect({
        encryption_key:
          checkoutConfig.pagarme[checkoutConfig.mode].encryption_key
      });

      const card_hash = await client.security.encrypt({
        card_number: payment.card.number,
        card_holder_name: payment.card.card_holder_name,
        card_expiration_date: `${expMonth}${expYear}`,
        card_cvv: payment.card.security_code
      });

      addPayment({
        payment_method: payment.payment_method,
        installments: parseInt(payment.installments),
        card: {
          number: `************ ${payment.card.number.substr(
            payment.card.number.length - 4
          )}`,
          expiration_date: payment.card.expiration_date,
          card_holder_name: payment.card.card_holder_name,
          card_hash
        }
      });

      addPayer(payer);
    } catch (error) {}

    setLoading(false);
  }, []);

  const addBoletoBilling = useCallback(({ payment }) => {
    setLoading(true);

    addPayment({
      payment_method: payment.payment_method,
      installments: 1
    });

    setLoading(false);
  }, []);

  const postCheckoutSuccess = useCallback(async data => {
    // WE NEED TO CLEAR CHECKOUT
    // STORE ORDER DATA.
    setData(draft => {
      draft.items = [];
      draft.coupon = null;
      draft.payer = null;
      draft.payment = null;
    });
  }, []);

  const clearCheckout = useCallback(async () => {
    // WE NEED TO CLEAR CHECKOUT
    // STORE ORDER DATA.
    setData(draft => {
      draft.items = [];
      draft.coupon = null;
      draft.payer = null;
      draft.payment = null;
    });
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        checkout: data,
        isLoading,
        addItemToCheckout,
        removeItemFromCheckout,
        addCoupon,
        removeCoupon,
        addPayer,
        addPayerAddress,
        addPayment,
        addCreditCardBilling,
        addBoletoBilling,
        postCheckoutSuccess,
        clearCheckout
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckout(): CheckoutContextData {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error('useCheckout must be used within an CheckoutProvider');
  }
  return context;
}

const getTotalAfterDiscount = (coupon: CouponData, subtotal: number) => {
  // if no coupon, return subtotal:
  if (!coupon?.amount) {
    return subtotal;
  }
  // calc discount percentage:
  if (coupon.is_percent) {
    const total = subtotal - (subtotal * coupon.amount) / 100;
    return total;
  }
  // subtract discount from subtotal:
  return subtotal - coupon.amount;
};

// SET COOKIE HELPER USED ON SIGNIN, SIGNINGOOGLE, etc.
const setCookies = (key: string, value: any): void => {
  // set cookies:
  cookie.set(key, JSON.stringify(value), {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    expires: 7,
    sameSite: 'strict'
  });
};

const setLocalStorage = (key: string, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
