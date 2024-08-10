import CheckoutPage from '../components/CheckoutPage';
import { getSiteSettings } from '../utils/getSiteSettings';

export const metadata = {
    title: 'Abaya | Checkout',
};

const page = async () => {
  const siteSettings = await getSiteSettings()

  return (
      <div>
          <CheckoutPage siteSettings={siteSettings.data} />
      </div>
  );
}

export default page