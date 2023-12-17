import { Card, DonutChart, Title } from "@tremor/react"

import AppLoading from "../../../shared/components/AppLoading";

import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";
import { useEffect, useState } from "react";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

const ChartDonut = () => {
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
    const newArray = services.map(service => {
      const serviceName = service.name;
      const totalSales = service.reservation
        .filter(reservation => reservation.paymentStatus === 1 || reservation.paymentStatus === 3)
        .reduce((acc, reservation) => acc + reservation.totalPrice, 0);
    
      return {
        name: serviceName,
        sales: totalSales,
      };
    });

    setReport(newArray);

    setTimeout(() => setLoading(false), 400);
  }, [services]);

  return (
    <Card>
      <Title>Ingresos por canchas</Title>

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
  
export default ChartDonut