import { Card, DonutChart, Title } from "@tremor/react"
import { useEffect, useState } from "react";

import AppLoading from "../../../shared/components/AppLoading";

import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

const ChartDonutPaymentStatus = () => {
  const [report, setReport] = useState<any[]>([]);
  const [services, setServices] = useState<ServiceWithReservationsDto[] | []>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedServices = await getServicesWithReservationsService.run({});
        setServices(fetchedServices);
      } catch (e) {
        console.error('err:', e);
        setTimeout(() => setLoading(false), 400);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const newReport = [
      {
        name: 'Pago no completado',
        sales: 0,
      },
      {
        name: 'Pago completado',
        sales: 0,
      },
      {
        name: 'Pago de cuota no completado',
        sales: 0,
      },
      {
        name: 'Pago de cuota completado',
        sales: 0,
      },
    ];

    services.forEach(item => {
      item.reservation.forEach(reservation => {
        switch (reservation.paymentStatus) {
          case 0:
            newReport[0].sales += reservation.totalPrice;
            break;
          case 1:
            newReport[1].sales += reservation.totalPrice;
            break;
          case 2:
            newReport[2].sales += reservation.totalPrice;
            break;
          case 3:
            newReport[3].sales += reservation.totalPrice;
            break;
          default:
            break;
        }
      });
    });

    setReport(newReport);

    setTimeout(() => setLoading(false), 400);
  }, [services]);

  return (
    <Card>
      <Title>Estado de Pagos</Title>

      {loading ? ( <AppLoading /> ) : (
        <>
          { report.length && !loading && (
            <DonutChart
              data={report}
              category='sales'
              index='name'
              className='mt-6'
              colors={["yellow", "violet", "indigo", "rose", "cyan", "green"]}
            />
          )}
        </>
      )}
    </Card>
  )
}
  
export default ChartDonutPaymentStatus