import { Helmet } from "react-helmet";

import { settings } from '../../../shared/constant/settings.contants';

import Navbar from "../components/Navbar";

export default function HomeLayout({ children, pageName }: any) {
  return (
    <>
      <Helmet>
        <title>{pageName ? `${pageName} - ` : ''} {settings.appName}</title>
        <link rel="icon" href={settings.appFavicon} />
      </Helmet>

      <Navbar /> 
  
      <div>
        {children}
      </div>
    </>
  );
}