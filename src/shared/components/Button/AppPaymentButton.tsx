import { useState } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

import { settings } from '../../constant/settings.contants'

import AppLoading from '../AppLoading';

interface IProps {
  preferenceId: string
}

export default function AppPaymentButton ({ preferenceId }: IProps) {
  const [loading, setLoading] = useState(true);

  initMercadoPago(settings.appMPPublicKey);

  return (
    <>
      { loading && <AppLoading /> }

      <Wallet initialization={{ preferenceId }} onReady={() => { setTimeout(() => setLoading(false), 300) }} />
    </>
  );
}