import CardGridMap from "./CardGridMap"
import ChartDonut from "./ChartDonut"

const DashboardBase = () => {
  return (
    <main className='bg-slate-200 p-6'>
      <CardGridMap />           

      <div className='mt-6'>
        <ChartDonut />
      </div>
    </main>
  )
}

export default DashboardBase