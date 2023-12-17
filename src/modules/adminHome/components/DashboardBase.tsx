import CardGridMap from "./CardGridMap"
import ChartDonut from "./ChartDonut"
import ChartDonutPaymentStatus from "./ChartDonutPaymentStatus"

const DashboardBase = () => {
  return (
    <main className='bg-slate-200 p-6'>
      <CardGridMap />           

      <div className='mt-6 flex gap-2'>
        <ChartDonut />
        <ChartDonutPaymentStatus />
      </div>
    </main>
  )
}

export default DashboardBase