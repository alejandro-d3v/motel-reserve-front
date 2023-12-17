import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import 'dayjs/locale/es';

import AppLoading from '../../../shared/components/AppLoading';
import AppFormModal from "../../../shared/components/Modal/AppFormModal";
import TimePicker from '../../home/components/ReservationsFormTimePicker';

import { ServiceDto } from '../../services/dtos/service.dto';
import { ReservationDto } from '../../home/dtos/reservations.dto';

import { GetServiceService } from '../../services/services/getService.service';
import { CreateOrUpdateReservationsService } from "../../home/services/createOrUpdateReservations.service";

const createOrUpdateReservationsService = new CreateOrUpdateReservationsService();
const getServiceService = new GetServiceService();

dayjs.locale('es');

interface AppFormModalProps {
  onClose: () => void;
  data: ReservationDto | null;
}

export default function ReservationForm ({ onClose, data }: AppFormModalProps) {
  const params = useParams();
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [service, setService] = useState<ServiceDto | null>(null);

  const [loadingSave, setLoadingSave] = useState(false);
  const [payAdvance, setPayAdvance] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getService = async () => {
      setLoading(true);

      try {
        setService(await getServiceService.run(params.serviceId));

        if (data) {
          setPayAdvance([0, 1].includes(data.paymentStatus) ? false : true);
          setSelectedStartTime(dayjs(`2018-04-13 ${data.startTime}`, 'YYYY-MM-DD HH:mm:ss').format('hh:mm'));
          setSelectedEndTime(dayjs(`2018-04-13 ${data.endtTime}`, 'YYYY-MM-DD HH:mm:ss').format('hh:mm'))
        }
      } catch (e) {
        console.error('err:', e);
        setLoading(false);
      }

      setLoading(false);
    };

    getService();
  }, []);

  useEffect(() => {
    setValue("startTime", selectedStartTime ? convertToServerTime(`${selectedStartTime} PM`) : selectedStartTime )
  }, [selectedStartTime]);

  useEffect(() => {
    setValue("endTime", selectedEndTime ? convertToServerTime(`${selectedEndTime} PM`) : selectedEndTime )
  }, [selectedEndTime]);

  useEffect(() => {
    if (payAdvance) setValue('totalPrice', service?.advancePayment)
    else setValue('totalPrice', totalPrice ?? service?.price ?? 0)
  }, [payAdvance]);

  // Recalcular el precio total cuando cambian las horas seleccionadas
  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      const durationInMinutes = calculateDurationInMinutes(selectedStartTime, selectedEndTime);

      const pricePerHour = service?.price || 0;
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

  const save = handleSubmit(async (dataForm) => {
    setLoadingSave(true);

    const currentDate = new Date();

    try {
      const dataSend: any = {
        serviceId: service?.id,
        code: `${data?.code ?? currentDate.getTime()}`,
        paymentStatus: parseInt(dataForm.paymentStatus),

        nameClient: dataForm.nameClient,
        phone: dataForm.phone,
        date: dataForm.date,
        startTime: dataForm.startTime,
        endTime: dataForm.endTime,
        totalPrice: payAdvance ? service?.advancePayment : (totalPrice ?? service?.price ?? 0),
      };

      await createOrUpdateReservationsService.run(dataSend, data?.id);

      onClose();
    } catch (e) {
      console.log('err', e);
      setLoadingSave(false);
    }

    setLoadingSave(false);
  });

  return (
    <form onSubmit={save}>
      <AppFormModal
        onClose={ onClose }
        title={ !data ? 'Nueva Reservaciòn' : 'Editar Reservaciòn' }
        content={
          <div>
            {loading ? ( <AppLoading /> ) : (
              <>
                <div className="flex space-x-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>

                    <input 
                      type="text" 
                      className="input input-bordered w-full" 
                      {...register('nameClient', {
                        value: data?.nameClient,
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
                        value: data?.phone,
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
                      value: data?.date,
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
                    <span className="label-text">Hora de inicio - Hora de finalización {selectedStartTime} - {selectedEndTime}</span>
                  </label>

                  <TimePicker selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} handleBadgeClick={handleBadgeClick} />

                  {errors.startTime && <span className="text-red-600 text-right">{errors.startTime.message as any}</span>}
                  {errors.endTime && <span className="text-red-600 text-right">{errors.endTime.message as any}</span>}
                </div>

                <div className='flex justify-center gap-3 mt-3'>
                  <div className="stats shadow">
                    <div className={`stat cursor-pointer ${!payAdvance ? 'border rounded-2xl border-black' : ''}`} onClick={() => setPayAdvance(!payAdvance)}>
                      <div className="stat-title">Pagar precio total</div>
                      <div className="stat-value">${Intl.NumberFormat().format(totalPrice ?? service?.price ?? 0)}</div>
                    </div>
                  </div>

                  <div className="stats shadow">
                    <div className={`stat cursor-pointer ${payAdvance ? 'border rounded-2xl border-black' : ''}`} onClick={() => setPayAdvance(!payAdvance)}>
                      <div className="stat-title">Pagar cuota mínima</div>
                      <div className="stat-value">${Intl.NumberFormat().format(service?.advancePayment ?? 0)}</div>
                    </div>
                  </div>
                </div>

                <div className='flex justify-end'>
                  {errors.totalPrice && <span className="text-red-600 text-right">{errors.totalPrice.message as any}</span>}
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Estado</span>
                  </label>

                  <select 
                    className="select select-bordered w-full"
                    {...register('paymentStatus', {
                      value: data?.paymentStatus,
                      required: {
                        value: true,
                        message: "El estado es requerido"
                      }
                    })}
                  >
                    <option value={0}>Pago no completado</option>
                    <option value={1}>Pago completado</option>
                    <option value={2}>Pago de cuota no completado</option>
                    <option value={3}>Pago de cuota completado</option>
                  </select>

                  {errors.roleId && <span className="text-red-600 text-right">{errors.roleId.message as any}</span>}
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
              </>
            )}
          </div>
        }
        actions={
          // <button id="btnSave" className="btn btn-neutral" onClick={async () => { await save(); onClose(); }}>Guardar</button>
          <button className="btn btn-neutral" disabled={loadingSave}>Reservar</button>
        }
      />
    </form>
  );
}