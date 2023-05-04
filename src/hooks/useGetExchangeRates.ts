import { useQuery } from "react-query";
import { getExchangeRate } from "../services/currenciesRequests";

export default function useGetExchangeRates(
   initialValueKey: string,
   finalValueKey: string
) {
   return useQuery("exchangeRate", () =>
      getExchangeRate(initialValueKey, finalValueKey).then(({ data }) => {
         return data[finalValueKey];
      })
   );
}
