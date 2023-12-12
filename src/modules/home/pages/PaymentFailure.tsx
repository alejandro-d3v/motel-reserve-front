// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";

export default function PaymentFailure () {
  // const params = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuery = async () => {
      try {
        console.log('query', 'show query');
      } catch (e) {
        console.error('err', e);
        setTimeout(() => setLoading(false), 300);
      }

      setTimeout(() => setLoading(false), 300);
    };

    getQuery();
  }, []);

  return (
    <HomeLayout pageName='Pago fallido'>
      {loading ? ( <AppLoading /> ) : (
        <>
          <div className="flex justify-center mt-24">
            <div className="border rounded w-2/5 p-12">
              <p className="text-3xl font-medium text-center mb-4">¡Oops! El pago ha fallado</p>
              <p className="text-base text-center">Lamentablemente, no se pudo completar la reservación.</p>
            </div>
          </div>
        </>
      )}
    </HomeLayout>
  );
}