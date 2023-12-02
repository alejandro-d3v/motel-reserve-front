import { BadgeDelta, Card, Flex, Grid, Metric, ProgressBar, Text } from "@tremor/react"

const CardGridMap = () => {

    const data = [
        {
            title: 'Ventas',
            metric: '$ 12,699',
            progress: 15.9,
            target: '$ 80,000',
            delta: '13.2%',
            deltaType: 'moderateIncrease',
        },
        {
            title: 'Ganancias',
            metric: '$ 45,564',
            progress: 36.5,
            target: '$ 125,000',
            delta: '23.9%',
            deltaType: 'increase',
        },
        {
            title: 'Clientes',
            metric: '1,072',
            progress: 53.6,
            target: '2,000',
            delta: '10.1%',
            deltaType: 'moderateDecrease',
        },
    ]
    

    return (
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-2"  >
          { data.map( (item) => (
              <Card key={item.title}>
                   <Flex className='items-start'>
                      <div>
                          <Text>{item.title}</Text>
                          <Metric>{item.metric}</Metric>
                      </div>
                      <BadgeDelta>{item.delta}</BadgeDelta>
                   </Flex>   
  
                   <Flex className='mt-4 space-x-2'>
                      <Text>{`${item.progress}% (${item.metric})`}</Text>
                      <Text>{item.target}</Text>
                   </Flex>
                  <ProgressBar value={item.progress} className="mt-3"/> 
  
              </Card>    
          )) }
      </Grid>
    )
  }
    export default CardGridMap