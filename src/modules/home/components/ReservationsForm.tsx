import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import TimePicker from './ReservationsFormTimePicker';
import AppLoadingProgress from '../../../shared/components/AppLoadingProgress';
import AppPaymentButton from '../../../shared/components/Button/AppPaymentButton';

import { ServiceDto } from '../../services/dtos/service.dto';

import { ReservationCodesService } from '../../../shared/services/reservationCodes.service';
import { CreateOrUpdateReservationsService } from '../services/createOrUpdateReservations.service';

const createOrUpdateReservationsService = new CreateOrUpdateReservationsService();
const reservationCodesService = new ReservationCodesService();

interface IProps {
  service: ServiceDto
}

export default function ReservationsForm ({ service }: IProps) {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const [loadingSave, setLoadingSave] = useState(false);
  const [payAdvance, setPayAdvance] = useState(false);

  useEffect(() => {
    setValue("startTime", selectedStartTime ? convertToServerTime(`${selectedStartTime} PM`) : selectedStartTime )
  }, [selectedStartTime]);

  useEffect(() => {
    setValue("endTime", selectedEndTime ? convertToServerTime(`${selectedEndTime} PM`) : selectedEndTime )
  }, [selectedEndTime]);

  useEffect(() => {
    if (payAdvance) setValue('totalPrice', service.advancePayment)
    else setValue('totalPrice', totalPrice ?? service.price ?? 0)
  }, [payAdvance]);

  // Recalcular el precio total cuando cambian las horas seleccionadas
  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      const durationInMinutes = calculateDurationInMinutes(selectedStartTime, selectedEndTime);

      const pricePerHour = service.price || 0;
      const totalPrice = (durationInMinutes / 60) * pricePerHour;

      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(null);
    }
  }, [selectedStartTime, selectedEndTime]);

  const calculateDurationInMinutes = (startTime: string, endTime: string): number => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    const durationInMilliseconds = end.getTime() - start.getTime();

    return durationInMilliseconds / (1000 * 60); // Convertir de milisegundos a minutos
  };

  const handleBadgeClick = (time: string) => {
    if (!selectedStartTime) {
      setSelectedStartTime(time);
    } else if (!selectedEndTime && time > selectedStartTime) {
      setSelectedEndTime(time);
    } else {
      setSelectedStartTime(time);
      setSelectedEndTime('');
    }
  };

  const convertToServerTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
    const date = new Date(2000, 0, 1, adjustedHours, minutes);
    
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;

    return formattedTime;
  }

  const save = handleSubmit(async (data) => {
    setLoadingSave(true);

    const currentDate = new Date();

    try {
      const dataSend: any = {
        serviceId: service.id,
        code: `${currentDate.getTime()}`,
        paymentStatus: 0,

        nameClient: data.nameClient,
        phone: data.phone,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        totalPrice: payAdvance ? service.advancePayment : (totalPrice ?? service.price ?? 0),
      };

      const res = await createOrUpdateReservationsService.run(dataSend);

      setPreferenceId(res.preferenceId);
      reservationCodesService.set(res.code);
    } catch (e) {
      console.log('err', e);
      setLoadingSave(false);
    }

    setLoadingSave(false);
  });

  return (
    <>
      <form onSubmit={save}>
        {loadingSave && <AppLoadingProgress />}

        <div className="flex space-x-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>

            <input 
              type="text" 
              className="input input-bordered w-full" 
              {...register('nameClient', {
                required: {
                  value: true,
                  message: "El nombre requerido"
                }
              })}
            />

            {errors.nameClient && <span className="text-red-600 text-right">{errors.nameClient.message as any}</span>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Número celular</span>
            </label>

            <input 
              type="tel"
              className="input input-bordered w-full" 
              {...register('phone', {
                required: {
                  value: true,
                  message: "El número celular es requerido"
                }
              })}
            />

            {errors.phone && <span className="text-red-600 text-right">{errors.phone.message as any}</span>}
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Fecha</span>
          </label>

          <input 
            type="date"
            className="input input-bordered w-full" 
            {...register('date', {
              required: {
                value: true,
                message: "La fecha es requerida"
              }
            })}
          />

          {errors.date && <span className="text-red-600 text-right">{errors.date.message as any}</span>}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Hora de inicio - Hora de finalización</span>
          </label>

          <TimePicker selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} handleBadgeClick={handleBadgeClick} />

          {errors.startTime && <span className="text-red-600 text-right">{errors.startTime.message as any}</span>}
          {errors.endTime && <span className="text-red-600 text-right">{errors.endTime.message as any}</span>}
        </div>

        <div className='flex justify-center gap-3 mt-3'>
          <div className="stats shadow">
            <div className={`stat cursor-pointer ${!payAdvance ? 'border rounded-2xl border-black' : ''}`} onClick={() => setPayAdvance(!payAdvance)}>
              <div className="stat-title">Pagar precio total</div>
              <div className="stat-value">${Intl.NumberFormat().format(totalPrice ?? service.price ?? 0)}</div>
            </div>
          </div>

          <div className="stats shadow">
            <div className={`stat cursor-pointer ${payAdvance ? 'border rounded-2xl border-black' : ''}`} onClick={() => setPayAdvance(!payAdvance)}>
              <div className="stat-title">Pagar cuota mínima</div>
              <div className="stat-value">${Intl.NumberFormat().format(service.advancePayment ?? 0)}</div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          {errors.totalPrice && <span className="text-red-600 text-right">{errors.totalPrice.message as any}</span>}
        </div>

        {/* Hidden inputs */}
        <div className='hidden'>
          <input 
            type="text"
            {...register('startTime', {
              required: {
                value: true,
                message: "La hora de inicio es requerida"
              }
            })}
          />
          <input 
            type="text"
            {...register('endTime', {
              required: {
                value: true,
                message: "La hora de finalización es requerida"
              }
            })}
          />
          <input 
            type="number"
            {...register('totalPrice', {
              required: {
                value: true,
                message: "La selección del pago es requerida"
              }
            })}
          />
        </div>

        {!preferenceId && ( <button className="btn btn-active btn-neutral w-full mt-3">Reservar</button> )}
      </form>

      {preferenceId && ( <AppPaymentButton preferenceId={preferenceId} /> )}
    </>
  );
};