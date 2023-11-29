import { useState } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

import { settings } from '../../constant/settings.contants'

import AppLoading from '../AppLoading';

import { ServiceDto } from '../../../modules/services/dtos/service.dto';

import { CreatePreferenceService } from '../../services/createPreference.service';

const createPreferenceService = new CreatePreferenceService();

export default function AppPaymentButton (service: ServiceDto) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  initMercadoPago(settings.appMPPublicKey);

  const handleBuy = async () => {
    setLoading(true);

    try {
      const dataSend = {
        serviceId: service.id,

        title: service.name,
        unitPrice: service.price,
      };

      const res: any = await createPreferenceService.run(dataSend);

      setPreferenceId(res.preferenceId);
    } catch (e) {
      console.log('err', e);
    }
  }

  return (
    <>
      { loading && <AppLoading /> }

      {!preferenceId ? 
        ( <button className="btn btn-active btn-neutral" onClick={handleBuy}>Reservar</button> ) : 
        ( <Wallet initialization={{ preferenceId }} onReady={() => { setTimeout(() => setLoading(false), 300) }} /> )
      }
    </>
  );
}