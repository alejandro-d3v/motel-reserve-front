import { BadgeDelta, Card, Flex, Grid, Metric, Text } from "@tremor/react"
import { useEffect, useState } from "react";

import AppLoading from "../../../shared/components/AppLoading";

import { ServiceWithReservationsDto } from "../../services/dtos/service.dto";

import { GetServicesWithReservationsService } from "../services/getServicesWithReservations.service";

const getServicesWithReservationsService = new GetServicesWithReservationsService();

const CardGridMap = () => {
  const [report, setReport] = useState<any[]>([
    {
      title: 'Número total de canchas registradas',
      metric: '0',
    },
    {
      title: 'Total de reservas realizadas',
      metric: '0',
      delta: '23.9%',
    },
    {
      title: 'Total de ingresos generados',
      metric: '0',
    },
  ]);
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
    const totalReservas = services.reduce((acc, item) => acc + item.reservation.length, 0);

    const totalIngresos = services.reduce((acc, item) => {
      return acc + item.reservation.reduce((total, reserva) => {
        if (reserva.paymentStatus === 1 || reserva.paymentStatus === 3) {
          return total + reserva.totalPrice;
        }
        return total;
      }, 0);
    }, 0);

    const newReport = [
      {
        title: 'Número total de canchas registradas',
        metric: services.length,
      },
      {
        title: 'Total de reservas realizadas',
        metric: totalReservas,
      },
      {
        title: 'Total de ingresos generados',
        metric: `$ ${Intl.NumberFormat().format(totalIngresos ?? 0)}`,
      },
    ];

    setReport(newReport);

    setTimeout(() => setLoading(false), 400);
  }, [services]);

  return (
    <>
      {loading ? ( <AppLoading /> ) : (
        <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-2"  >
          { report.map( (item) => (
            <Card key={item.title}>
              <Flex className='items-start'>
                <div>
                  <Text>{item.title}</Text>
                  <Metric>{item.metric}</Metric>
                </div>

                { item.delta && <BadgeDelta>{item.delta}</BadgeDelta> }
              </Flex> 
            </Card>    
          ))}
        </Grid>
      )}
    </>
  )
}

export default CardGridMap