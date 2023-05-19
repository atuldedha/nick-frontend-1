import { createRef, useEffect, useRef, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useRouter } from 'next/router';

import styles from '../styles/Checkout.module.css';
import en from '../locales/en';
import fr from '../locales/fr';
import { useWindowSize } from '../utils/WindowResizeHook';

const CheckoutForm = ({ price, selected, setSelected }) => {
  const router = useRouter();
  const { locale } = router;

  const [width, height] = useWindowSize();

  // const t = locale === "en-US" ? en : fr;
  const t = locale === 'fr' ? fr : en;
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('CA');
  const [postalCode, setPostalCode] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const stripe = useStripe();

  const elements = useElements();
  const [value, setValue] = useState(null);

  const [regionValue, setRegionValue] = useState('');

  function onChange(value) {
    setValue(value);
  }
  const values = [
    {
      id: 1,
      amount: 10.0,
    },
    {
      id: 2,
      amount: 20.0,
    },
    {
      id: 3,
      amount: 30.0,
    },
    {
      id: 4,
      amount: 50.0,
    },
    {
      id: 5,
      amount: 100.0,
    },
    {
      id: 6,
      amount: 0,
    },
  ];
  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    if (!postalFilter(postalCode)) {
      return setCheckoutError('Invalid Postal Code');
    }
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!value) {
      setCheckoutError('Please verify that you are not a robot');
      return;
    }

    if (selected.amount < 1 && selected.id === 6) {
      setCheckoutError('Please select an amount greater than 1');
      return;
    }
    let billingDetails;
    if (isAnonymous) {
      billingDetails = {
        email: email,
      };
    } else {
      billingDetails = {
        name: name,
        email: email,
        address: {
          city: city,
          country: country,
          line1: address,
          postal_code: postalCode,
        },
      };
    }

    function postalFilter(postalCode) {
      if (!postalCode) {
        return null;
      }

      postalCode = postalCode.toString().trim();

      var us = new RegExp('^\\d{5}(-{0,1}\\d{4})?$');
      var ca = new RegExp(
        /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i
      );
      if (country === 'US') {
        if (us.test(postalCode.toString())) {
          return true;
        } else {
          return false;
        }
      } else if (country === 'CA') {
        if (ca.test(postalCode.toString().replace(/\W+/g, ''))) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

    setProcessingTo(true);
    const cardElement = elements.getElement('card');

    try {
      const { data } = await axios.post('/api/payment_intents', {
        amount: price * 100,
        email: email,
        company: companyName || 'Anonymous',
      });
      const { client_secret: clientSecret } = data;
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
        metadata: {
          company: companyName,
        },
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      if (selected.type === 'company' && selected.amount >= 100) {
        router.push(`/company/thank-you?session_id=${data?.id}`);
      } else {
        router.push(`/thank-you?session_id=${clientSecret}`);
      }

      setProcessingTo(false);
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: '#181818',
      fontSize: '18px',
      height: '50px',
      margin: '10px 0',
      iconColor: '#181818',
      '::placeholder': {
        color: '#636363',
        fontWeight: '100',
      },
    },
    invalid: {
      iconColor: '#C70000',
      color: '#C70000',
    },
    complete: {
      iconColor: '#FD2626',
    },
  };

  const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
    placeholder: 'Card Details',
  };

  return (
    <div>
      {selected.type && (
        <form onSubmit={handleFormSubmit} className={styles.formContainer}>
          {selected.type === 'company' && (
            <p className={styles.companyInfo}>{t.donate.form.companyNote}</p>
          )}
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type='text'
            name='name'
            required={isAnonymous ? false : true}
            placeholder={t.donate.form.name}
          />
          {selected.type === 'company' && (
            <input
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              value={companyName}
              type='text'
              name='company'
              required={isAnonymous ? false : true}
              placeholder={t.donate.form.company}
            />
          )}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            type='email'
            name='email'
            placeholder={t.donate.form.email}
          />
          <input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            required={isAnonymous ? false : true}
            type='address'
            name='address'
            placeholder={t.donate.form.address}
          />
          <input
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
            type='text'
            required={isAnonymous ? false : true}
            name='city'
            placeholder={t.donate.form.city}
          />
          <RegionDropdown
            country={country}
            classes={styles.countryDropdown}
            countryValueType='short'
            defaultOptionLabel={t.state.title}
            value={regionValue}
            blacklist={{
              US: [
                'Armed Forces Americas',
                'Armed Forces Europe, Canada, Africa and Middle East',
                'Armed Forces Pacific',
              ],
            }}
            onChange={(val) => setRegionValue(val)}
          />
          <CountryDropdown
            value={country}
            classes={styles.countryDropdown}
            valueType='short'
            onChange={(val) => setCountry(val)}
          />
          <input
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
            value={postalCode}
            type='text'
            required={isAnonymous ? false : true}
            name='zip'
            placeholder={t.donate.form.zip}
          />
          <div>
            <input
              type='checkbox'
              name='anonymous'
              value={isAnonymous}
              onChange={(e) => {
                setIsAnonymous(e.target.checked);
              }}
              id='anonymous'
              className={styles.checkbox}
            />{' '}
            {t.donate.form.anon}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>$</label>
            <input
              className={styles.input}
              placeholder='Amount'
              value={selected.amount}
              onChange={(e) => {
                setSelected({
                  ...selected,
                  amount: e.target.value,
                });
              }}
              disabled={selected.id !== 6}
            />
          </div>
          <div className={styles.valuesContainer}>
            {values.map((value) => (
              <button
                type='button'
                key={value.id}
                style={{
                  minWidth: value.id === 6 ? '62px' : '32px',
                }}
                onClick={() => {
                  setSelected({
                    ...selected,
                    amount: value.amount,
                    id: value.id,
                  });
                }}
                className={
                  selected.id === value.id ? styles.valueSelected : styles.value
                }
              >
                {value.amount === 0
                  ? 'Custom'
                  : width < parseFloat('768')
                  ? value.amount
                  : value.amount + ' $ CAD'}
              </button>
            ))}
          </div>
          <h4>{t.donate.form.cardInformation}</h4>
          <div className={styles.card}>
            <CardElement
              options={cardElementOpts}
              onChange={handleCardDetailsChange}
            />
          </div>
          {checkoutError && <p className=''>{checkoutError}</p>}

          <div
            style={{
              marginTop: '20px',
            }}
          >
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              size={width < parseFloat('380') ? 'compact' : 'normal'}
            />
          </div>
          <button
            type='submit'
            disabled={isProcessing || !stripe || !value}
            className={styles.button}
          >
            <svg
              width='11'
              height='11'
              viewBox='0 0 11 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.5 0C4.4122 0 3.34884 0.322569 2.44437 0.926917C1.5399 1.53126 0.834947 2.39025 0.418665 3.39524C0.00238306 4.40023 -0.106535 5.5061 0.105683 6.573C0.317902 7.63989 0.841726 8.6199 1.61091 9.38909C2.3801 10.1583 3.36011 10.6821 4.42701 10.8943C5.4939 11.1065 6.59977 10.9976 7.60476 10.5813C8.60975 10.1651 9.46873 9.4601 10.0731 8.55563C10.6774 7.65116 11 6.5878 11 5.5C11 4.77773 10.8577 4.06253 10.5813 3.39524C10.3049 2.72795 9.89981 2.12163 9.38909 1.61091C8.87837 1.10019 8.27205 0.695063 7.60476 0.418663C6.93747 0.142262 6.22227 0 5.5 0ZM7.865 4.1855L5.3515 7.4855C5.30026 7.55206 5.23446 7.606 5.15915 7.64318C5.08383 7.68036 5.001 7.6998 4.917 7.7C4.83346 7.70045 4.75091 7.68186 4.67563 7.64565C4.60034 7.60944 4.5343 7.55655 4.4825 7.491L3.1405 5.7805C3.09608 5.72344 3.06334 5.65819 3.04413 5.58848C3.02493 5.51876 3.01965 5.44595 3.02858 5.37419C3.03752 5.30243 3.06051 5.23314 3.09622 5.17027C3.13194 5.10739 3.17969 5.05217 3.23675 5.00775C3.35199 4.91804 3.49814 4.87778 3.64306 4.89583C3.71482 4.90477 3.78411 4.92775 3.84698 4.96347C3.90986 4.99919 3.96508 5.04694 4.0095 5.104L4.906 6.248L6.985 3.498C7.02906 3.44022 7.08407 3.39168 7.14688 3.35516C7.2097 3.31863 7.2791 3.29484 7.35111 3.28514C7.42312 3.27543 7.49634 3.28001 7.56658 3.2986C7.63683 3.31719 7.70272 3.34944 7.7605 3.3935C7.81828 3.43756 7.86682 3.49257 7.90334 3.55538C7.93987 3.6182 7.96366 3.68759 7.97336 3.75961C7.98307 3.83162 7.97849 3.90484 7.9599 3.97508C7.94131 4.04532 7.90906 4.11122 7.865 4.169V4.1855Z'
                fill='white'
              />
            </svg>
            {isProcessing
              ? 'Processing...'
              : `${t.donate.form.btn}  ${price} $ CAD`}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
