import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import HomeLayout from "../layouts/HomeLayout";

import AppLoading from "../../../shared/components/AppLoading";

export default function PaymentFailure () {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuery = async () => {
      try {
        navigate('/reservations-list');
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
      {loading && ( <AppLoading /> )}
    </HomeLayout>
  );
}