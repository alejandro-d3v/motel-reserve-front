// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";

export default function PaymentSuccess () {
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
          <h1>Pago hecho</h1>
        </>
      )}
    </HomeLayout>
  );
}