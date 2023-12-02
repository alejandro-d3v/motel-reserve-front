import { Title, Text, TabList, Tab, TabGroup } from "@tremor/react"
import { useState } from "react"
import CardGridMap from "./CardGridMap"
import ChartDonut from "./ChartDonut"
import TableBase from "./TableBase"



const DashboardBase = () => {
    const [selectedView, setSelectedView] = useState(1)

  return (
    <main className='bg-slate-200 p-6 sm:p-10'>
        <Title>Dashboard</Title>
        <Text>Ejemplo de Dashboard con Tremor y React</Text>
        
        <TabGroup>
            <TabList defaultValue={selectedView} className="mt-6">
                <Tab onClick={() => setSelectedView(1)} value={1} >Principal</Tab>
                <Tab onClick={() => setSelectedView(2)} value={2} >Detalles</Tab> 
            </TabList>
        </TabGroup>

        { selectedView === 1 ? (
            <>
            <CardGridMap />           

            <div className='mt-6'>
                <ChartDonut />
            </div>
            </>
        ) : (
            <>
            <div className='mt-6'>
                <TableBase />
            </div>
            </>
        )

        }


    </main>
  )
}

export default DashboardBase