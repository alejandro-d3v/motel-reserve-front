import { Card, DonutChart, Title } from "@tremor/react"

const ChartDonut = () => {

    const cities = [
        {
            name: 'Cancha #1',
            sales: 9800
        },
        {
            name: 'Cancha #2',
            sales: 4567,
        },
        {
            name: 'Cancha #3',
            sales: 3908,
        },
        {
            name: 'Cancha #4',
            sales: 2400,
        },
        {
            name: 'Cancha #5',
            sales: 1908,
        },
        {
            name: 'Cancha #6',
            sales: 1398,
        },
    ]

    return (
      <Card>
          <Title>Ventas por canchas</Title>
          <DonutChart 
              data={cities}
              category='sales'
              index='name'
              className='mt-6'
              colors={["yellow", "violet", "indigo", "rose", "cyan", "green"]}
          />
      </Card>
    )
  }
  
  export default ChartDonut